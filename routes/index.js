var express = require("express");
var router = express.Router();
var app = express();
//
var users = require("./users");
var photos = require("./photos");
var home = require("./home");
var upload = require("./upload");
var fileUpload = require("./fileUpload");

router.use("/", home);
router.use("/users", users);
router.use("/photos", photos);
router.use("/upload", upload);
router.use("/fileUpload", fileUpload);

module.exports = router;
