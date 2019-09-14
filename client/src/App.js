import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import StatsPage from "./StatsPage";
import Home from "./Home";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <nav>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/stats">Stats Page</NavLink>
            </li>
          </nav>
          <Route exact path="/" component={Home} />
          <Route path="/stats" component={StatsPage} />
        </div>
      </Router>
    );
  }
}

export default App;
