# System Requirement
1. Android Studio 
2. Java-11 or JDK-11 
3. Node JS Version 12 and above (Version 12 or 14 will be preferred)
4. ADB Driver (For Debugging in real device)
5. React Native Setup 
For Environment Setup of React Native, please go through https://reactnative.dev/docs/environment-setup?guide=native this link 

# PROJECT SETUP 
1. Clone the project or Download ZIP from https://github.com/anirbanDhoni7/TrackLocation this repository 
2. Run "npm i"/"npm install" at terminal of project directory 
3. Navigate to node_modules/react-native-screens/android/build.gradle file and do the following -
dependencies {
...
implementation 'com.google.android.material:material:1.9.0' => 1.6.0 (change version)
...
}
Reference → https://github.com/stripe/stripe-react-native/issues/1471
4. Update JDK-11 path of the concerned system as the value of "org.gradle.java.home" (in Line No. 31) in android\gradle.properties this file (Please note, suppose your folder path is "E:\Java11", then please write "E:\\\Java11" here)
5. Run "npx react-native run-android" at terminal of root directory to run the project 

# APK GENERATION COMMAND 
cd android && ./gradlew assembleRelease (in project terminal)

# BUNDLE GENERATION COMMAND 
cd android && ./gradlew bundleRelease (in project terminal)

# APK STORAGE FOLDER LINK IN GITHUB 
https://github.com/anirbanDhoni7/TrackLocation/tree/master/android/app/build/outputs/apk/release
Download the APK, suitable according to your device architechture, from the above link 

# ASSIGNMENT DETAILS 
1. Email/Password Login Authentication set up using few demo credentials, set at only app end - Credentials are given below and those are hard coded in Line No. 33 of App.js file - because of absence of any specific Login API, I could not able to set up login-signup conventional flow 
2. Latitude, Longitude & Check in date time will be shown at the app end but because of the lack of Google Maps Paid API Key, Google Address and map plotting could not be done 

To get Google Address of a specific latitude-longitude pair, following Google API need to be called :- 

fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + myLat + ',' + myLon + '&key=' + myApiKey)
        .then((response) => response.json())
        .then((responseJson) => {
            console.log('Google Address Details => ' + JSON.stringify(responseJson));
})

3. To show tracking routes in Google Maps, @react-native-maps/polyline-direction this package can be used with a Paid Google Maps API Key. 

4. Background or Lock Screen Location Tracking is done by react-native-background-timer package 

5. Current location is found by react-native-get-location package 

6. Hard Coded Login Authentication is obtained by the combination of @react-native-async-storage/async-storage package and React Context API

7. As I have no API to update tracked location details in a server, I have implemented the process of background tracking acknowledgement section in terms of WhatsApp message sending - just user need to provide his/her WhatsApp Contact Details to get background tracking location - Code is written in Line No. 64 of src\screens\CheckInScreen.js path

# User Credentials for Login 
1. Username - test1@mailinator.com, Password - 123456
2. Username - test2@mailinator.com, Password - 123456
3. Username - test3@mailinator.com, Password - 123456
4. Username - test4@mailinator.com, Password - 123456
5. Username - test5@mailinator.com, Password - 123456