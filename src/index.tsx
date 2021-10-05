import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import reducer from "./store/reducer";
import App from "./App";
import { Provider } from "react-redux";

const store = createStore(reducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
