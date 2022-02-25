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

## TODO

These are things I will intend to do to make this a useful project:

1. Call APIs from @react-native-firebase/messaging to actually hook into the Firebase listener
2. Add robust logging
3. See if I can override `ReactNativeFirebaseMessagingService` and hook into `handleIntent`; failing that, try the same for `ReactNativeFirebaseMessagingReceiver` and document my findings on behavior
4. Test `FirebaseMessagingService` and the `BroadcastReceiver` behavior with the full matrix of notification types ("notification" vs "data only") and app states (foreground, background, not running/suspended)
5. If necessary, fork the Android Firebase SDK and attempt a private build with changes as described in comments on [this issue](https://github.com/firebase/firebase-android-sdk/issues/2639) in order to validate Android OS vs. SDK behavior when the app receives a "display message" while the app is backgrounded
