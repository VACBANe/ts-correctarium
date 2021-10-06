import { calcDate } from './datemodule'

type IProps = (
  numsOfSymbols: number,
  isCyrillic: boolean,
  normalFormat: boolean
) => string;

export const calcTime: IProps = (numsOfSymbols, isCyrillic, normalFormat) => {
  let workTime: number =
    1800 + (numsOfSymbols * 3600) / (isCyrillic ? 1333 : 333)
  workTime = workTime < 3600 ? 3600 : +workTime.toFixed()
  workTime *= normalFormat ? 1 : 1.2
  const result = calcDate(+workTime, new Date())
  if (Array.isArray(result)) {
    return `Термін здавання: ${result[0]} о ${result[1]}`
  } else {
    const hours: number = Math.floor(result / 60 / 60)
    const minutes: number = Math.floor(result / 60) - hours * 60
    return `Термін здавання: через ${hours} г. і ${minutes} хв.`
  }
}
