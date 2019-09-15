var express = require("express");
var router = express.Router();
var request = require("request");
// var isLoggedIn = require("../middleware/isLoggedIn");

// /* GET individual game data based on id. */
router.post("/log", function(req, res, next) {
  let game = req.body.gameId;
  const gameURL =
    "https://api.collegefootballdata.com/games/players?year=2019&gameId=";
  request(gameURL + game, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body);
    }
  });
});

module.exports = router;
