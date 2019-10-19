import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import Admin from "./Admin";
import { HashRouter } from "react-router-dom";
//ReactDOM.render(<App />, document.getElementById("root"));
//ReactDOM.render(<Admin />, document.getElementById("root1"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

if (window.location.pathname === "/") {
  ReactDOM.render(<App />, document.getElementById("root"));
} else if (window.location.pathname === "/admin/dashboard") {
  ReactDOM.render(<Admin />, document.getElementById("root"));
}
serviceWorker.unregister();
