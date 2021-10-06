import React, { FC, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import './style.css'
import { calcTime } from './modules/calcTime'
import { Footer, Input, RightSide, Select } from './components/components'
import {
  onChangeField,
  enableButton,
  disableButton
} from './store/actionCreator'
import { Dispatch } from 'redux'

interface State {
  isDisabled: boolean;
  symbols: string;
  language: string;
  format: string;
  service: string;
  name: string;
  email: string;
  comment: string;
  time: string;
  sum: string;
}

const App: FC = () => {
  const dispatch: Dispatch<any> = useDispatch()
  const data = useSelector((state: State) => state)
  useEffect(() => {
    const numsOfSymbols: number = data.symbols.replace(/\s/g, '').length
    let price: number
    const isCyrillic =
      !!(data.language === 'ukrainian' || data.language === 'russian')
    const normalFormat =
      !!(data.format === 'rtf' || data.format === 'doc' || data.format === 'docx')

    dispatch(
      onChangeField('time', calcTime(numsOfSymbols, isCyrillic, normalFormat))
    )

    if (isCyrillic) {
      price = 0.05 * numsOfSymbols
      price = price < 50 ? 50 : price
    } else {
      price = 0.12 * numsOfSymbols
      price = price < 120 ? 120 : price
    }

    price *= normalFormat ? 1 : 1.2
    if (!data.language || !data.symbols) {
      dispatch(onChangeField('sum', '0'))
      dispatch(onChangeField('time', ''))
    } else {
      dispatch(onChangeField('sum', price.toFixed(2)))
    }
    data.symbols && data.language
      ? dispatch(enableButton())
      : dispatch(disableButton())
  }, [data.language, data.symbols, data.format, dispatch])

  return (
  <div>
      <div className="container">
        <form>
          <div className="leftside">
            <div className="header">Замовити переклад або редагування</div>
            <Select
              options={[
                { text: 'Редагування', value: 'edit' },
                { text: 'Переклад', value: 'translate' }
              ]}
              valueName={'service'}
              onChangeField={onChangeField}
              value={data.service}
              legendText="Послуга"
            />
            <textarea
              className="textarea"
              onChange={(e) =>
                dispatch(onChangeField('symbols', e.target.value))
              }
              value={data.symbols}
            ></textarea>
            <div className={'inputs'}>
              <Input
                text="Ваша електронна пошта"
                valueName={'email'}
                isRequired={true}
                value={data.email}
                onChangeField={onChangeField}
              />
              <Input
                text="Ваше ім'я"
                onChangeField={onChangeField}
                value={data.name}
                isRequired={true}
                valueName={'name'}
              />
              <Input
                text="Коментар або покликання"
                onChangeField={onChangeField}
                value={data.comment}
                valueName={'comment'}
              />
              <Select
                options={[
                  { text: 'Українська', value: 'ukrainian' },
                  { text: 'Російська', value: 'russian' },
                  { text: 'Англійська', value: 'english' }
                ]}
                onChangeField={onChangeField}
                value={data.language}
                legendText="Мова"
                valueName="language"
              />
              <Select
                options={[
                  { text: 'None', value: 'none' },
                  { text: 'Doc', value: 'doc' },
                  { text: 'Docx', value: 'docx' },
                  { text: 'RTF', value: 'rtf' }
                ]}
                onChangeField={onChangeField}
                value={data.format}
                legendText="Формат"
                valueName="format"
              />
            </div>
          </div>
          <RightSide
            sum={data.sum}
            time={data.time}
            isDisabled={data.isDisabled}
          />
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default App
