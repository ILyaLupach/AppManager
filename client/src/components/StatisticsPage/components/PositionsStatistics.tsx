import _ from 'lodash';
import React from 'react';
import { useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LabelList, Cell } from 'recharts';
import { StoreType } from 'src/types/store';
import { COLORS } from '../constants';
import { Box, Grid, Typography } from '@material-ui/core';
import useStyles from '../styles';
import { CustomizedAxisTick, CustomTooltip } from './CustomComponent';

const PositionsStatistics = () => {
  const classes = useStyles()
  const { tasks } = useSelector(({ tasks }: StoreType) => tasks)
  const { workshops } = useSelector(({ workshops }: StoreType) => workshops)

  const positionAndQuantityList =
    [...tasks]?.reduce((acc: { name: string, value: number }[], value) => {
      return acc.map(o => {
        if (value.position === o.name) o.value++
        return o
      })
    }, [...workshops]?.map(p => ({ name: p.name, value: 0 })))


  if (!positionAndQuantityList?.length) return null
  return (
    <Grid>
      <Box className={classes.itemTitle} style={{ marginLeft: 20 }}>
        <Typography variant="subtitle1">
          Заявленные неисправностей
        </Typography>
      </Box>

      <Box className={classes.itemWrapper}>
        <BarChart
          width={positionAndQuantityList.length * 70}
          height={420}
          data={positionAndQuantityList}
          margin={{
            top: 5, right: 0, left: 0, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" interval={0} height={120} tick={<CustomizedAxisTick />} />
          <YAxis type="number" />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="value" fill="#8884d8" width={60} isAnimationActive={false}>
            {positionAndQuantityList.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
            {/* <LabelList dataKey="value" content={renderCustomizedLabel} /> */}
          </Bar>
        </BarChart>
      </Box>
    </Grid>
  )
}

export default PositionsStatistics
