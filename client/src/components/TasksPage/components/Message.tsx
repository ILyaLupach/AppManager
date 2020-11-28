import { Alert, AlertTitle } from '@material-ui/lab';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  alertRoot: {
    width: '100%',
    zIndex: 99999,
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    paddingTop: 200,
  },
}))

export const ErrorMessage = () => {
  const classes = useStyles()
  return (
  <div className='message-alert'>
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
    Что-то пошло не так! Проверьте интернет соединение и перезагрузите страницу
  </Alert>
  </div>
)}

export const CompletedMessage = () => {
  return (
  <div className='message-alert'>
    <Alert severity="success">
      Новый элемент добавлен в таблицу
      </Alert>
  </div>
)}

export const ValidateError = () => {
  return (
  <div className='message-alert'>
    <Alert severity="info">
      <AlertTitle>Info</AlertTitle>
        Заполните все поля
    </Alert>
  </div>
)}
