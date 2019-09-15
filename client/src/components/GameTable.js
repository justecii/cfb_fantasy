import React, { Component } from "react";
import axios from "axios";

import "../styles/GameTable.css";
import GameRow from "./GameRow";

class GameTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameLog: []
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.team !== this.props.team) {
      axios
        .post("/stats/teams/schedule", {
          team: encodeURI(this.props.team)
        })
        .then(result =>
          this.setState({
            gameLog: result.data
          })
        );
    }
  }
  render() {
    if (this.props.playerId === "") {
      return (
        <div>
          <table>
            <thead>
              <tr>
                <th>Game Id</th>
                <th>Opponent</th>
                <th>Passing Yards</th>
                <th>Passing TD</th>
                <th>Rushing Yards</th>
                <th>Rushing TD</th>
                <th>Receiving Yards</th>
                <th>Receiving TD</th>
                <th>{this.props.playerId}</th>
              </tr>
            </thead>
          </table>
          <h3>Select School then Player to load stats</h3>
        </div>
      );
    } else {
      let mappedGames = this.state.gameLog.map(game => (
        <GameRow
          gameId={game.id}
          team={this.props.team}
          playerId={this.props.playerId}
          key={game.id}
        />
      ));
      return (
        <table>
          <thead>
            <tr>
              <th>Game Id</th>
              <th>Opponent</th>
              <th>Passing Yards</th>
              <th>Passing TD</th>
              <th>Rushing Yards</th>
              <th>Rushing TD</th>
              <th>Receiving Yards</th>
              <th>Receiving TD</th>
            </tr>
          </thead>
          <tbody>{mappedGames}</tbody>
        </table>
      );
    }
  }
}

export default GameTable;
