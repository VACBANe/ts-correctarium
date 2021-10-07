import React, { FC, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import '../style.css'
import { getPriceAndDeadline } from '../utils/getPriceAndDeadline'
import { Footer, Input, RightSide, Select } from '../components/components'
import {
  onChangeField
} from '../store/actionCreator'
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
  price: string;
}

const App: FC = () => {
  const dispatch: Dispatch<any> = useDispatch()
  const data = useSelector((state: State) => state)
  useEffect(() => {
    getPriceAndDeadline(data, dispatch)
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
                legendText="Ваша електронна пошта"
                valueName={'email'}
                isRequired={true}
                value={data.email}
                onChangeField={onChangeField}
              />
              <Input
                legendText="Ваше ім'я"
                onChangeField={onChangeField}
                value={data.name}
                isRequired={true}
                valueName={'name'}
              />
              <Input
                legendText="Коментар або покликання"
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
            price={data.price}
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
