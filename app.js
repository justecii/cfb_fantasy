require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const todoRoutes = express.Router();
const PORT = 4000;
let Todo = require("./models/user");
app.use(cors());
app.use(bodyParser.json());
mongoose.connect("mongodb://127.0.0.1:27017/cfb-fantasy", {
  useNewUrlParser: true
});
const connection = mongoose.connection;
connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

var path = require("path");
// var logger = require("morgan");
// var cookieParser = require("cookie-parser");

var auth = require("./routes/auth");
var games = require("./routes/games");
var index = require("./routes/index");
var stats = require("./routes/stats");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger("dev"));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use(function(req, res, next) {
//   // before every route, attach the flash messages and current user to res.locals
//   res.locals.currentUser = req.user;
//   next();
// });

app.use("/", index);
app.use("/auth", auth);
app.use("/games", games);
app.use("/stats", stats);
// app.use("/users", users);
app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});

app.get("*", function(req, res, next) {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

// catch 404 and forward to error handler - commented out
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
