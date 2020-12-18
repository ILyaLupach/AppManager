import _ from 'lodash';
import React from 'react';
import { useSelector } from 'react-redux';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area } from 'recharts';
import { StoreType } from 'src/types/store';
import { COLORS } from '../constants';
import { Box, Grid, Typography } from '@material-ui/core';
import useStyles from '../styles';
import { CustomizedAxisTick } from './CustomComponent';
import { WorkshopsType } from 'src/types/global';
import { isMobileOnly } from 'react-device-detect';

const DateStatistics = () => {
  const classes = useStyles()
  const { statistics } = useSelector(({ statistics }: StoreType) => statistics)
  const { workshops } = useSelector(({ workshops }: StoreType) => workshops)
  const widthFix = isMobileOnly ? 50 : 70
  if (!statistics.date?.length || statistics.date?.length < 6) return null
  return (
    <Grid className={classes.gridContainer}>
      <Box className={classes.itemTitle}>
        <Typography variant="h5" align='center'>
          Общий график заявленных неисправностей за год
        </Typography>
      </Box>

      <Box className={classes.itemWrapper}>
        <AreaChart
          width={statistics.date.length * widthFix}
          height={620}
          data={statistics.date}
          margin={{
            top: 20, right: 10, left: -20, bottom: 5,
          }}
        >
          <defs>
          {(workshops as WorkshopsType[])?.map((w, i) => (
            <linearGradient id={String(i)} x1="0" y1="0" x2="0" y2="1" key={i}>
              <stop offset="15%" stopColor={COLORS[i % COLORS.length]} stopOpacity={0.5} />
              <stop offset="60%" stopColor={COLORS[i % COLORS.length]} stopOpacity={0} />
          </linearGradient>
          ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" interval={0} height={160} tick={<CustomizedAxisTick />} />
          <YAxis type="number" />
          <YAxis />
          <Tooltip />
          <Legend />
          {(workshops as WorkshopsType[])?.map((w, i) => (
            <Area
              key={i}
              type="monotone"
              dataKey={w.name}
              stroke={COLORS[i % COLORS.length]}
              strokeWidth={2}
              activeDot={{ r: 6 }}
              fill={`url(#${i})`}
            />
          ))}

        </AreaChart>
      </Box>
    </Grid>
  )
}

export default DateStatistics
