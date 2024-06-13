import Foundation
import UserNotifications
import CioMessagingPushFCM
import CioTracking

@objc
public class MyAppNotificationServicePushHandler : NSObject {

  public override init() {}

  @objc(didReceive:withContentHandler:)
  public func didReceive(_ request: UNNotificationRequest, withContentHandler contentHandler: @escaping (UNNotificationContent) -> Void) {

    // You may choose to configure the SDK here
    // Update region to .EU for your EU-based workspace
    guard let siteId = Bundle.main.object(forInfoDictionaryKey: "CUSTOMER_IO_SITE_ID") as? String,
          let apiKey = Bundle.main.object(forInfoDictionaryKey: "CUSTOMER_IO_API_KEY") as? String else {
            // Handle error when environment variables are not found
            return
    }
    CustomerIO.initialize(siteId: siteId, apiKey: apiKey, region: .US) { config in
        config.autoTrackDeviceAttributes = true
        config.logLevel = .info
    }
    MessagingPush.shared.didReceive(request, withContentHandler: contentHandler)
  }

  @objc(serviceExtensionTimeWillExpire)
  public func serviceExtensionTimeWillExpire() {
    MessagingPush.shared.serviceExtensionTimeWillExpire()
  }
}
