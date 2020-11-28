export  const formatTime = (time: number): string => {
  if (time < 10) {
    return "0" + time
  }
  else return '' + time
}
export const getTimeWork = (start: Date, finish: Date) => {
  const timeStart = `${formatTime(new Date(start).getHours())}:${formatTime(new Date(start).getMinutes())}`
  const timeFinish = `${formatTime(new Date(finish).getHours())}:${formatTime(new Date(finish).getMinutes())}`
  return `${timeStart} - ${timeFinish}`
}
