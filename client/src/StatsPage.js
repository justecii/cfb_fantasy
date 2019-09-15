import React, { Component } from "react";
import axios from "axios";

import PlayerInfo from "./components/PlayerInfo";

class StatsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allTeams: [],
      roster: "Air Force",
      players: [],
      selectedPlayer: ""
    };

    this.handleTeam = this.handleTeam.bind(this);
    this.handlePlayer = this.handlePlayer.bind(this);
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
  }

  handlePlayer(e) {
    this.setState({
      selectedPlayer: e.target.value
    });
  }

  render() {
    let mappedTeams = this.state.allTeams.map(school => (
      <option value={school.school} key={school.id}>
        {school.school}
      </option>
    ));
    let mappedPlayers = this.state.players.map(player => (
      <option value={player.id} key={player.id} id={player.first_name}>
        {player.last_name}, {player.first_name}
      </option>
    ));
    return (
      <div>
        <p>stats Page</p>
        <select onChange={e => this.handleTeam(e)}>{mappedTeams}</select>
        <select onChange={e => this.handlePlayer(e)}>{mappedPlayers}</select>
        <PlayerInfo
          selectedPlayer={this.state.selectedPlayer}
          roster={this.state.roster}
        />
      </div>
    );
  }
}

export default StatsPage;
