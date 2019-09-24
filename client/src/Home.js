import React, { Component } from "react";
import axios from "axios";

import LeagueHome from "./components/LeagueHome";
import Welcome from "./components/Welcome";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Welcome user={this.props.user} />
        <br />
        <br />
        <p>I supoose league info and matchups will go here?</p>
        <p>After logging in of course</p>
      </div>
    );
  }
}

export default Home;
