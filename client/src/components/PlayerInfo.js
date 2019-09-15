import React, { Component } from "react";
import axios from "axios";

import GameTable from "./GameTable";

class PlayerInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: ""
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.selectedPlayer !== this.props.selectedPlayer) {
      axios
        .post("/stats/players/selected", {
          roster: encodeURI(this.props.roster),
          playerId: this.props.selectedPlayer
        })
        .then(result => {
          // for loop to use player id to find player full name to display
          for (let i = 0; i < result.data.length; i++) {
            if (this.props.selectedPlayer === result.data[i].id) {
              this.setState({
                firstName: result.data[i].first_name,
                lastName: result.data[i].last_name
              });
            }
          }
        });
    }
  }

  render() {
    return (
      <div>
        <h2>
          {this.state.firstName} {this.state.lastName}
        </h2>
        <h3>{this.props.roster}</h3>
        <GameTable
          team={this.props.roster}
          playerId={this.props.selectedPlayer}
        />
      </div>
    );
  }
}

export default PlayerInfo;
