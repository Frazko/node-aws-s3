var express = require("express"),
    path = require("path"),
    favicon = require("serve-favicon"),
    logger = require("morgan"),
    cookieParser = require("cookie-parser"),
    bodyParser = require("body-parser"),
    index = require("./routes/index"),
    app = express(),
    ejs = require("ejs"),
    //Import imgProcessor module which we would implement later
    imgProc = require("./imgProcessor");
const { maxFileSize } = require("./config");
const { urlencoded, json } = require("body-parser");

// view engine setup
app.use(urlencoded({ limit: maxFileSize, extended: true }));
app.use(json({ limit: maxFileSize }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;

app.listen(4000, function() {
    console.log("Example app listening on port 4000!");
});