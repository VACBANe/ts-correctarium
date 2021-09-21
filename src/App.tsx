import React, { useEffect, useState } from "react";
import "./style.css";
import {calcDate} from "./datemodule";
import Footer from "./components/Footer";
import Select from "./components/Select";
import RightSide from "./components/RightSide";
const App: React.FC = () => {
  const [symbols, setSymbols] = useState<string>("");
  const [language, setLanguage] = useState<string>("ukrainian");
  const [sum, setSum] = useState<string>("0");
  const [format, setFormat] = useState<string>("none");
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [time, setTime] = useState<string>("0");
  useEffect(() => {
    let numsOfSymbols = symbols.replace(/\s/g, "").length;
    const calcTime: () => void = () => {
      console.log(numsOfSymbols);
      let workTime =
        1800 +
        (numsOfSymbols * 3600) /
          (language === "ukrainian"
            ? 1333
            : language === "russian"
            ? 1333
            : 333);
      console.log(workTime);
      workTime = workTime < 3600 ? 3600 : +workTime.toFixed();
      if (format === "rtf" || format === "doc" || format === "docx") {
      } else {
        workTime *= 1.2;
      }
      let day = new Date();
      let result = calcDate(+workTime, day);
      if (Array.isArray(result)) {
        setTime(`Работа будет выполнена ${result[0]} в ${result[1]}`);
      } else {
        let hours = Math.floor(result / 60 / 60);
        let minutes = Math.floor(result / 60) - hours * 60;
        setTime(`Работа будет выполнена через ${hours} ч. и ${minutes} мин.`);
      }
    };

    calcTime();
    let langPrice = 0;
    if (language === "ukrainian" || language === "russian") {
      langPrice = 0.05;
    } else {
      langPrice = 0.12;
    }
    let price = langPrice * numsOfSymbols;
    if (language === "ukrainian" || language === "russian") {
      price = price < 50 ? 50 : price;
    } else {
      price = price < 120 ? 120 : price;
    }
    if (format === "rtf" || format === "doc" || format === "docx") {
    } else {
      price *= 1.2;
    }
    if (!language || !symbols) {
      setSum("0");
      setTime("");
    } else {
      setSum(price.toFixed(2));
    }
    if (symbols && language) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [language, symbols, format]);

  return (
    <div>
      <div className="container">
        <form>
          <div className="leftside">
            <div className="header">Замовити переклад або редагування</div>
            <Select options={[
              {text: "Послуга", value: ""},
              {text: "Редагування", value: ""},
              {text: "Переклад", value: ""}
            ]}/>
            <textarea
              className="textarea"
              onChange={(e) => setSymbols(e.target.value)}
              value={symbols}
            ></textarea>
            <div className={"inputs"}>
              <input
                type="email"
                placeholder={"Ваша електронна пошта"}
                required
              />
              <input type="text" placeholder={"Ваше ім'я"} required />
              <input type="text" placeholder={"Коментар або покликання"} />
              <Select
                options={[
                  { text: "Мова", value: "" },
                  { text: "Українська", value: "ukrainian" },
                  { text: "Російська", value: "russian" },
                  { text: "Англійська", value: "english" },
                ]}
                stateFunc={setLanguage}
                value={language}
              />
              <Select options={[
                {text: "Формат", value: ""},
                {text: "Doc", value: "doc"},
                {text: "Docx", value: "docx"},
                {text: "RTF", value: "rtf"}
              ]}
                stateFunc={setFormat}
                value={format}
              />
            </div>
          </div>
          <RightSide sum={sum} time={time} isDisabled={isDisabled }/>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default App;
