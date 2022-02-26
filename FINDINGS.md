# Research Notes

## Android

`FirebaseMessagingService.handleIntent` is called for _all_ notification types and application states.

Ultimately, the Firebase SDK (via this `handleIntent`) is responsible for calling `onMessageReceived` vs. displaying
a notification in the system tray.

See this `isNotification` check in `FirebaseMessagingService`: https://github.com/firebase/firebase-android-sdk/blob/21a9f912862bfbd801690a9f88dce22366bec8ac/firebase-messaging/src/main/java/com/google/firebase/messaging/FirebaseMessagingService.java#L215

Specifically, the "is app in foreground" check that allows passing through to `onMessageReceived` happens here, in `DisplayNotification`:
https://github.com/firebase/firebase-android-sdk/blob/3f29bba7450b7201f1135ad6d639ebfde46513d2/firebase-messaging/src/main/java/com/google/firebase/messaging/DisplayNotification.java#L104

I have confirmed via testing (on an Android 7 emulator and a physical Android 12 device) that overriding `handleIntent` allows for bypassing the normal "display automatically when app is in background" logic, allowing `onMessageReceived` to be called manually by the application and trigger whatever display logic the app wants.

### Recommendation for the SDK changes/PR

See this issue/thread for further discussion: https://github.com/firebase/firebase-android-sdk/issues/2639

`FirebaseMessagingService` should be augmented with a new overrideable, supported, documented public method to allow an app to bypass the default notification logic for display messages.

e.g.,

```java
// In FirebaseMessagingService.dispatchMessage
RemoteMessage candidate = new RemoteMessage(data);

// Proposed new "shouldOptOutNotification" method; default impl could return false
boolean shouldOptOut = shouldOptOutNotification(candidate);

// Modify existing isNotification check to include the new opt-out:
if (!shouldOptOut && NotificationParams.isNotification(data)) {
    // ... Continue as exists today ...
```
