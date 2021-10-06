import React, { FC, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import './style.css'
import { calcTimeAndPrice } from './modules/calcTimeAndPrice'
import { Footer, Input, RightSide, Select } from './components/components'
import {
  onChangeField
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
    calcTimeAndPrice(data, dispatch)
  }, [data.symbols, data.language, data.format])

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
