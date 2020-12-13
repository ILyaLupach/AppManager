import _ from 'lodash';
import React from 'react';
import { useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Legend, Line, Brush, AreaChart, Area } from 'recharts';
import { StoreType } from 'src/types/store';
import { COLORS } from '../constants';
import { Box, Grid, Typography } from '@material-ui/core';
import useStyles from '../styles';
import { CustomizedAxisTick } from './CustomComponent';
import { formatDataMonths } from 'src/utils/formatTime';
import { WorkshopsType } from 'src/types/global';

const DateStatistics = () => {
  const classes = useStyles()
  const { tasks } = useSelector(({ tasks }: StoreType) => tasks)
  const { workshops } = useSelector(({ workshops }: StoreType) => workshops)

  const getMonthAndPositionsList = () => {
    let positionsList: any = {}
    workshops?.forEach(w => positionsList = { ...positionsList, [w.name]: 0 })
    return [...tasks]?.reduce((acc: any[], value) => {
      const data = formatDataMonths(value.date)
      if (value.date) { }
      if (!acc.length) {
        return [{ ...positionsList, name: data, [value.position]: 1 }]
      }
      const i = acc.findIndex(o => o.name === data)
      i >= 0
        ? acc[i][value.position]++
        : acc.push({ ...positionsList, name: data, [value.position]: 1 })
      return acc
    }, [])
  }
  const monthAndPositionsList = getMonthAndPositionsList().slice(-12)
  if (!monthAndPositionsList?.length) return null
  return (
    <Grid>
      <Box className={classes.itemTitle}>
        <Typography variant="h5">
          Общий график заявленных неисправностей за год
        </Typography>
      </Box>

      <Box className={classes.itemWrapper}>
        <AreaChart
          width={monthAndPositionsList.length * 70}
          height={620}
          data={monthAndPositionsList}
          margin={{
            top: 20, right: 20, left: 30, bottom: 5,
          }}
        >
          <defs>
          {(workshops as WorkshopsType[])?.map((w, i) => (
            <linearGradient id={String(i)} x1="0" y1="0" x2="0" y2="1">
            <stop offset="15%" stopColor={COLORS[i % COLORS.length]} stopOpacity={0.5} />
            <stop offset="60%" stopColor={COLORS[i % COLORS.length]} stopOpacity={0} />
          </linearGradient>
          ))}

          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" interval={0} height={120} tick={<CustomizedAxisTick />} />
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
