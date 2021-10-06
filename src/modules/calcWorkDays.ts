export default function calwWorkDays(today: Date, days: number) {
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