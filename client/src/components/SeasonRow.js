import React, { Component } from "react";

class SeasonRow extends Component {
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
    console.log(this.props);
  }

  render() {
    return (
      <tr>
        <td>Add</td>
        <td>
          <strong>Total</strong>
        </td>
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

export default SeasonRow;
