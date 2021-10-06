export default function toTime (sec: number) {
  sec = Math.ceil(sec)
  let hours: number | string = Math.floor(sec / 60 / 60)
  let minutes: number | string = Math.floor(sec / 60) - hours * 60
  if (hours < 10) {
    hours = `0${hours}`
  }
  if (minutes < 10) {
    minutes = `0${minutes}`
  }
  return `${hours}:${minutes}`
}
