var express = require("express");
var router = express.Router();
//
var users = require("./users");
var list = require("./list");
var home = require("./home");
var upload = require("./upload");

router.use("/", home);
router.use("/users", users);
router.use("/photos", list);
router.use("/upload", upload);

module.exports = router;

// router.post("/download", function(req, res, next) {
//     var s3 = new aws.S3();
//     // console.log(req.body.diskname);
//     var params = {
//         Bucket: "dev.sociogators.files",
//         Key: req.body.diskname
//     };
//     // console.log(params);
//     // res.attachment(req.body.diskname);
//     s3.getObject(params, function(error, data) {
//         if (error != null) {
//             console.log("Failed to retrieve an object: " + error);
//         } else {
//             console.log("Loaded " + data.ContentLength + " bytes");
//             // do something with data.body
//         }
//     });
//     // var file = fs.createWriteStream('/public/images/'+req.body.diskname+'');
//     // s3.getObject(params).createReadStream().pipe(file);
//     res.redirect("/upload");
// });