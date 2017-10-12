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
  console.log("...Got /upload");
  var form = new formidable.IncomingForm();
  console.log("...  2");

  form
    .parse(req)
    .on("field", function(name, field) {
      //   console.log("Got a field:", field);
      console.log("Got a field name:", name);
      dbDocPath = field;
    })
    .on("file", function(name, file) {
      console.log("Got a File:", name);

      // store all uploads in the /uploads directory
      form.uploadDir = "uploads";

      let filename = file.name; // Date.now() + "_" + file.name;

      fs.rename(file.path, path.join(form.uploadDir, filename));

      // every time a file has been uploaded successfully,
      // rename it to it's orignal name

      var bucket = new aws.S3();

      //   bucket.putObject(
      //     {
      //       Bucket: "instapaz",
      //       Key: filename,
      //       ContentType: "image/jpeg",
      //       Body: fs.createReadStream(path.join(form.uploadDir, filename)),
      //       ACL: "public-read"
      //     },
      //     (perr, pres) => {
      //       console.log("Uploading Photo ");
      //       if (perr) {
      //         console.log("Error uploading data: ", perr);
      //       } else {
      //         fs.unlinkSync(path.join(form.uploadDir, filename));
      //         console.log("Successfully uploaded data", pres);
      //       }
      //     }
      //   );

      //   imgProc.convertImgs(__dirname + "/uploads/" + filename).then(image => {
      imgProc
        .convertImgs(process.env.PWD + "/uploads/" + filename)
        .then(image => {
          console.log("convertImgs success", image);
          bucket.upload(
            {
              Bucket: config.S3Bucket,
              Key: Date.now() + filename,
              ACL: "public-read", // your permisions
              ContentType: "image/jpeg",
              Body: image
            },
            (err, data) => {
              if (err) {
                console.log("Error uploading data: ", err);
              } else {
                //delete local file
                console.log("Successfully Upload Complete", data);
                //   res.redirect("/photos");
              }
            }
          );
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
