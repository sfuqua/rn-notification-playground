// npx ts-node -- scripts/test-notif.ts <FCM token>

import admin from "firebase-admin";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const serviceAccountJson = require("./firebase-adminsdk.json");

const [, , token] = process.argv;
if (!token) {
    throw new Error("No Firebase token specified as arg");
}

/**
 * Dispatches a "display message" - an FCM message with a notification body.
 * @param title The title of the display message
 * @param body The body of the display message
 */
export async function sendNotification(title = "Test title", body = "Test body") {
    const result = await admin.messaging().sendToDevice([token], {
        notification: {
            title,
            body,
            clickAction: "TEST",
        },
    });

    console.log(`Result: ${JSON.stringify(result)}`);
}

/**
 * Dispatches a "data-only message".
 */
export async function sendData() {
    const result = await admin.messaging().sendToDevice(
        [token],
        {
            data: {
                "some-key": "some-value",
            },
        },
        { priority: "high" }
    );

    console.log(`Result: ${JSON.stringify(result)}`);
}

// Initialize the Firebase connection and send a message
(async function () {
    await admin.initializeApp({
        credential: admin.credential.cert(serviceAccountJson),
    });

    await sendNotification();
    // await sendData();
})();
