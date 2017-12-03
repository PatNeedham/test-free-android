const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// The Firebase Admin SDK to access the Firebase Realtime Database. 
const admin = require('firebase-admin');
const gcs = require('@google-cloud/storage')();
const vision = require('@google-cloud/vision')();
admin.initializeApp(functions.config().firebase);

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.addMessage = functions.https.onRequest((req, res) => {
   return res.send("Hello World")
});

exports.newPicUpload = functions.storage.object().onChange(_analyzeNewImage);

function _analyzeNewImage(event){
    const object = event.data;
    const file   = gcs.bucket(object.bucket).file(object.name);


const wasRemoved = object.resourceState === 'not_exists';
if (wasRemoved) {
  return console.log('This is a deletion event.');
}

// const cloudVisionAPT = {
//     annotateImage: vision.annotateImage()
// };

vision.annotateImage(file, (Error,object) => {
    console.log("Return from annotated Image");
    console.log("Error" + Error);
    console.log("Object" + JSON.stringify(object,null,2));
})


}