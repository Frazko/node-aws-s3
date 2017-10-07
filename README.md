# AWS SDK for Node.js Boilerplate Project

A simple Node.js application illustrating usage of the AWS SDK for Node.js.

## Requirements

The only requirement of this application is the Node Package Manager. All other
dependencies (including the AWS SDK for Node.js) can be installed with:

    npm install | yarn

## Basic Configuration

You need to set up your AWS security credentials before the sample code is able
to connect to AWS. You can do this by creating a file named "credentials" at ~/.aws/ 
(C:\Users\USER_NAME\.aws\ for Windows users) and saving the following lines in the file:

    [default]
    aws_access_key_id = <your access key id>
    aws_secret_access_key = <your secret key>


Save this format to your config files

    {
        "host": "http://localhost:3000",
        "S3AccessKey": "<your access key id>",
        "S3Secret": "<your secret key>",
        "S3Bucket": "<your bucket>",
        "dbURL": "<your mongodb mlab url>"
    }

See the [Security Credentials](http://aws.amazon.com/security-credentials) page.
It's also possible to configure your credentials via a configuration file or
directly in source. See the AWS SDK for Node.js [Developer Guide](http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-configuring.html)
for more information.

## Running the S3 sample

This sample application connects to Amazon's [Simple Storage Service (S3)](http://aws.amazon.com/s3),
creates a bucket, and uploads files to that bucket. and fetch a list of images in the bucket. The script will automatically
create the file to upload. All you need to do is run it:

    nodemon

The S3 documentation has a good overview of the [restrictions for bucket names](http://docs.aws.amazon.com/AmazonS3/latest/dev/BucketRestrictions.html)
for when you start making your own buckets.

[10 min Tutorials](https://aws.amazon.com/es/getting-started/?sc_channel=em&sc_campaign=wlcm&sc_publisher=aws&sc_medium=em_wlcm_1&sc_detail=wlcm_1b&sc_content=other&sc_country=global&sc_geo=global&sc_category=mult&ref_=pe_1679150_132208640)

[Getting started](https://aws.amazon.com/es/documentation/gettingstarted/)

## License

This sample application is distributed under the
[Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0).

