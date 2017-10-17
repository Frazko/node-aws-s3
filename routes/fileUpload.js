var express = require("express"),
  router = express.Router(),
  fs = require("fs"),
  aws = require("aws-sdk"),
  config = require("../config/"),
  imgProc = require("../imgProcessor"),
  formidable = require("formidable"),
  http = require("http"),
  util = require("util"),
  path = require("path");
// https://github.com/louischatriot/nedb

aws.config.update({
  accessKeyId: config.S3AccessKey,
  secretAccessKey: config.S3Secret
});

router.post("/", function(req, res, next) {
  console.log("...Got /fileUpload");
  var form = new formidable.IncomingForm();
  console.log("...  1 - Formidable.incomming");

  form
    .parse(req)
    .on("field", function(name, field) {
      console.log(" ");
      console.log("     on field");
      console.log(" ");
      //   console.log("Got a field:", field);
      console.log("2 Got a field name:", name, field);
      dbDocPath = field;
    })
    .on("progress", function(bytesReceived, bytesExpected) {
      var percent_complete = bytesReceived / bytesExpected * 100;
      console.log("3 Progress::::: " + percent_complete.toFixed(2));
    })
    .on("file", function(name, file) {
      console.log(" ");
      console.log("     on file");
      console.log("------    4 Got a File:", file, name);
      console.log(" ");

      // store all uploads in the /uploads directory
      form.uploadDir = "uploads";

      let filename = file.name; // Date.now() + "_" + file.name;

      fs.rename(file.path, path.join(form.uploadDir, filename));
      var bucket = new aws.S3();

      imgProc
        .convertImgs(process.env.PWD + "/uploads/" + filename)
        .then(image => {
          console.log("convertImgs success", image);
          bucket
            .upload({
              Bucket: config.S3Bucket,
              Key: Date.now() + filename,
              ACL: "public-read", // your permisions
              ContentType: "image/jpeg",
              Body: image
            })
            .on("httpUploadProgress", function(evt) {
              console.log("Progress:", evt.loaded, "/", evt.total);
            })
            .send((err, data) => {
              if (err) {
                console.log("Error uploading data: ", err);
              } else {
                //delete local file
                console.log("Successfully Upload Complete", data);
                //   res.redirect("/photos");
                // fs.unlinkSync(process.env.PWD + "/uploads/" + filename);
                fs.unlink(process.env.PWD + "/uploads/" + filename, err => {
                  if (err) return console.log("Removing file error:", err);
                  console.log("file deleted successfully");
                });
                console.log("Removing image " + filename);
              }
            });
        })
        .catch(err => {
          // handle an exception
          console.log("imgProc -- Error", err);
        });
    })
    .on("error", function(err) {
      res.send({ success: false, error: err });
    })
    .on("end", function() {
      res.send({ success: true });
    });
});

aws.config.update({ region: "us-east-1" });
router.get("/", function(req, res, next) {
  res.render("upload", { title: "[Subir fotos a AWS S3]" });
});

module.exports = router;
