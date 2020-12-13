import React from 'react'
import PositionStatistics from './components/PositionsStatistics'
import DatePicker from "react-datepicker";
import { Grid, Typography, Container } from '@material-ui/core';
import useStyles from './styles';
import TimeStatistics from './components/PersonsStatistics';
import DateStatistics from './components/DateStatistics';
import { isMobileOnly, withOrientationChange } from 'react-device-detect';

type Props = { isLandscape: boolean }

const StatisticsPage = ({ isLandscape }: Props) => {
  const classes = useStyles()
  return (
    <section className={isMobileOnly ? 'mobile-page' : 'page'}>
      <Container maxWidth='lg'>
        <Grid container className={classes.container}>
          <Grid className={classes.title} style={{ marginLeft: 20 }}>
            <Typography variant='h5'>
              Статистика вызовов за период
          <DatePicker
                selected={new Date()}
                onChange={(date: Date) => { }}
                locale='ru'
                dateFormat='dd.MM.yyyy'
                className={classes.dataPicker}
              />{'до'}
          <DatePicker
                selected={new Date()}
                onChange={(date: Date) => { }}
                locale='ru'
                dateFormat='dd.MM.yyyy'
                className={classes.dataPicker}
              />
            </Typography>
          </Grid>
          <PositionStatistics />
          <TimeStatistics />
          <DateStatistics />
        </Grid>
      </Container>
    </section>
  )
}

export default withOrientationChange(StatisticsPage)
