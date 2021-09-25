export const calcDate = (seconds: number, today: Date) => {
  const tenHour = 36000;
  const sevenHour = 68400;
  const workArr = [1, 2, 3, 4, 5];
  let daysForTask, day;
  const timeInSec = (today.getHours() * 60 + today.getMinutes()) * 60;
  if (workArr.includes(today.getDay())) {
    if (timeInSec < tenHour) {
      daysForTask = Math.floor((seconds - 60) / 32400);
      if (daysForTask >= 1) {
        seconds -= daysForTask * 32400;
        let finalDay = onlyWorkTime(today, daysForTask);
        return [todate(finalDay), totime(tenHour + seconds)];
      }
      return tenHour - timeInSec + seconds;
    } else {
      if ((timeInSec + seconds) - 60 <= sevenHour) {
        return seconds;
      } else {
        if (timeInSec < sevenHour) {
          seconds -= sevenHour - timeInSec;
        }
        daysForTask = Math.floor((seconds - 60) / 32400);
        if (daysForTask >= 1) {
          seconds -= daysForTask * 32400;
          day = onlyWorkTime(today, daysForTask);
        } else {
          day = onlyWorkTime(today, 1);
        }
        return [todate(day), totime(tenHour + seconds)];
      }
    }
  } else {
    if (seconds % 32400 === 0) {
      daysForTask = Math.floor((seconds - 1) / 32400);
    } else {
      daysForTask = Math.floor(seconds / 32400);
    }
    if (daysForTask >= 1) {
      seconds -= daysForTask * 32400;
      day = onlyWorkTime(today, daysForTask + 1);
    } else {
      day = onlyWorkTime(today, daysForTask);
    }
    return [todate(day), totime(tenHour + seconds)];
  }
};

function onlyWorkTime(today: Date, days: number) {
  let workArr = [1, 2, 3, 4, 5];
  if (days > 0) {
    do {
      today.setDate(today.getDate() + 1);
      if (workArr.includes(today.getDay())) {
        days--;
      }
    } while (days !== 0);
  } else {
    days = 1;
    do {
      today.setDate(today.getDate() + 1);
      if (workArr.includes(today.getDay())) {
        days--;
      }
    } while (days !== 0);
  }
  return today;
}

//Format functions
function totime(sec: number) {
  sec = Math.ceil(sec);
  let hours: number | string = Math.floor(sec / 60 / 60);
  let minutes: number | string = Math.floor(sec / 60) - hours * 60;
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}
function todate(date: Date) {
  let day: number | string = date.getDate();
  let month: number | string = date.getMonth() + 1;
  let year = date.getFullYear();
  if (day < 10) {
    day = `0${day}`;
  }
  if (month < 10) {
    month = `0${month}`;
  }
  return `${day}.${month}.${year}`;
}
