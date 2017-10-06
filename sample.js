var express = require("express"),
    aws = require("aws-sdk"),
    bodyParser = require("body-parser"),
    multer = require("multer"),
    multerS3 = require("multer-s3");

var accessKeyId = process.env.AWS_ACCESS_KEY || "AKIAITQ3RAUMMG3MP56A";
var secretAccessKey =
    process.env.AWS_SECRET_KEY || "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";

aws.config.update({
    secretAccessKey: secretAccessKey,
    accessKeyId: accessKeyId,
    region: "us-east-1"
});

var app = express(),
    s3 = new aws.S3();

app.use(bodyParser.json());

var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: "instapaz",
        acl: "public-read",
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function(req, file, cb) {
            console.log(file);
            cb(null, Date.now() + "_" + file.originalname); //use Date.now() for unique file keys
        }
    })
});

//open in browser to see upload form
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
    var params = {
        Bucket: "instapaz"
    };

    s3.listObjects(params, (err, data) => {
        if (err) throw err;
        data.Contents.map(item => {
            console.log("https://" + params.Bucket + ".s3.amazonaws.com/" + item.Key);
            // console.log(item);
        });
    });
});

//used by upload form
app.post("/upload", upload.array("photo", 1), (req, res, next) => {
    res.send("Uploaded!");
});

app.listen(3000, () => {
    console.log("Example app listening on port 3000!");
});