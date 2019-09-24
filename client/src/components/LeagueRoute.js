import React, { Component } from "react";
import { BrowserRouter, Link, Router, Route } from "react-router-dom";

import League from "../League";
import Standings from "./Standings";

class LeagueRoute extends Component {
  render() {
    return (
      <div>
        <Link to={this.props.match.path}>League</Link>
        <Link to={`${this.props.match.path}/one`}>Standings</Link>
        <Route exact path={this.props.match.path} component={League} />
        <Route path={`${this.props.match.path}/one`} component={Standings} />
      </div>
    );
  }
}

export default LeagueRoute;
