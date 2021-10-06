import { calcWorkingDays } from './calcWorkingDays'
import { convertDate } from './convertDate'
import { convertTime } from './convertTime'

export const calcDate = (workTime: number, today: Date) => {
  const tenHour = 36000
  const sevenHour = 68400
  const workingDaysArr = [1, 2, 3, 4, 5]
  let daysForTask, deadlineDay
  const timeInSec = (today.getHours() * 60 + today.getMinutes()) * 60
  if (workingDaysArr.includes(today.getDay())) {
    if (timeInSec < tenHour) {
      daysForTask = Math.floor((workTime - 60) / 32400)
      if (daysForTask >= 1) {
        workTime -= daysForTask * 32400
        deadlineDay = calcWorkingDays(today, daysForTask)
        return [convertDate(deadlineDay), convertTime(tenHour + workTime)]
      }
      return tenHour - timeInSec + workTime
    } else {
      if ((timeInSec + workTime) - 60 <= sevenHour) {
        return workTime
      } else {
        if (timeInSec < sevenHour) {
          workTime -= sevenHour - timeInSec
        }
        daysForTask = Math.floor((workTime - 60) / 32400)
        if (daysForTask >= 1) {
          workTime -= daysForTask * 32400
          deadlineDay = calcWorkingDays(today, daysForTask + 1)
        } else {
          deadlineDay = calcWorkingDays(today, 1)
        }
        return [convertDate(deadlineDay), convertTime(tenHour + workTime)]
      }
    }
  } else {
    if (workTime % 32400 === 0) {
      daysForTask = Math.floor((workTime - 1) / 32400)
    } else {
      daysForTask = Math.floor(workTime / 32400)
    }
    if (daysForTask >= 1) {
      workTime -= daysForTask * 32400
      deadlineDay = calcWorkingDays(today, daysForTask + 1)
    } else {
      deadlineDay = calcWorkingDays(today, daysForTask)
    }
    return [convertDate(deadlineDay), convertTime(tenHour + workTime)]
  }
}
