/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import messaging from "@react-native-firebase/messaging";

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    // eslint-disable-next-line no-undef
    console.log("Message handled in the background!", remoteMessage);

    return Promise.resolve();
});

AppRegistry.registerComponent(appName, () => App);
