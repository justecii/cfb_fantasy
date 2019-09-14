import React, { Component } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

class StatsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allTeams: [],
      roster: "Air Force",
      players: [],
      stats: []
    };

    this.handleTeam = this.handleTeam.bind(this);
  }

  componentDidMount() {
    axios.get("/stats/teams").then(result => {
      this.setState({
        allTeams: result.data
      });
    });
    axios
      .post("/stats/players", {
        roster: encodeURI(this.state.roster)
      })
      .then(result => {
        this.setState({
          players: result.data
        });
      });
  }

  handleTeam(e) {
    this.setState(
      {
        roster: e.target.value
      },
      () => {
        axios
          .post("/stats/players", {
            roster: encodeURI(this.state.roster)
          })
          .then(result => {
            this.setState({ players: result.data });
          });
      }
    );
    // console.log(e.target.value);
    // fetch(this.state.roster).then(result => console.log(result));
  }

  render() {
    let mappedTeams = this.state.allTeams.map(school => (
      <option value={school.school} key={school.id}>
        {school.school}
      </option>
    ));
    let mappedPlayers = this.state.players.map(player => (
      <option value={player.id} key={player.id}>
        {player.last_name}, {player.first_name}
      </option>
    ));
    return (
      <div>
        <p>stats Page</p>
        <select onChange={e => this.handleTeam(e)}>{mappedTeams}</select>
        <select name="players">{mappedPlayers}</select>
      </div>
    );
  }
}

export default StatsPage;
