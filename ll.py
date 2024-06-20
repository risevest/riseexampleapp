deps = {

    # "@react-native-firebase/analytics": "^18.1.0",
    # "@react-native-firebase/app": "^18.1.0",
    # "@react-native-firebase/crashlytics": "^18.1.0",

    "@smile_identity/react-native": "^10.0.1",
  
  }


s = 'yarn add'
for l in deps.items():
    s = s + ' ' + l[0] + '@' + l[1]

print(s)

