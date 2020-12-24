import React, { useEffect, useState } from 'react'
import PositionStatistics from './components/PositionsStatistics'
import DatePicker from "react-datepicker";
import { Grid, Typography, Container, Box } from '@material-ui/core';
import useStyles from './styles';
import TimeStatistics from './components/PersonsStatistics';
import DateStatistics from './components/DateStatistics';
import { isMobileOnly } from 'react-device-detect'
import { getStatistics } from 'src/actions/statisticsActions'
import { useDispatch, useSelector } from 'react-redux'
import { StoreType } from 'src/types/store'
import { MiniPreloader } from '../Preloader'

const minDate = new Date()
const maxDate = new Date()

const StatisticsPage = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [firstDate, setFirstDate] =
    useState(new Date(minDate.setMonth(minDate.getMonth() - 1)))
  const [lastDate, setLastDate] = useState(maxDate)
  const { loading } = useSelector(({ statistics }: StoreType) => statistics)

  useEffect(() => {
    dispatch(getStatistics(firstDate, lastDate))
  }, [dispatch, firstDate, lastDate])

  return (
    <section className={isMobileOnly ? 'mobile-page' : 'page'}>
      {loading && <MiniPreloader />}
      <Container maxWidth='lg'>
        <Grid container className={classes.container}>
          <Grid className={classes.title}>
            <Typography variant='h5' align='center'>
              Статистика вызовов за период
            </Typography>
            <Box className={classes.datepikerWrapper}>
              <DatePicker
                selected={firstDate}
                onChange={(date: Date) => setFirstDate(date)}
                locale='ru'
                dateFormat='dd.MM.yyyy'
                className={classes.dataPicker}
              />
              {!isMobileOnly && <Typography variant='h5'>до</Typography>}
              <DatePicker
                selected={lastDate}
                onChange={(date: Date) => setLastDate(date)}
                locale='ru'
                dateFormat='dd.MM.yyyy'
                className={classes.dataPicker}
                popperPlacement="top-end"
                popperModifiers={{
                  offset: {
                    enabled: true,
                    offset: "5px, 10px"
                  },
                  preventOverflow: {
                    enabled: true,
                    escapeWithReference: false,
                    boundariesElement: "viewport"
                  }
                }}
              />
            </Box>
          </Grid>
          <PositionStatistics />
          <TimeStatistics />
          <DateStatistics />
        </Grid>
      </Container>
    </section>
  )
}

export default StatisticsPage
