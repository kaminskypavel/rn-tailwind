import { useEffect } from "react";
import notifee, { EventType } from "@notifee/react-native";
import axios from "axios";
import messaging from "@react-native-firebase/messaging";

async function bootstrap() {
  // Get the token
  // https://notifee.app/react-native/docs/integrations/fcm#subscribing-to-messages
  await messaging().registerDeviceForRemoteMessages();
  const token = await messaging().getToken();
  console.log("Token 📱📱📱", token);

  async function onMessageReceived(message: any) {
    const remoteChannelId = await notifee.createChannel({
      id: "remote",
      name: "remote notifications Channel",
    });

    const { title = "title", body = "body" } = JSON.parse(message.data.notifee);

    notifee.displayNotification({
      title,
      body,
      android: {
        color: "#9c27b0",
        channelId: remoteChannelId,
        largeIcon: require("./../assets/images/icon.png"),
      },
    });
  }
  messaging().onMessage(onMessageReceived);
  messaging().setBackgroundMessageHandler(onMessageReceived as any);

  const initialNotification = await notifee.getInitialNotification();
  if (initialNotification) {
    console.log(
      "Notification caused application to open",
      initialNotification.notification
    );
    console.log(
      "Press action used to open the app",
      initialNotification.pressAction
    );
  }
}
export const useBackgroundNotifications = () => {
  // https://notifee.app/react-native/docs/events#background-events
  notifee.onBackgroundEvent(async ({ type, detail }) => {
    console.log("Background Notification Event 😮😮😮", { type, detail });
    const { notification, pressAction } = detail;

    // Update external API
    const res = await fetch(`https://api.chucknorris.io/jokes/random`);
    const data = await res.json();
    console.log("CHUCK NORRIS JOKE", data);

    // Check if the user pressed the "Mark as read" action
    if (type === EventType.ACTION_PRESS) {
      // Remove the notification
      if (notification?.id) await notifee.cancelNotification(notification.id);
    }
  });
};

const usePushNotifications = () => {
  // Subscribe to events
  useEffect(() => {
    // https://notifee.app/react-native/docs/events#app-open-events
    bootstrap()
      .then(() => console.log("done notification bootstrap"))
      .catch(console.error);

    // https://notifee.app/react-native/docs/events#foreground-events
    notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log("User dismissed notification", detail.notification);
          break;
        case EventType.PRESS:
          console.log("User pressed notification", detail.notification);
          break;
      }
    });
  }, []);
};

export default usePushNotifications;
