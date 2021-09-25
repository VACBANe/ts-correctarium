import { calcDate } from "../datemodule";

describe("test add function", () => {
  it("Заказ в выходной день, работы на часа 4", () => {
    expect(calcDate(14400, new Date('September 25, 2021 16:00:00'))).toStrictEqual(["27.09.2021", "14:00"]);
  });
  it("Заказ в рабочий день, 12:00, работы на часа 4", () => {
    expect(calcDate(14400, new Date('September 27, 2021 12:00:00'))).toStrictEqual(14400);
  });
  it("Заказ в рабочий день, 18:00, работы на часа 4", () => {
    expect(calcDate(14400, new Date('September 27, 2021 18:00:00'))).toStrictEqual(["28.09.2021", "13:00"]);
  });
  it("Заказ в рабочий день, 09:00, работы на часа 3 и 30 мин", () => {
    expect(calcDate(12600, new Date('September 27, 2021 09:00:00'))).toStrictEqual(16200);
  });
  it("Заказ в пятницу, работы на сутки", () => {
    expect(calcDate(86400, new Date('September 24, 2021 17:00:00'))).toStrictEqual(["28.09.2021", "14:00"]);
  });
  it("Заказ в пятницу, работы больше, чем на неделю", () => {
    expect(calcDate(172800, new Date('September 24, 2021 20:00:00'))).toStrictEqual(["30.10.2021", "17:00"]);
  });
});