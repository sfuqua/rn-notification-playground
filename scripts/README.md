# Firebase Test Scripts

Generate service account JSON for your Firebase project here: https://console.firebase.google.com/project/_/settings/serviceaccounts/adminsdk

Save the credential JSON for your account into this folder ("scripts") with the name "firebase-adminsdk.json" and _do not check it in_.

You can then use ts-node to send pushes to the app: `npx ts-node -- scripts/test-notif.ts <your notification token>`, where your token can be retrieved from logs when the app is launched.
