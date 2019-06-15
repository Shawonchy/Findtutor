import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layouts/Navbar";
import register from "./components/auth/register";
import login from "./components/auth/login";
import landing from "./components/layouts/landing";
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Route exact path="/" component={landing} />
        <div className="container">
          <Route exact path="/register" component={register} />
          <Route exact path="/login" component={login} />
        </div>
      </div>
    </Router>
  );
}

export default App;
