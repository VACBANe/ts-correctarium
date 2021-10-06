import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./style.css";
import { calcDate } from "./modules/datemodule";
import Footer from "./components/Footer/Footer";
import Select from "./components/Select/Select";
import Input from "./components/Input/Input";
import RightSide from "./components/RightSide/RightSide";
import {
  onChangeField,
  enableButton,
  disableButton,
} from "./store/actionCreators";
import { Dispatch } from "redux";

interface State {
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
interface Button {
  isDisabled: boolean;
}
interface IButton {
  button: Button;
}
interface IState {
  change: State;
}

const App: React.FC = (props) => {
  const dispatch: Dispatch<any> = useDispatch();
  const data = useSelector((state: IState) => state);
  const buttoninfo = useSelector((state: IButton) => state);
  const { change } = data;
  useEffect(() => {
    let numsOfSymbols: number = change.symbols.replace(/\s/g, "").length;
    let normalFormat: boolean;
    let isCyrillic: boolean;
    let price: number;
    if(change.language === "ukrainian" || change.language === "russian") {
      isCyrillic = true;
    } else {
      isCyrillic = false;
    }
    if (
      change.format === "rtf" ||
      change.format === "doc" ||
      change.format === "docx"
    ) {
      normalFormat = true;
    } else {
      normalFormat = false;
    }

    const calcTime: () => void = () => {
      let workTime: number =
        1800 +
        (numsOfSymbols * 3600) /
          (isCyrillic ? 1333 : 333);

      workTime = workTime < 3600 ? 3600 : +workTime.toFixed();
      workTime *= normalFormat ? 1 : 1.2;

      let result: string[] | number = calcDate(+workTime, new Date());

      if (Array.isArray(result)) {
        dispatch(
          onChangeField("time", `Термін здавання: ${result[0]} о ${result[1]}`)
        );
      } else {
        let hours: number = Math.floor(result / 60 / 60);
        let minutes: number = Math.floor(result / 60) - hours * 60;
        dispatch(
          onChangeField(
            "time",
            `Термін здавання: через ${hours} г. і ${minutes} хв.`
          )
        );
      }
    };

    calcTime();
    if (isCyrillic) {
      price = 0.05 * numsOfSymbols;
      price = price < 50 ? 50 : price;
    } else {
      price = 0.12 * numsOfSymbols;
      price = price < 120 ? 120 : price;
    }

    price *= normalFormat ? 1 : 1.2;
    if (!change.language || !change.symbols) {
      dispatch(onChangeField("sum", "0"));
      dispatch(onChangeField("time", ""));
    } else {
      dispatch(onChangeField("sum", price.toFixed(2)));
    }
    change.symbols && change.language
      ? dispatch(enableButton())
      : dispatch(disableButton());
  }, [change.language, change.symbols, change.format]);

  return (
    <div>
      <div className="container">
        <form>
          <div className="leftside">
            <div className="header">Замовити переклад або редагування</div>
            <Select
              options={[
                { text: "Редагування", value: "edit" },
                { text: "Переклад", value: "translate" },
              ]}
              valueName={"service"}
              onChangeField={onChangeField}
              value={change.service}
              legendText="Послуга"
            />
            <textarea
              className="textarea"
              onChange={(e) =>
                dispatch(onChangeField("symbols", e.target.value))
              }
              value={change.symbols}
            ></textarea>
            {/* <div className={"inputs"}>
              <Input
                text="Ваша електронна пошта"
                valueName={"email"}
                isRequired={true}
                value={data.email}
                onChangeField={props.onChangeField}
              />
              <Input
                text="Ваше ім'я"
                onChangeField={props.onChangeField}
                value={data.name}
                isRequired={true}
                valueName={"name"}
              />
              <Input
                text="Коментар або покликання"
                onChangeField={props.onChangeField}
                value={data.comment}
                valueName={"comment"}
              />
              <Select
                options={[
                  { text: "Українська", value: "ukrainian" },
                  { text: "Російська", value: "russian" },
                  { text: "Англійська", value: "english" },
                ]}
                onChangeField={props.onChangeField}
                value={data.language}
                legendText="Мова"
                valueName="language"
              />
              <Select
                options={[
                  { text: "None", value: "none" },
                  { text: "Doc", value: "doc" },
                  { text: "Docx", value: "docx" },
                  { text: "RTF", value: "rtf" },
                ]}
                onChangeField={props.onChangeField}
                value={data.format}
                legendText="Формат"
                valueName="format"
              />
            </div> */}
          </div>
          <RightSide
            sum={change.sum}
            time={change.time}
            isDisabled={buttoninfo.button.isDisabled}
          />
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default App;
