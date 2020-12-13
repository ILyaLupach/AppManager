import _ from 'lodash';
import React, { PureComponent } from 'react';
import { useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LabelList, Cell } from 'recharts';
import { StoreType } from 'src/types/store';
import { COLORS } from '../constants';
import { Box, Grid, Typography } from '@material-ui/core';
import useStyles from '../styles';
import { CustomizedAxisTick, CustomTooltip } from './CustomComponent';

const PersonsStatistics = () => {
  const classes = useStyles()
  const { tasks } = useSelector(({ tasks }: StoreType) => tasks)
  const { persons } = useSelector(({ persons }: StoreType) => persons)

  const personAndQuantityList =
    [...tasks]?.reduce((acc: { name: string, value: number }[], value) => {
      return acc.map(o => {
        if (value.name.join('').includes(o.name)) o.value++
        return o
      })
    }, [...persons]?.map(p => ({ name: p.surname, value: 0 })))

  if (!personAndQuantityList?.length) return null
  return (
    <Grid>
      <Box className={classes.itemTitle} style={{ marginLeft: 20 }}>
        <Typography variant="subtitle1">
          Активность сотрудников
        </Typography>
      </Box>

      <Box className={classes.itemWrapper}>
        <BarChart
          width={personAndQuantityList.length * 50}
          height={420}
          data={personAndQuantityList}
          margin={{
            top: 5, right: 0, left: 0, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" interval={0} height={120} tick={<CustomizedAxisTick />} />
          <YAxis type="number" />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="value" fill="#8884d8" width={40} isAnimationActive={false}>
            {personAndQuantityList.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
          </Bar>
        </BarChart>
      </Box>
    </Grid>
  )
}

export default PersonsStatistics