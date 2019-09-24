var express = require("express");
var router = express.Router();
var request = require("request");
var { League } = require("../models/user");
// var isLoggedIn = require("../middleware/isLoggedIn");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.send("Hitting the league ROUTE");
});

router.post("/new", function(req, res, next) {
  League.create(
    {
      name: req.body.values.name,
      rosterSize: req.body.values.rosterSize,
      qbs: req.body.values.qbs,
      rbs: req.body.values.rbs,
      wrs: req.body.values.wrs,
      tes: req.body.values.tes,
      idp: req.body.values.idp,
      kickers: req.body.values.kickers,
      teamDef: req.body.values.teamDef,
      benchSize: req.body.benchSize,
      teamNumber: req.body.values.teamNumber,
      user: req.body.userId
    },
    function(err, result) {
      if (err) console.log(err);
    }
  );
});

router.post("/all", function(req, rest, next) {
  League.find({}, function(err, leagues) {
    if (err) return console.log(err);
    res.send(leagues);
  });
});

module.exports = router;
