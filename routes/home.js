var express = require("express");
var router = express.Router();

router.get("/", (req, res, next) => {
  res.render("index", { title: "[AWS S3 Node Service]" });
});

module.exports = router;
