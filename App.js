import { NavigationContainer } from '@react-navigation/native';
import React, { createContext, useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StatusBar,
  Image,
  StyleSheet,
  Text,
  View,
  ImageBackground,
} from 'react-native';
import LocationPermissionScreen from './src/screens/LocationPermissionScreen';
import SplashScreen from 'react-native-splash-screen';
import { getMyStringValue, setStringValue } from './src/components/AsyncStorage';
import LoginScreen from './src/screens/LoginScreen';
import CheckInScreen from './src/screens/CheckInScreen';

const Stack = createStackNavigator();
export const UserContext = createContext();

const App = (props) => {
  const [showSplash, setShowSplash] = useState(true);
  const [users, setUsers] = useState([]);
  useEffect(async () => {    
    SplashScreen.hide();
    let users = await getMyStringValue("employeeCredentials");
    if(users != null) {
      setUsers(users);
    } else {      
      await setStringValue(
        'employeeCredentials', 
        JSON.stringify([
          {
            name: "Test1",
            email: "test1@mailinator.com",
            password: "123456",
            isLoggedIn: false
          },
          {
            name: "Test2",
            email: "test2@mailinator.com",
            password: "123456",
            isLoggedIn: false
          },
          {
            name: "Test3",
            email: "test3@mailinator.com",
            password: "123456",
            isLoggedIn: false
          },
          {
            name: "Test4",
            email: "test4@mailinator.com",
            password: "123456",
            isLoggedIn: false
          },
          {
            name: "Test5",
            email: "test5@mailinator.com",
            password: "123456",
            isLoggedIn: false
          }
        ])
      );
      let myUsers = await getMyStringValue("employeeCredentials");
      setUsers(myUsers);
    }
    setTimeout(() => {
      setShowSplash(false);
    }, 3000);
  }, []);
  return (
    showSplash ?
      <>
        <StatusBar backgroundColor="#0095ba" />
        <ImageBackground
          source={require('./assets/india.png')}
          resizeMode='stretch'
          style={{
            flex: 1,
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
          }}
        >
          <Image
            source={require('./android/app/src/main/res/drawable/launch_screen.jpg')}
            style={{
              flex: 1,
              width: Dimensions.get('window').width,
              height: (16 / 9) * Dimensions.get('window').width,
              resizeMode: 'contain',
            }}
          />
        </ImageBackground>
      </>
      : 
      <UserContext.Provider value={{users, setUsers}}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={"LocationPermissionScreen"}>
            <Stack.Screen
              name="LocationPermissionScreen"
              component={LocationPermissionScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CheckInScreen"
              component={CheckInScreen}
              options={{ headerShown: false }}
            />

          </Stack.Navigator>
        </NavigationContainer>
      </UserContext.Provider>
  )
} 

export default App;
