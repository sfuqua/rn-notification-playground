package net.sariph.notificationplayground;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.core.app.NotificationChannelCompat;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;

import com.google.firebase.messaging.RemoteMessage;

import io.invertase.firebase.messaging.ReactNativeFirebaseMessagingService;

/**
 * Custom extension of {@link ReactNativeFirebaseMessagingService} that overrides
 * the default handleIntent functionality in order to suppress system tray notifications
 * for specific types of received messages.
 */
@SuppressLint("MissingFirebaseInstanceTokenRefresh")
public class SariphFirebaseMessagingService extends ReactNativeFirebaseMessagingService {
    private final String TAG = "FirebaseNotifications";
    private final String DEFAULT_CHANNEL_ID = "default-app-channel";

    public SariphFirebaseMessagingService() {
        super();
    }

    /**
     * The base class's onMessageReceived implementation is a no-op; this will handle displaying
     * the notification.
     */
    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
        Log.d(TAG, String.format("RemoteMessage %s received with data: %s", remoteMessage.toString(), remoteMessage.getData()));

        this.ensureChannels();
        NotificationCompat.Builder notifBuilder = new NotificationCompat.Builder(getApplicationContext(),  DEFAULT_CHANNEL_ID)
                .setSmallIcon(R.mipmap.ic_launcher);

        NotificationManagerCompat notifManager = NotificationManagerCompat.from(getApplicationContext());
        RemoteMessage.Notification notificationData = remoteMessage.getNotification();
        if (notificationData != null) {
            Log.d(TAG, String.format("Title: %s, body: %s", notificationData.getTitle(), notificationData.getBody()));
            notifBuilder.setContentTitle(String.format("! %s", notificationData.getTitle()));
            notifBuilder.setContentText(String.format("- %s", notificationData.getBody()));
        } else {
            notifBuilder.setContentTitle("! DATA");
            notifBuilder.setContentText("- DATA");
        }

        // Show the actual toast
        notifManager.notify(0, notifBuilder.build());
    }

    @Override
    public void handleIntent(@NonNull Intent intent) {
        Log.d(TAG, String.format("Intent received: %s", intent.getAction()));

        Bundle extras = intent.getExtras();
        Log.d(TAG, String.format("Intent extras: %s", extras.toString()));

        try {
            RemoteMessage parsedMessage = new RemoteMessage(extras);
            Log.d(TAG, String.format("Parsed RemoteMessage %s data: %s", parsedMessage.toString(), parsedMessage.getData()));
            RemoteMessage.Notification notificationData = parsedMessage.getNotification();
            if (notificationData != null) {
                Log.d(TAG, String.format("RemoteMessage has a notification with click_action: %s", notificationData.getClickAction()));
                String clickAction = notificationData.getClickAction();
                if (clickAction != null) {
                    switch (clickAction) {
                        case "TEST":
                            Log.i(TAG, "Short-cutting to onMessageReceived");
                            this.onMessageReceived(parsedMessage);
                            return;
                        default:
                            Log.i(TAG, "Falling through to base Intent handling");
                    }
                }
            }
        } catch (Exception ex) {
            Log.w(TAG, String.format("Failed to parse RemoteMessage: %s", ex.getMessage()));
        }

        super.handleIntent(intent);
    }

    /**
     * Helper to ensure we've registered our notification channel with the OS.
     */
    private void ensureChannels() {
        NotificationManagerCompat.from(getApplicationContext()).createNotificationChannel(
                new NotificationChannelCompat.Builder(DEFAULT_CHANNEL_ID, NotificationManagerCompat.IMPORTANCE_HIGH)
                        .setName("Default notifications")
                        .build()
        );
    }
}
