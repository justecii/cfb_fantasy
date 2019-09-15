var express = require("express");
var router = express.Router();
var request = require("request");

// get complete list of cfb teams
router.get("/teams", function(req, res, next) {
  request("https://api.collegefootballdata.com/teams/fbs?year=2019", function(
    error,
    response,
    body
  ) {
    if (!error && response.statusCode == 200) {
      res.send(body); // Print the google web page.
    }
  });
});

// get team schedule
router.post("/teams/schedule", function(req, res, next) {
  let team = req.body.team;
  const teamURL =
    "https://api.collegefootballdata.com/games/teams?year=2019&seasonType=regular&team=";
  request(teamURL + team, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body); // Print the google web page.
    }
  });
});

// get entire roster of one team
router.post("/players", function(req, res, next) {
  let roster = req.body.roster;
  const rosterURL = "https://api.collegefootballdata.com/roster?team=";
  request(rosterURL + roster, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body); // Print the google web page.
    }
  });
});

// this might be replacable
router.post("/players/selected", function(req, res, next) {
  let roster = req.body.roster;
  let player = req.body.playerId;
  const rosterURL = "https://api.collegefootballdata.com/roster?team=";
  request(rosterURL + roster, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body);
    }
  });
});

module.exports = router;
