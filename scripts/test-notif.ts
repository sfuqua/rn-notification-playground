// npx ts-node scripts/test-notif.ts

import admin from "firebase-admin";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const serviceAccountJson = require("./firebase-adminsdk.json");

const [, , token] = process.argv;
if (!token) {
    throw new Error("No Firebase token specified as arg");
}

async function sendNotification(title = "Test title", body = "Test body") {
    const result = await admin.messaging().sendToDevice([token], {
        notification: {
            title,
            body,
        },
    });

    console.log(`Result: ${JSON.stringify(result)}`);
}

async function sendData() {
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

(async function () {
    await admin.initializeApp({
        credential: admin.credential.cert(serviceAccountJson),
    });

    await sendNotification();
    await sendData();
})();
