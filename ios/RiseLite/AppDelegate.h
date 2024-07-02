#import <RCTAppDelegate.h>
#import <UIKit/UIKit.h>
#import <Expo/Expo.h>
#import <FirebaseMessaging/FIRMessaging.h>

@interface AppDelegate : EXAppDelegateWrapper<FIRMessagingDelegate>

@end
