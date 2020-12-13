import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tooltip: {
      background: "#fff",
      padding: "10px",
      border: '1px solid',
      color: '#666',
    }
  }),
)

export const CustomTooltip = ({ active, payload, label }: any) => {
  const classes = useStyles()
  if (active) {
    return (
      <div className={classes.tooltip} >
        <p style={{color: '#000'}}>{`${label} : ${payload[0].value}`}</p>
      </div>
    );
  }
  return null
}

export const CustomizedAxisTick = ({payload, x, y}: any) => (
  <g transform={`translate(${x},${y})`}>
    <text x={0} y={0} dy={16} textAnchor="end" fill="#000" dx={5} transform="rotate(-30)">
      {payload.value}
    </text>
  </g>
)

export const renderCustomizedLabel = ({ x, y, width, value }: any) => (
  <g>
    <text
      x={x + width / 2} y={y - 7}
      textAnchor="middle"
      dominantBaseline="middle"
      fill="#000"
    >
      {value}
    </text>
  </g>
)
