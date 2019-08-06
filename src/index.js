import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Calculator from "./Calculator";
import * as serviceWorker from "./serviceWorker";
import { UPDATE, CLEAR } from "./actions";
import { createStore } from "redux";
import { Provider } from "react-redux";

const App = () => (
  <Provider store={store}>
    <Calculator />
  </Provider>
);

const initialState = {
  formula: [0],
  output: [0]
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE:
      return {
        formula: action.formula,
        output: action.output
      };
    case CLEAR:
      return {
        formula: [0],
        output: [0]
      };
    default:
      return state;
  }
}

const store = createStore(reducer);

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
