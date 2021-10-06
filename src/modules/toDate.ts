export default function toDate(date: Date) {
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