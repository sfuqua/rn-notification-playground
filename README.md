# React Native Notification Playground

The intent of this repo is to provide a minimal environment that lets me tinker with how push notifications behave, specifically in a React Native environment.

I am investigating workarounds for Firebase behavior on Android; see these issues:

-   https://github.com/firebase/quickstart-android/issues/4
-   https://github.com/firebase/firebase-android-sdk/issues/46
-   https://github.com/firebase/firebase-android-sdk/issues/2639

Specifically, I'd like to understand if the problem in question ("display"/"notification" messages triggering a toast while the app is backgrounded) is actually Android OS behavior of an implementation detail of the Firebase SDK, and if it's the latter, if I can prototype a viable workaround.

# Steps to Create This Repo

To get to this "minimal" state for tinkering, I've done the following (on Feb 25 2022):

1. npx react-native init NotificationPlayground --template react-native-template-typescript
2. Swap from Yarn to NPM
3. Install @react-native-firebase/app and @react-native-firebase/messaging @latest (14.5.0)
4. Minor Android project fixup (changed app ID/file names)
5. Create a Firebase project using Google console and apply necessary changes to build.gradle
   **NOTE**: My google-services.json is _not_ committed to this repo, you will need to create your own
6. Configure linting/formatting to my preferences instead of using the template's defaults
7. Integrate `@react-native-firebase/messaging` onMessage and setBackgroundMessageHandler callbacks as described in [the docs](https://rnfirebase.io/messaging/usage), with `console.log` impls to just note any calls we receive from the framework.
8. Using `AndroidManifest.xml` merging (see android/app/src/main/AndroidManifest.xml), override the default react-native-firebase `FirebaseMessagingService` with our custom implementation `SariphFirebaseMessagingService` that tampers with `handleIntent`

For testing, I have been using `ts-node` with the Firebase admin SDK - see the `scripts/` folder.
