import Foundation
import CioMessagingPushFCM
import UserNotifications
import FirebaseMessaging
import CioTracking

@objc
public class MyAppPushNotificationsHandler : NSObject {

  public override init() {}

  @objc(setupCustomerIOClickHandling)
  public func setupCustomerIOClickHandling() {
    // This line of code is required in order for the Customer.io SDK to handle push notification click events.
    // We are working on removing this requirement in a future release.
    // Remember to modify the siteId and apiKey with your own values.
    // let siteId = "YOUR SITE ID HERE"
    // let apiKey = "YOUR API KEY HERE"
    guard let siteId = Bundle.main.object(forInfoDictionaryKey: "CUSTOMER_IO_SITE_ID") as? String,
          let apiKey = Bundle.main.object(forInfoDictionaryKey: "CUSTOMER_IO_API_KEY") as? String else {
            // Handle error when environment variables are not found
            return
    }
    CustomerIO.initialize(siteId: siteId, apiKey: apiKey, region: Region.US) { config in
      config.autoTrackDeviceAttributes = true
    }
    
    

    // Initialize Customer.io push features after you initialize the SDK:
    MessagingPushFCM.initialize { config in
        // Automatically register push device tokens to the Customer.io SDK
        config.autoFetchDeviceToken = true
        // When your app is in the foreground and a push is delivered, show the push
        config.showPushAppInForeground = true
    }
  }

  // Register device on receiving a device token (FCM)
  @objc(didReceiveRegistrationToken:fcmToken:)
  public func didReceiveRegistrationToken(_ messaging: Messaging, didReceiveRegistrationToken fcmToken: String?) {
    MessagingPush.shared.messaging(messaging, didReceiveRegistrationToken: fcmToken)
  }
}
