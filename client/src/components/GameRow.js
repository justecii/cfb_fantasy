import React, { Component } from "react";
import axios from "axios";

class GameRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStats: [],
      opponent: "",
      passYd: 0,
      passTd: 0,
      rushYd: 0,
      rushTd: 0,
      recYd: 0,
      recTd: 0
    };
  }
  componentDidMount() {
    axios
      .post("/games/log", {
        team: encodeURI(this.props.team),
        gameId: this.props.gameId
      })
      .then(result =>
        this.setState({
          gameStats: result.data[0].teams
        })
      );
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.gameStats !== this.state.gameStats ||
      prevProps.playerId !== this.props.playerId
    ) {
      if (prevProps.playerId !== this.props.playerId) {
        this.setState({
          passYd: 0,
          passTd: 0,
          rushYd: 0,
          rushTd: 0,
          recYd: 0,
          recTd: 0
        });
      }
      for (let i = 0; i < this.state.gameStats.length; i++) {
        if (this.state.gameStats[i].school !== this.props.team) {
          this.setState({ opponent: this.state.gameStats[i].school });
          console.log(this.state.gameStats);
        } else {
          //   find passing yards
          let categories = this.state.gameStats[i].categories;
          //   seperate each stat category
          for (let j = 0; j < categories.length; j++) {
            //   look for passing stats
            if (categories[j].name === "passing") {
              let types = categories[j].types;
              //   console.log(types);
              //   iterate through passing stats
              for (let k = 0; k < types.length; k++) {
                if (types[k].name === "YDS") {
                  let athletes = types[k].athletes;
                  for (let l = 0; l < athletes.length; l++) {
                    if (athletes[l].id === this.props.playerId) {
                      this.setState({ passYd: athletes[l].stat });
                    }
                  }
                  //   console.log(types[k].athletes);
                } else if (types[k].name === "TD") {
                  let athletes = types[k].athletes;
                  for (let l = 0; l < athletes.length; l++) {
                    if (athletes[l].id === this.props.playerId) {
                      this.setState({ passTd: athletes[l].stat });
                    }
                  }
                }
              }

              //   console.log(categories[j].types);
            } else if (categories[j].name === "rushing") {
              // find rushing stats
              let types = categories[j].types;
              for (let k = 0; k < types.length; k++) {
                if (types[k].name === "YDS") {
                  let athletes = types[k].athletes;
                  for (let l = 0; l < athletes.length; l++) {
                    if (athletes[l].id === this.props.playerId) {
                      this.setState({ rushYd: athletes[l].stat });
                    }
                  }
                  //   console.log(types[k].athletes);
                } else if (types[k].name === "TD") {
                  let athletes = types[k].athletes;
                  for (let l = 0; l < athletes.length; l++) {
                    if (athletes[l].id === this.props.playerId) {
                      this.setState({ rushTd: athletes[l].stat });
                    }
                  }
                }
              }
            } else if (categories[j].name === "receiving") {
              // find receiving stats
              let types = categories[j].types;
              for (let k = 0; k < types.length; k++) {
                if (types[k].name === "YDS") {
                  let athletes = types[k].athletes;
                  for (let l = 0; l < athletes.length; l++) {
                    if (athletes[l].id === this.props.playerId) {
                      this.setState({ recYd: athletes[l].stat });
                    }
                  }
                  //   console.log(types[k].athletes);
                } else if (types[k].name === "TD") {
                  let athletes = types[k].athletes;
                  for (let l = 0; l < athletes.length; l++) {
                    if (athletes[l].id === this.props.playerId) {
                      this.setState({ recTd: athletes[l].stat });
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  render() {
    return (
      <tr>
        <td className="gameId">{this.props.gameId}</td>
        <td>{this.state.opponent}</td>
        <td>{this.state.passYd}</td>
        <td>{this.state.passTd}</td>
        <td>{this.state.rushYd}</td>
        <td>{this.state.rushTd}</td>
        <td>{this.state.recYd}</td>
        <td>{this.state.recTd}</td>
      </tr>
    );
  }
}

export default GameRow;
