#import "AppDelegate.h"
#import <Firebase.h>
#import <FirebaseCore.h>

#import <React/RCTBundleURLProvider.h>

#import <ExpoModulesCore-Swift.h>
#import <riseexampleapp-Swift.h>


@implementation AppDelegate

MyAppPushNotificationsHandler* pnHandlerObj = [[MyAppPushNotificationsHandler alloc] init];


- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"Rise Lite";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};
  [FIRApp configure];
  
  [pnHandlerObj setupCustomerIOClickHandling];

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self getBundleURL];
}

- (NSURL *)getBundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@".expo/.virtual-metro-entry"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}


- (void)messaging:(FIRMessaging *)messaging didReceiveRegistrationToken:(NSString *)fcmToken {
   [pnHandlerObj didReceiveRegistrationToken:messaging fcmToken: fcmToken];
}

@end
