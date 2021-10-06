import calwWorkDays from './calcWorkDays'
import toDate from './toDate'
import toTime from './toTime'

export const calcDate = (seconds: number, today: Date) => {
  const tenHour = 36000
  const sevenHour = 68400
  const workArr = [1, 2, 3, 4, 5]
  let daysForTask, day
  const timeInSec = (today.getHours() * 60 + today.getMinutes()) * 60
  if (workArr.includes(today.getDay())) {
    if (timeInSec < tenHour) {
      daysForTask = Math.floor((seconds - 60) / 32400)
      if (daysForTask >= 1) {
        seconds -= daysForTask * 32400
        const finalDay = calwWorkDays(today, daysForTask)
        return [toDate(finalDay), toTime(tenHour + seconds)]
      }
      return tenHour - timeInSec + seconds
    } else {
      if ((timeInSec + seconds) - 60 <= sevenHour) {
        return seconds
      } else {
        if (timeInSec < sevenHour) {
          seconds -= sevenHour - timeInSec
        }
        daysForTask = Math.floor((seconds - 60) / 32400)
        if (daysForTask >= 1) {
          seconds -= daysForTask * 32400
          day = calwWorkDays(today, daysForTask + 1)
        } else {
          day = calwWorkDays(today, 1)
        }
        return [toDate(day), toTime(tenHour + seconds)]
      }
    }
  } else {
    if (seconds % 32400 === 0) {
      daysForTask = Math.floor((seconds - 1) / 32400)
    } else {
      daysForTask = Math.floor(seconds / 32400)
    }
    if (daysForTask >= 1) {
      seconds -= daysForTask * 32400
      day = calwWorkDays(today, daysForTask + 1)
    } else {
      day = calwWorkDays(today, daysForTask)
    }
    return [toDate(day), toTime(tenHour + seconds)]
  }
}
