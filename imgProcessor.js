"use strict";

var Jimp = require("jimp"),
    fs = require("fs"),
    path = require("path"),
    Promise = require("bluebird"),
    fileType = require("file-type");

module.exports = {
    convertImgs(file) {
        //Create a new promise for each image processing
        let promise = new Promise((resolve, reject) => {
            //Resolve image file type
            let type = fileType(file.buffer);

            //Create a jimp instance for this image
            Jimp.read(file.buffer, (err, image) => {
                //Resize this image
                image
                    .resize(1000, Jimp.AUTO) //resize
                    .quality(80) //lower the quality by 50%
                    .getBuffer(type.mime, (err, buffer) => {
                        resolve(buffer);
                    });
            });
        });

        //Return promise array
        return promise;
    }
};