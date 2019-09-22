import React, { Component } from "react";

import Standings from "./components/Standings";
import LeagueTable from "./components/LeagueTable";

class League extends Component {
  render() {
    return (
      <div>
        <h2>Standings:</h2>
        <LeagueTable />

        <h2>Transations</h2>
      </div>
    );
  }
}

export default League;
