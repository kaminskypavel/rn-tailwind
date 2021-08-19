// ! https://notifee.app/react-native/docs/integrations/fcm

import admin from "firebase-admin";
import serviceAccount from "./serviceAccount-easy-tax-8097d-40da61ebfb08.json";

const TOKEN = `ceNr9wGURcyl3sv_tg1wPQ:APA91bEIoFHC0E04gQec5L_IGRBEDCaB2TT2SFxZst1iD-_CupgjIr1ZmkKGgjuKrKEAQUnKwm_gmdAD05VIcJbmzMwO3zBRvw_houBnUIXmVgqP5aQKWhqGiaOrEibvX9nqKacyQvg4`;

// Initialize Firebase
admin.initializeApp({
  // @ts-ignore
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://easy-tax-8097d.firebaseio.com",
});

async function sendMessage() {
  // Fetch the tokens from an external datastore (e.g. database)
  const tokens = [TOKEN];

  console.log("segning messages");
  // Send a message to devices with the registered tokens
  await admin.messaging().sendMulticast({
    tokens,
    // https://github.com/notifee/react-native-notifee/issues/183#issuecomment-731196022
    android: {
      priority: "high",
    },
    // @ts-ignore
    data: {
      notifee: JSON.stringify({
        hello: "world!",
        title: "remote notification",
      }),
    },
  });

  console.log("complete 🍌🍌");
}

// Send messages to our users
sendMessage();
