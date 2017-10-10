var express = require("express"),
    router = express.Router(),
    fs = require("fs"),
    Datastore = require("nedb"),
    multer = require("multer"),
    aws = require("aws-sdk"),
    config = require("../config/"),
    //Import imgProcessor module which we would implement later
    imgProc = require("../imgProcessor");
// https://github.com/louischatriot/nedb
//
/* Multer set storage location*/
// var storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, "uploads");
//     },
//     filename: function(req, file, cb) {
//         var str = file.originalname;
//         str = str.replace(/\s+/g, "-").toLowerCase();
//         global.poster = Date.now() + "_" + str;
//         cb(null, poster);
//     }
// });
var upload = multer({
    // storage: storage,
    storage: multer.memoryStorage(),
    limits: { fileSize: 52428800 }
});

aws.config.update({
    accessKeyId: config.S3AccessKey,
    secretAccessKey: config.S3Secret
});

// Upload images
router.post("/", upload.single("image"), function(req, res, next) {
    var s3 = new aws.S3();
    console.log("====================================");
    console.log(req.file);
    console.log("------------------------------------");
    console.log(req.body);
    console.log("====================================");
    if (!req.file) return;
    //Call the convertImgs method and pass the image files as its argument
    imgProc.convertImgs(req.file).then(image => {
        //After all image processing finished, send the base64 image string to client
        // res.json(imageStringArray);
        s3.upload({
                Bucket: config.S3Bucket,
                Key: Date.now() + req.file.originalname,
                ACL: "public-read", // your permisions
                ContentType: "image/jpeg",
                Body: image
            },
            (err, data) => {
                if (err) {
                    console.log("Error uploading data: ", err);
                } else {
                    //delete local file
                    console.log("Upload Complete", data);
                    // console.log("..delete local file", data);
                    // fs.unlinkSync(req.file.path);
                    //save image name to database
                    // var img = {
                    //     link: data["Location"],
                    //     name: req.file.originalname,
                    //     diskname: req.file.filename,
                    //     created: Date.now()
                    // };
                    // db.insert(img, function(err, newDoc) {
                    //     // Callback is optional
                    //     // newDoc is the newly inserted document, including its _id
                    //     // newDoc has no key called notToBeSaved since its value was undefined
                    // });
                    res.redirect("/photos");
                }
            }
        );
    });
});

aws.config.update({ region: "us-east-1" });
router.get("/", function(req, res, next) {
    res.render("upload", { title: "[Subir fotos a AWS S3]" });
});

module.exports = router;