var express = require("express");
var router = express.Router();
var request = require("request");

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

router.post("/players", function(req, res, next) {
  let roster = req.body.roster;
  const rosterURL = "https://api.collegefootballdata.com/roster?team=";
  console.log(rosterURL + roster);
  request(rosterURL + roster, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body); // Print the google web page.
    }
  });
});

module.exports = router;
