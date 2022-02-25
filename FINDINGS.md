# Research Notes

## Android

### When the app is _foregrounded_...

...and a "display message" is sent: **no** toast is shown, but the `onMessage` callback is triggered

...and a "data only" message is sent:

### When the app is running but _backgrounded_...

...and a "display message" is sent: a toast **is** shown, and the `backgroundMessageHandler` callback is triggered

...and a "data only" message is sent:

### When the app is _not running_...

...and a "display message" is sent: a toast **is** shown, and the `backgroundMessageHandler` callback is triggered

...and a "data only" message is sent:
