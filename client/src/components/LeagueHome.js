import React, { Component } from "react";

import LeagueList from "./LeagueList";

class LeagueHome extends Component {
  render() {
    return (
      <div>
        <LeagueList />
        <p>More content</p>
      </div>
    );
  }
}

export default LeagueHome;
