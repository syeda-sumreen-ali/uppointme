import React from 'react';
import { Platform } from 'react-native';
import PushNotification from "react-native-push-notification";
import * as RootNavigation from './src/navigation/RootNavigation';
import messaging from '@react-native-firebase/messaging';
import PushNotificationIOS from "@react-native-community/push-notification-ios"

export const pushNotificationConfig = async () => {
    let enabled = await messaging().hasPermission();
    console.log('push function called============', enabled)
    let apns = await messaging().getAPNSToken();
    console.log('apns token: ===========>', apns)

    // onMessage function fire when notification recieved when app in open

    messaging().onMessage(remoteMessage => {
        console.log('before set local notification ', remoteMessage)
        Platform.OS === 'android' && PushNotification.localNotification({
            title: remoteMessage.notification.title,
            message: remoteMessage.notification.body,
            bigPictureUrl: remoteMessage.notification.android.smallIcon,
            largeIconUrl: remoteMessage.notification.android.smallIcon,
            channelId: '654321'
        });
        Platform.OS === 'ios' && PushNotification.localNotification({
            title: remoteMessage.notification.title,
            message: remoteMessage.notification.body,
            // channelId: "123456",
            // bigPictureUrl: remoteMessage.notification.android.smallIcon,
            // largeIconUrl: remoteMessage.notification.android.smallIcon,
        });

    });
    messaging().setBackgroundMessageHandler(remoteMessage => {
        console.log('from background message recieved', remoteMessage)
    }); 
    try {
        // Must be outside of any component LifeCycle (such as `componentDidMount`).
        PushNotification.configure({
            // (optional) Called when Token is generated (iOS and Android)
            onRegister: function (token) {
                console.log("TOKEN:", token);
            },

            // (required) Called when a remote is received or opened, or local notification is opened
            onNotification: function (notification) {
                console.log('clickOnNotification==========> ', notification)

                // process the notification

                // navigate screens on click on notification
                // RootNavigation.navigate('BecomeContributorContainer')


                // (required) Called when a remote is received or opened, or local notification is opened
                notification.finish(PushNotificationIOS.FetchResult.NoData);
            },

            // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
            onAction: function (notification) {
                console.log("ACTION:", notification.action);
                // console.log("NOTIFICATION:", notification);

                // process the action
            },

            // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
            onRegistrationError: function (err) {
                console.error(err.message, err);
            },

            // IOS ONLY (optional): default: all - Permissions to register.
            permissions: {
                alert: true,
                badge: true,
                sound: true,
            },

            // Should the initial notification be popped automatically
            // default: true
            popInitialNotification: true,

            /**
             * (optional) default: true
             * - Specified if permissions (ios) and token (android and ios) will requested or not,
             * - if not, you must call PushNotificationsHandler.requestPermissions() later
             * - if you are not using remote notification or do not have Firebase installed, use this:
             *     requestPermissions: Platform.OS === 'ios'
             */
            requestPermissions: true,
        });
        Platform.OS === 'android' && PushNotification.createChannel(
            {
                channelId: "654321", // (required)
                channelName: "My channel", // (required)
            },
            (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
        );

    } catch (error) {
        console.log('erorr recieve from notification config cache')
    }
}
