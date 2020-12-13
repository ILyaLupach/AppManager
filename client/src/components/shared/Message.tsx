import { Alert, AlertTitle } from '@material-ui/lab';
import React from 'react';

export const ErrorMessage = () => {
  return (
  <div className='message-alert'>
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
    Что-то пошло не так! Проверьте интернет соединение и перезагрузите страницу
  </Alert>
  </div>
)}

export const CompletedMessage = ({isUpdate}: {isUpdate: boolean}) => {
  return (
  <div className='message-alert'>
    <Alert severity="success">
      {isUpdate ? 'Изменения приняты' : 'Новый элемент добавлен в таблицу'}
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
  )
}

export const AlarmPerson = ({ edit }: { edit: boolean }) => {
  return (
    <Alert severity="info">
      <AlertTitle>Предупреждение</AlertTitle>
        {edit ? 'Нет изменение, измените хотя бы одно поле' : 'Заполните все поля'}
    </Alert>
  )
}

export const ComplitedPerson = ({ edit }: { edit: boolean }) => {
  return (
    <Alert severity="success">
      <AlertTitle>Выполнено</AlertTitle>
      {edit ? 'Данные работника изменены' : 'Новый работник добавлен в список'}
    </Alert>
  )
}
