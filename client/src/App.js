import React, { Component } from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Modal from "react-modal";
import axios from "axios";

import StatsPage from "./StatsPage";
import Home from "./Home";
import League from "./League";
import MyTeam from "./MyTeam";
import Signup from "./Signup";
import Login from "./Login";
import LeagueRoute from "./components/LeagueRoute";

import "./App.css";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    padding: "25px",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#ADD8E6",
    color: "white"
  }
};
const selectedStyle = {
  borderBottom: "3px solid #7acfd6",
  color: "#7acfd6"
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      user: {},
      loginIsOpen: false,
      signupIsOpen: false
    };
    this.liftTokenToState = this.liftTokenToState.bind(this);
    this.logout = this.logout.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openSignUp = this.openSignUp.bind(this);
    this.afterOpenSignUp = this.afterOpenSignUp.bind(this);
    this.closeSignUp = this.closeSignUp.bind(this);
  }

  liftTokenToState(data) {
    this.setState({ token: data.token, user: data.user });
  }

  logout() {
    localStorage.removeItem("mernToken");
    this.setState({
      token: "",
      user: {}
    });
  }

  componentDidMount() {
    // If there is a token in localStorage
    var token = localStorage.getItem("mernToken");
    if (
      token === "undefined" ||
      token === null ||
      token === "" ||
      token === undefined
    ) {
      localStorage.removeItem("mernToken");
      this.setState({
        token: "",
        user: {}
      });
    } else {
      //   Validate the token against the server
      axios
        .post("/auth/me/from/token", {
          token: token
        })
        .then(response => {
          //   Store the token and user
          localStorage.setItem("mernToken", response.data.token);
          this.setState({
            token: response.data.token,
            user: response.data.user
          });
          //   Pass User into child components and display main app
        })
        .catch(err => {
          // Both the JWT and db errors will be caught here
          console.log(err);
        });
    }
  }

  openModal() {
    this.setState({ loginIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = "#ffd700";
  }

  closeModal() {
    this.setState({ loginIsOpen: false });
  }

  openSignUp() {
    this.setState({ signUpIsOpen: true });
  }

  afterOpenSignUp() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = "#ffd700";
  }

  closeSignUp() {
    this.setState({ signUpIsOpen: false });
  }

  render() {
    if (
      typeof this.state.user === "object" &&
      Object.keys(this.state.user).length !== 0
    ) {
      return (
        <Router>
          <div className="App">
            <nav>
              <li>
                <NavLink to="/">Fantasy NCAAF</NavLink>
              </li>
              <li>
                <NavLink to="/league" activeStyle={selectedStyle}>
                  League
                </NavLink>
              </li>
              <li>
                <NavLink to="/myteam" activeStyle={selectedStyle}>
                  My Team
                </NavLink>
              </li>
              <li>
                <NavLink to="/stats" activeStyle={selectedStyle}>
                  Stats Page
                </NavLink>
              </li>
              <li onClick={this.logout}>
                <NavLink to="/">Log Out</NavLink>
              </li>
            </nav>
            <Route
              exact
              path="/"
              render={props => <Home {...props} user={this.state.user} />}
            />
            <Route
              exact
              path="/league"
              render={props => <League {...props} user={this.state.user} />}
            />
            <Route
              exact
              path="/stats"
              render={props => <StatsPage {...props} user={this.state.user} />}
            />
            <Route
              exact
              path="/myteam"
              render={props => <MyTeam {...props} user={this.state.user} />}
            />
          </div>
        </Router>
      );
    } else {
      return (
        <Router>
          <div className="App">
            <nav>
              <li>
                <NavLink to="/">Fantasy NCAAF</NavLink>
              </li>
              <li>
                <a onClick={this.openModal}>Login</a>
              </li>
              <li>
                <a onClick={this.openSignUp}>Sign Up</a>
              </li>
            </nav>
            <Modal
              isOpen={this.state.loginIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              style={customStyles}
              contentLabel="Login Modal"
            >
              <h2 className="yllw" ref={subtitle => (this.subtitle = subtitle)}>
                Login
              </h2>
              <Login lift={this.liftTokenToState} />
              <button className="fltRight" onClick={this.closeModal}>
                Cancel
              </button>
            </Modal>
            <Modal
              isOpen={this.state.signUpIsOpen}
              onAfterOpen={this.afterOpenSignUp}
              onRequestClose={this.closeSignUp}
              style={customStyles}
              contentLabel="Sign Up Modal"
            >
              <h2 className="yllw" ref={subtitle => (this.subtitle = subtitle)}>
                Sign Up
              </h2>
              <Signup lift={this.liftTokenToState} />
              <button className="inline" onClick={this.closeSignUp}>
                Cancel
              </button>
            </Modal>
            <Route exact path="/" component={Home} />
          </div>
        </Router>
      );
    }
  }
}

export default App;
