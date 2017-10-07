"use strict";

var Jimp = require("jimp"),
    fs = require("fs"),
    path = require("path"),
    _ = require("lodash"),
    Promise = require("bluebird"),
    fileType = require("file-type");

module.exports = {
    convertImgs(file) {
        // let promises = [];

        // _.forEach(files, file => {
        //Create a new promise for each image processing
        let promise = new Promise((resolve, reject) => {
            //Resolve image file type
            let type = fileType(file.buffer);

            //Create a jimp instance for this image
            Jimp.read(file.buffer, (err, image) => {
                //Resize this image
                image
                    .resize(512, 512)
                    //lower the quality by 50%
                    .quality(50)
                    .getBuffer(type.mime, (err, buffer) => {
                        // //Transfer image file buffer to base64 string
                        // let base64Image = buffer.toString("base64");
                        // let imgSrcString = "data:" + type.mime + ";base64, " + base64Image;
                        // //Resolve base94 string
                        // resolve(imgSrcString);
                        resolve(buffer);
                    });
            });
        });

        // promises.push(promise);
        // });

        //Return promise array
        return promise;
        // return Promise.all(promises);
    }
};