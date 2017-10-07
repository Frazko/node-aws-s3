var express = require("express");
var router = express.Router();
var aws = require("aws-sdk");

router.get("/", (req, res, next) => {
    // res.render("photos", { title: "Welcome this is home" });
    // var photos = []; //new Set();
    var photos = ["geddy", "neil", "alex"];

    var params = {
        Bucket: "instapaz"
    };
    var s3 = new aws.S3();
    s3.listObjects(params, (err, data) => {
        if (err) throw err;
        data.Contents.map(item => {
            // console.log(item);
            // photos.add("https://" + params.Bucket + ".s3.amazonaws.com/" + item.Key);
            photos.push("https://" + params.Bucket + ".s3.amazonaws.com/" + item.Key);
            console.log("https://" + params.Bucket + ".s3.amazonaws.com/" + item.Key);
        });

        res.render("photos", { photos: photos, title: "Welcome this is home" });
    });

    // res.render("photos", { photos: photos, title: "Welcome this is home" });
    // res.render("photos", { title: "Welcome this is home" });
});

module.exports = router;

/*
var express = require("express");
var router = express.Router();


router.get("/", (req, res) => {
    // var photos = []; //new Set();
    var photos = ["geddy", "neil", "alex"];

    // var params = {
    //     Bucket: "instapaz"
    // };
    // s3.listObjects(params, (err, data) => {
    //     if (err) throw err;
    //     data.Contents.map(item => {
    //         // console.log(item);
    //         // photos.add("https://" + params.Bucket + ".s3.amazonaws.com/" + item.Key);
    //         photos.push("https://" + params.Bucket + ".s3.amazonaws.com/" + item.Key);
    //         console.log("https://" + params.Bucket + ".s3.amazonaws.com/" + item.Key);
    //     });

    //     res.render("list", { photos: photos });
    // });

    res.render("list", { photos: photos });
});

module.exports = router;

*/