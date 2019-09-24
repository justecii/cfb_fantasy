import React, { Component } from "react";
import axios from "axios";

import AddLeague from "./AddLeague";

class LeagueList extends Component {
  constructor(props) {
    super(props);

    this.handleclick = this.handleclick.bind(this);
  }
  componentDidMount() {
    axios.post("/league/all").then(result => console.log(result.data));
  }
  handleclick() {
    axios.post("/league/all").then(result => console.log(result.data));
  }

  render() {
    return (
      <div>
        <p> FINDS LEAGUES</p>
        <button onClick={this.handleclick()}>Words</button>
      </div>
    );
  }
}

export default LeagueList;
