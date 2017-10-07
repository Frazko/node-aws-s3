var express = require("express"),
    router = express.Router(),
    aws = require("aws-sdk"),
    config = require("../config/");

router.get("/", (req, res, next) => {
    var photos = new Set();

    var params = {
        Bucket: config.S3Bucket
    };
    var s3 = new aws.S3();
    s3.listObjects(params, (err, data) => {
        if (err) throw err;
        data.Contents.map(item => {
            photos.add("https://" + params.Bucket + ".s3.amazonaws.com/" + item.Key);
            // photos.push("https://" + params.Bucket + ".s3.amazonaws.com/" + item.Key);
            console.log("https://" + params.Bucket + ".s3.amazonaws.com/" + item.Key);
        });

        res.render("photos", {
            photos: photos,
            title: "[Lista de fotos en AWS S3]"
        });
    });
});

module.exports = router;