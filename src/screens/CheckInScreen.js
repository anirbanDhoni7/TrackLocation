import React, { useContext } from 'react';
import {
    ActivityIndicator,
  Alert,
  AppState,
  Dimensions,
  Linking,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import Ionicons from "react-native-vector-icons/Ionicons";
import { UserContext } from '../../App';
import { getMyStringValue, setStringValue } from '../components/AsyncStorage';
import { CommonActions } from '@react-navigation/native';
import GetLocation from "react-native-get-location";
import BackgroundTimer from "react-native-background-timer";

class CheckInScreen extends React.Component {
    state = {
        checkInLocation: {},
        checkInTime: "",
        isCheckingIn: false,
        whatsAppNumber: '',
        countryCode: ''
    }
    componentDidMount = async () => {
        AppState.addEventListener('change', this.handleAppStateChange);
    }
    handleAppStateChange = (appState) => {
        console.log('appState', appState);
        if(appState == 'background' || appState == 'inactive') {

            // AppState has three states in React Native - active, background, inactive
            // active - The app is running in the foreground
            // background - The app is running in the background. 
            // inactive - This is a state that occurs when transitioning between foreground & background, and during periods of inactivity such as entering the Multitasking view or in the event of an incoming call
            this.backgroundTimeOut = BackgroundTimer.runBackgroundTimer(async () => {
                this.timeout && clearTimeout(this.timeout);
                this.checkIn()
            }, 60000);
        } 
    }
    componentWillUnmount() {
        this.timeout && clearTimeout(this.timeout);
        BackgroundTimer.clearInterval(this.timeoutId);
        AppState.removeEventListener('change', this.handleAppStateChange);
    }
    checkIn = () => {
        GetLocation.getCurrentPosition({enableHighAccuracy: false, timeout: 30000})
        .then(location => {
            this.setState({
                isCheckingIn: false,
                checkInLocation: {
                    latitude: location.latitude,
                    longitude: location.longitude,
                    dateTime: new Date().toDateString() + " " + new Date().toTimeString()
                }
            }, () => {

                Linking.openURL(
                    'https://wa.me/' +
                    this.state.countryCode + '' +
                    this.state.whatsAppNumber + '?text=' +
                    'Latitude' + this.state.checkInLocation.latitude +
                    'Longitude' + this.state.checkInLocation.longitude +
                    'DateAndTime' + this.state.checkInLocation.dateTime
                );
            })
        })
        .catch(err => {
            console.log('liveLocationUpdate err => ', err);
            this.setState({                    
                isCheckingIn: false,
            })
        });

        console.log('check in location ', this.state.checkInLocation);
        this.timeout && clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.checkIn();
        }, 60000); 
    };
    render = () => (
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
            <ScrollView
                contentContainerStyle={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    padding: 10
                }}
                showsVerticalScrollIndicator={true}
                keyboardShouldPersistTaps="handled"
                scrollEnabled={true}
            >
                {
                    Object.keys(this.state.checkInLocation).length == 0 &&                    
                    <>
                        <TextInput
                            value={this.state.countryCode}
                            onChangeText={text => this.setState({countryCode: text})}
                            placeholder="Enter your country calling code, to get Location Updates"
                            placeholderTextColor={"#000"}
                            multiline
                            style={{
                                borderWidth: 1,
                                width: Dimensions.get('screen').width * 0.9,
                                borderRadius: 10,
                                paddingHorizontal: 15,
                                color: '#000',
                                fontSize: 18,
                            }}
                        />
                        <TextInput
                            value={this.state.whatsAppNumber}
                            onChangeText={text => this.setState({whatsAppNumber: text})}
                            placeholder="Enter your WhatsApp number, to get Location Updates"
                            placeholderTextColor={"#000"}
                            multiline
                            style={{
                                borderWidth: 1,
                                width: Dimensions.get('screen').width * 0.9,
                                borderRadius: 10,
                                paddingHorizontal: 15,
                                color: '#000',
                                fontSize: 18,
                                marginTop: 10
                            }}
                        />
                    </>
                }
                {
                    Object.keys(this.state.checkInLocation).length == 0 ?
                    <CustomButton
                        style={{
                            padding: 10,
                            marginTop: 20
                        }}
                        width={Dimensions.get('screen').width * 0.9}
                        borderRadius={10}
                        text={"Check In"} 
                        color={'blue'} 
                        isLoading={this.state.isCheckingIn}
                        onPress={() => this.setState({isCheckingIn: true}, this.checkIn)}
                    /> :
                    Object.keys(this.state.checkInLocation).length > 0 &&
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Text style={{
                            color:'#000',
                            textAlign: 'center',
                            fontSize: 17,
                            marginBottom: 20
                        }}><Text style={{fontWeight: 'bold'}}>Latitude :</Text> {this.state.checkInLocation.latitude}</Text>
                        <Text style={{
                            color:'#000',
                            textAlign: 'center',
                            fontSize: 17,
                            marginBottom: 20
                        }}><Text style={{fontWeight: 'bold'}}>Longitude :</Text> {this.state.checkInLocation.longitude}</Text>
                        <Text style={{
                            color:'#000',
                            textAlign: 'center',
                            fontSize: 17,
                        }}><Text style={{fontWeight: 'bold'}}>Check In Date & Time :</Text> {this.state.checkInLocation.dateTime}</Text>
                    </View>
                }
                
                {
                    (JSON.parse(this.props.users.users).findIndex(item => item.isLoggedIn == true) != -1) &&
                    <CustomButton
                        style={{
                            paddingHorizontal: 20,
                            marginTop: 15
                        }}
                        width={Dimensions.get('screen').width * 0.9}
                        borderRadius={10}
                        text={"Logout"} 
                        color={'blue'} 
                        onPress={async () => {
                        let availableUsers = [];
                        availableUsers = JSON.parse(this.props.users.users);
                        if(availableUsers && availableUsers.length > 0) {
                            availableUsers.map((item, index) => {
                                item.isLoggedIn = false;
                            })
                        } 
                        await setStringValue('employeeCredentials', JSON.stringify(availableUsers));
                        availableUsers = await getMyStringValue("employeeCredentials");
                        this.props.users.setUsers(availableUsers);
                        this.props.navigation.dispatch(
                                CommonActions.reset({
                                index: 1,
                                routes: [
                                    { name: 'LocationPermissionScreen' }
                                ],
                                })
                            );
                        }}
                    />
                }
            </ScrollView>
        </SafeAreaView>
    )
}

export default props => {
    const users = useContext(UserContext);
    return <CheckInScreen {...props} users={users} />
}