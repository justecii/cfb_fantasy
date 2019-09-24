import React, { Component } from "react";

class Welcome extends Component {
  render() {
    if (this.props.user) {
      return <h3>Welcome {this.props.user.name}</h3>;
    } else {
      return <h3>Welcome User</h3>;
    }
  }
}

export default Welcome;
