# Solution of "Android build failed: Can't determine type for tag '<macro name="m3_comp_assist_chip_container_shape">?attr/shapeAppearanceCornerSmall</macro>'"

go to node_modules/react-native-screens/android/build.gradle file and

dependencies {
...
implementation 'com.google.android.material:material:1.9.0' => 1.6.0 (change version)
...
}

https://github.com/stripe/stripe-react-native/issues/1471

# Google Ads Integration Minimum Requirement 
1. Java-11 or JDK-11 Installed in system 
2. Minimum Compile SDK should be 33 (Android-13)


# Get Address Name from Latitude and Longitudes
fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + myLat + ',' + myLon + '&key=' + myApiKey)
        .then((response) => response.json())
        .then((responseJson) => {
            console.log('ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson));
})

# Update JDK 
First Step you should install https://www.oracle.com/java/technologies/javase/jdk11-archive-downloads.html

make sure you install it on the same folder as where the OpenJDK's installed before, mine installed on C:\Program Files\OpenJDK, you can check it on the next step.

Then go search Edit the system environment variables Edit the system environment variables

Click On Environment Variables 2

then change the JAVA_HOME Value location to your JDK 11's Folder you installed before 3

Save it and restart you PC