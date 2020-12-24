import React, { useState } from 'react';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';
import { StoreType } from 'src/types/store';
import { COLORS } from '../constants';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from '@material-ui/core';
import useStyles from '../styles';
import { CustomizedAxisTick, CustomTooltip } from './CustomComponent';

const PositionsStatistics = () => {
  const classes = useStyles()
  const { statistics } = useSelector(({ statistics }: StoreType) => statistics)
  const [details, setDetails] = useState<{
    isOpen: boolean, value: { name: string, value: number }[], name: string
  }>({ isOpen: false, value: [], name: '' })

  const onClose = () => {
    setDetails({ isOpen: false, value: [], name: '' })
  }

  const openDialog =
    ({ name, objects }: { name: string, objects: { [x: string]: number } }) => {
      const objectsList: { name: string, value: number }[] = []
      for (const key in objects) {
        if (Object.prototype.hasOwnProperty.call(objects, key)) {
          objectsList.push({ name: key, value: objects[key] })
        }
      }
      setDetails({ isOpen: true, value: _.orderBy(objectsList, ['value'], ['desc']), name })
    }

  if (!statistics.positions?.length) return null
  return (
    <Grid className={classes.gridContainer}>
      <Box className={classes.itemTitle} style={{ marginLeft: 20 }}>
        <Typography variant="subtitle1">
          Заявленные неисправности
        </Typography>
      </Box>

      <Box className={classes.itemWrapper}>
        <BarChart
          width={statistics.positions.length * 50}
          height={500}
          data={statistics.positions}
          margin={{
            top: 5, right: 0, left: -30, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" interval={0} height={160} tick={<CustomizedAxisTick />} />
          <YAxis type="number" />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="value" fill="#8884d8" width={40} onClick={openDialog}>
            {statistics.positions.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
          </Bar>
        </BarChart>
      </Box>


      <Dialog onClose={onClose} aria-labelledby="customized-dialog-title" open={details.isOpen}>
        <DialogTitle id="customized-dialog-title">
          {details.name}
        </DialogTitle>
        <DialogContent dividers>
          {details.value.map((item) => (
            <Typography gutterBottom key={item.name}>
              {item.name} : <span style={{fontWeight: 900}}>{item.value}</span>
            </Typography>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>


    </Grid>
  )
}

export default PositionsStatistics
