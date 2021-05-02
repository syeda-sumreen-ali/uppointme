import messaging from '@react-native-firebase/messaging';

export class NotificationService {
  static async getToken() {
    const fcmToken = await messaging().getToken();
  }
}
