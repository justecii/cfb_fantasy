var express = require("express");
var router = express.Router();
var request = require("request");
// var isLoggedIn = require("../middleware/isLoggedIn");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.send("Nothing at the root route yet...");
});

router.get("/stats", function(req, res, next) {
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

module.exports = router;
