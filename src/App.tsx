import React, { useEffect, useState } from "react";

import "./style.css";
import { calcDate } from "./datemodule";
import Footer from "./components/Footer";
import Select from "./components/Select";
import Input from "./components/Input";
import RightSide from "./components/RightSide";

const App: React.FC = () => {
  const [symbols, setSymbols] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [sum, setSum] = useState<string>("0");
  const [format, setFormat] = useState<string>("");
  const [service, setService] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [time, setTime] = useState<string>("0");

  useEffect(() => {
    let numsOfSymbols: number = symbols.replace(/\s/g, "").length;
    const calcTime: () => void = () => {
      let workTime: number =
        1800 +
        (numsOfSymbols * 3600) /
          (language === "ukrainian"? 1333 : (language === "russian") ? 1333 : 333);
      workTime = workTime < 3600 ? 3600 : +workTime.toFixed();
      if (format === "rtf" || format === "doc" || format === "docx") {
      } else {
        workTime *= 1.2;
      }
      let day: Date = new Date();
      let result: string[] | number = calcDate(+workTime, day);
      if (Array.isArray(result)) {
        setTime(`Термін здавання: ${result[0]} о ${result[1]}`);
      } else {
        let hours: number = Math.floor(result / 60 / 60);
        let minutes: number = Math.floor(result / 60) - hours * 60;
        setTime(`Термін здавання: через ${hours} г. и ${minutes} хв.`);
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
    symbols && language ? setIsDisabled(false) : setIsDisabled(true);
  }, [language, symbols, format]);

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
              stateFunc={setService}
              value={service}
              legendText="Послуга"
            />
            <textarea
              className="textarea"
              onChange={(e) => setSymbols(e.target.value)}
              value={symbols}
            ></textarea>
            <div className={"inputs"}>
              <Input
                text="Ваша електронна пошта"
                onChange={setEmail}
                value={email}
                isRequired={true}
              />
              <Input
                text="Ваше ім'я"
                onChange={setName}
                value={name}
                isRequired={true}
              />
              <Input
                text="Коментар або покликання"
                onChange={setComment}
                value={comment}
              />
              <Select
                options={[
                  { text: "Українська", value: "ukrainian" },
                  { text: "Російська", value: "russian" },
                  { text: "Англійська", value: "english" },
                ]}
                stateFunc={setLanguage}
                value={language}
                legendText="Мова"
              />
              <Select
                options={[
                  { text: "None", value: "none" },
                  { text: "Doc", value: "doc" },
                  { text: "Docx", value: "docx" },
                  { text: "RTF", value: "rtf" },
                ]}
                stateFunc={setFormat}
                value={format}
                legendText="Формат"
              />
            </div>
          </div>
          <RightSide sum={sum} time={time} isDisabled={isDisabled} />
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default App;
