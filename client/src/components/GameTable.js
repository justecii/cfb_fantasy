import React, { Component } from "react";
import axios from "axios";

import "../styles/GameTable.css";
import GameRow from "./GameRow";
import SeasonRow from "./SeasonRow";

class GameTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameLog: [],
      passYdTotal: 0,
      passTdTotal: 0,
      rushYdTotal: 0,
      rushTdTotal: 0,
      recYdTotal: 0,
      recTdTotal: 0
    };
    this.handleSeasonData = this.handleSeasonData.bind(this);
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

  handleSeasonData(e) {
    // this.setState({
    //   passYdTotal: this.state.passYdTotal + passYd,
    //   passTdTotal: this.state.passTdTotal + passTd
    // });
    // console.log(e);
  }

  render() {
    if (this.props.playerId === "") {
      return (
        <div>
          <table id="gameLogTable">
            <thead>
              <tr>
                <th>Game Id</th>
                <th>Opponent</th>
                <th>Pass Yds</th>
                <th>Pass TD</th>
                <th>Rush Yds</th>
                <th>Rush TD</th>
                <th>Rec Yds</th>
                <th>Rec TD</th>
              </tr>
            </thead>
          </table>
          <h3 className="holderData">
            Select School then Player to load stats
          </h3>
        </div>
      );
    } else {
      //   console.log(this.state.gameLog);
      let mappedGames = this.state.gameLog.map(game => (
        <GameRow
          gameId={game.id}
          team={this.props.team}
          playerId={this.props.playerId}
          key={game.id}
          handleSeasonData={this.handleSeasonData}
        />
      ));
      return (
        <table>
          <thead>
            <tr>
              <th>Game Id</th>
              <th>Opponent</th>
              <th>Pass Yds</th>
              <th>Pass TD</th>
              <th>Rush Yds</th>
              <th>Rush TD</th>
              <th>Rec Yds</th>
              <th>Rec TD</th>
            </tr>
          </thead>
          <tbody>
            {mappedGames}
            <SeasonRow playerId={this.props.playerId} />
          </tbody>
        </table>
      );
    }
  }
}

export default GameTable;
