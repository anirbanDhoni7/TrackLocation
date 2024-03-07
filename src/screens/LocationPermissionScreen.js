import React, { useContext } from 'react';
import {
  Alert,
  Linking,
  PermissionsAndroid,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AndroidOpenSettings from 'react-native-android-open-settings';
import { UserContext } from '../../App';
import CustomButton from '../components/CustomButton';

class LocationPermissionScreen extends React.Component {
  state = {
      isLocationAllowed: false
  }
  componentDidMount() {
    PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then(success => {
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then(success1 => {
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION).then(success2 => {
          console.log(
            "ACCESS_COARSE_LOCATION permission success => ", success,
            "\nACCESS_FINE_LOCATION permission success => ", success1,
            "\nACCESS_BACKGROUND_LOCATION permission success => ", success2
          );
          if(success && success1 && success2) {
            this.setState({isLocationAllowed: true})
          } 
        }).catch(err => {
          console.log("ACCESS_BACKGROUND_LOCATION permission error => ", err);
        })
      }).catch(err1 => {
        console.log("ACCESS_FINE_LOCATION permission error => ", err1);
      })
    }).catch(err2 => {
      console.log("ACCESS_COARSE_LOCATION permission error => ", err2);
    })
  }
  locationAllowFromSettings = async () => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then(success => {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then(success1 => {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION).then(success2 => {
          console.log(
            "ACCESS_COARSE_LOCATION permission success => ", success,
            "\nACCESS_FINE_LOCATION permission success => ", success1,
            "\nACCESS_BACKGROUND_LOCATION permission success => ", success2
          );
          if(success == "granted" && success1 == "granted" && success2 == "granted") {
            this.setState({isLocationAllowed: true})
          } else {
            
            Alert.alert(
              "Permission Needed",
              "Location Always Allow Permission should be checked for tracking purpose",
              [{
                text: "Ok",
                onPress: () => AndroidOpenSettings.appDetailsSettings()
              }]
            )
          }
        }).catch(err => {
          console.log("ACCESS_BACKGROUND_LOCATION permission error => ", err);
        })
      }).catch(err1 => {
        console.log("ACCESS_FINE_LOCATION permission error => ", err1);
      })
    }).catch(err2 => {
      console.log("ACCESS_COARSE_LOCATION permission error => ", err2);
    })
  }
  render = () => (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10
        }}
        showsVerticalScrollIndicator={true}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={true}
      >
        <Text style={{
          color:'#000',
          textAlign: 'center',
          fontSize: 17,
          marginBottom: 20
        }}>
          {
            (JSON.parse(this.props.users.users).findIndex(item => item.isLoggedIn == true) != -1) ? 
            "Welcome " + JSON.parse(this.props.users.users).find(item => item.isLoggedIn == true).name :
            !this.state.isLocationAllowed ? "Background location tracking is required for managing the tracking as per the requirement of the application even when the app goes in background or in the lock state." : ""
          }
        </Text>
                
        <CustomButton
          style={{
            paddingHorizontal: 20
          }}
          borderRadius={10}
          text={this.state.isLocationAllowed ? `Continue to ${(JSON.parse(this.props.users.users).findIndex(item => item.isLoggedIn == true) != -1) ? "Check In" : "Login"}` : "Allow Location Access"} 
          color={'blue'} 
          onPress={() => {
            if (this.state.isLocationAllowed) {
              this.props.navigation.navigate((JSON.parse(this.props.users.users).findIndex(item => item.isLoggedIn == true) != -1) ? "CheckInScreen" : "LoginScreen");
            } else {
              this.locationAllowFromSettings();
            }
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

export default props => {
  const users = useContext(UserContext);
  return <LocationPermissionScreen {...props} users={users} />;
}
