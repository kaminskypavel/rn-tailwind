// ! https://notifee.app/react-native/docs/integrations/fcm

import admin from "firebase-admin";
import serviceAccount from "./serviceAccount-easy-tax-8097d-40da61ebfb08.json";
import { Command } from "commander";
const program = new Command();

program.option("-t, --token <token>", "android push notificaton token");
program.parse();

// Initialize Firebase
admin.initializeApp({
  // @ts-ignore
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://easy-tax-8097d.firebaseio.com",
});

async function sendMessage() {
  const tokens = [program.opts().token];

  console.log("segding messages");
  // Send a message to devices with the registered tokens
  const res = await admin.messaging().sendMulticast({
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

  console.log(res);
  console.log("completed 🍌🍌");
}

// Send messages to our users
sendMessage();
