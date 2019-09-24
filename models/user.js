var mongoose = require("mongoose");
var bcrypt = require("bcrypt");

var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 99
  },
  email: {
    // TODO: Need to add email validation
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 99
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 99
  },
  leagues: [{ type: Schema.ObjectId, ref: "League" }],
  teams: [{ type: Schema.ObjectId, ref: "Team" }]
});

// Override 'toJSON' to prevent the password from being returned with the user
userSchema.set("toJSON", {
  transform: function(doc, ret, options) {
    var returnJson = {
      id: ret._id,
      email: ret.email,
      name: ret.name
    };
    return returnJson;
  }
});

userSchema.methods.authenticated = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, res) {
    if (err) {
      callback(err);
    } else {
      callback(null, res ? this : false);
    }
  });
};

// Mongoose's version of a beforeCreate hook
userSchema.pre("save", function(next) {
  var hash = bcrypt.hashSync(this.password, 10);
  // store the hash as the user's password
  this.password = hash;
  next();
});

var leagueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 99
  },
  rosterSize: {
    type: Number,
    required: true
  },
  qbs: {
    type: Number,
    required: true
  },
  rbs: {
    type: Number,
    required: true
  },
  wrs: {
    type: Number,
    required: true
  },
  tes: {
    type: Number,
    required: true
  },
  idp: {
    type: Number,
    required: true
  },
  kickers: {
    type: Number,
    required: true
  },
  teamDef: {
    type: Number,
    required: true
  },
  benchSize: {
    type: Number
  },
  teamNumber: {
    type: Number,
    required: true
  },
  teams: [{ type: Schema.ObjectId, ref: "Team" }],
  user: [{ type: Schema.ObjectId, ref: "User" }]
});

var teamSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 66
  },
  user: [{ type: Schema.ObjectId, ref: "User" }],
  players: [{ type: Schema.ObjectId, ref: "Player" }],
  league: [{ type: Schema.ObjectId, ref: "League" }]
});

var playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 99
  },
  position: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 4
  },
  school: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 25
  },
  dbId: {
    type: String,
    minlength: 1,
    maxlength: 99
  },
  team: [{ type: Schema.ObjectId, ref: "Team" }]
});

var League = mongoose.model("League", leagueSchema);
var Player = mongoose.model("Player", playerSchema);
var Team = mongoose.model("Team", teamSchema);
var User = mongoose.model("User", userSchema);

module.exports = {
  League: League,
  Player: Player,
  Team: Team,
  User: User
};
