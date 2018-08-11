//import {require} from "../src/test";
const functions = require('firebase-functions');
const os = require('os');
const path = require('path');
const spawn = require('child-process-promise').spawn;
const cors = require('cors')({ origin: true });
const Busboy = require('busboy');
const fs = require('fs');

const gcconfig = {
  projectId: 'image-cloud-f9417',
  keyFilename: 'image-cloud-f9417-firebase-adminsdk-fc8yu-da8f02aa1d.json'
};

const gcs = require("@google-cloud/storage")(gcconfig);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.onFilechange = functions.storage.object().onFinalize(event => {
  const bucket = gcs.bucket("image-cloud-f9417.appspot.com");
  const tmp = path.join(os.tmpdir(),path.basename('133.png'));
  return bucket.file('133.png').download({
    des: tmp
  });
});

exports.uploadFile = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if (req.method !== "POST") {
      return res.status(500).json({
        message: 'Not allowed'
      });
    }
    const busboy = new Busboy({ headers: req.headers });
    let uploadData = null;

    busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
      const filepath = path.join(os.tmpdir(), filename);
      uploadData = { file: filepath, type: mimetype };
      file.pipe(fs.createWriteStream(filepath));
    });

    // time to parse the data
    busboy.on("finish", () => {
      const bucket = gcs.bucket("image-cloud-f9417.appspot.com"); // storage address
      bucket
        .upload(uploadData.file, {
          uploadType: "media",
          metadata: {
            metadata: {
              contentType: uploadData.type
            }
          }
        })
        .then(() => {
          res.status(200).json({
            message: "It worked!"
          });
          return 'marker';
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
    });
    busboy.end(req.rawBody);
  });
});

