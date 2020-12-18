import _ from 'lodash';
import React from 'react';
import { useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';
import { StoreType } from 'src/types/store';
import { COLORS } from '../constants';
import { Box, Grid, Typography } from '@material-ui/core';
import useStyles from '../styles';
import { CustomizedAxisTick, CustomTooltip } from './CustomComponent';

const PersonsStatistics = () => {
  const classes = useStyles()
  const { statistics } = useSelector(({ statistics }: StoreType) => statistics)

  if (!statistics.persons?.length) return null
  return (
    <Grid className={classes.gridContainer}>
      <Box className={classes.itemTitle} style={{ marginLeft: 20 }}>
        <Typography variant="subtitle1">
          Активность сотрудников
        </Typography>
      </Box>

      <Box className={classes.itemWrapper}>
        <BarChart
          width={statistics.persons.length * 50}
          height={500}
          data={statistics.persons}
          margin={{
            top: 5, right: 0, left: -30, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" interval={0} height={160} tick={<CustomizedAxisTick />} />
          <YAxis type="number" />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="value" fill="#8884d8" width={40}>
            {statistics.persons.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
          </Bar>
        </BarChart>
      </Box>
    </Grid>
  )
}

export default PersonsStatistics
