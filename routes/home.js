var express = require("express");
var router = express.Router();

router.get("/", (req, res, next) => {
    res.render("index", { title: "Welcome this is home" });
});

module.exports = router;