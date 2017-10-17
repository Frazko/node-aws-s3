"use strict";

var Jimp = require("jimp"),
  fs = require("fs"),
  path = require("path"),
  Promise = require("bluebird");
//   fileType = require("file-type");

module.exports = {
  convertImgs(file) {
    console.log("    -");
    console.log("    -");
    console.log("    > convertImgs", file);
    //Create a new promise for each image processing
    let promise = new Promise((resolve, reject) => {
      console.log("    > 1 Promise");
      //Resolve image file type
      let type = { ext: "jpg", mime: "image/jpeg" }; //fileType(file.buffer);

      //Create a jimp instance for this image
      //   Jimp.read(file.buffer)
      console.log("    > 2 Filename", file);
      Jimp.read(file)
        .then(image => {
          console.log("    > 3 Resize this image", image);
          //Resize this image
          image
            .resize(1000, Jimp.AUTO) //resize
            .quality(80) //lower the quality
            .getBuffer(type.mime, (err, buffer) => {
              console.log("    > 4 resolve buffer");
              resolve(buffer);
            });
        })
        .catch(function(err) {
          // handle an exception
          console.log(">>> Jimp Error", err);
        });
    }).catch(function(err) {
      // handle an exception
      console.log(">>> Promise Error", err);
    });

    //Return promise array
    return promise;
  }
};
