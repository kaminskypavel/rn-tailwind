const functions = require("firebase-functions");
const vision = require("@google-cloud/vision");

const client = new vision.ImageAnnotatorClient();

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("helloWorld!", { structuredData: true });
  response.send("Hello from Firebase!");
});

exports.helloWorldOnCall = functions.https.onCall((data = {}, context) => {
  functions.logger.info("helloWorldOnCall!", { structuredData: true });

  return {
    text: "helloWorld",
    ...data,
  };
});

// This will allow only requests with an auth token to access the Vision
// API, including anonymous ones.
// It is highly recommended to limit access only to signed-in users. This may
// be done by adding the following condition to the if statement:
//    || context.auth.token?.firebase?.sign_in_provider === 'anonymous'
//
// For more fine-grained control, you may add additional failure checks, ie:
//    || context.auth.token?.firebase?.email_verified === false
// Also see: https://firebase.google.com/docs/auth/admin/custom-claims
exports.annotateImage = functions.https.onCall(async (data, context) => {
  // if (!context.auth) {
  //   console.error("unauthenticated");
  //   throw new functions.https.HttpsError(
  //     "unauthenticated",
  //     "annotateImage must be called while authenticated."
  //   );
  // }

  try {
    console.log("pre client.annotateImage, data =", JSON.stringify(data));
    const res = await client.annotateImage(data);
    console.log("post client.annotateImage, res =", res);
    return JSON.parse(res);
  } catch (e) {
    console.error("error", e);
    throw new functions.https.HttpsError("internal", e.message, e.details);
  }
});
