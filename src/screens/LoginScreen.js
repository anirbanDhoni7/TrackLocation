import React, { useContext } from 'react';
import {
  Alert,
  Dimensions,
  SafeAreaView,
  ScrollView,
  TextInput,
  View,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import Ionicons from "react-native-vector-icons/Ionicons";
import { UserContext } from '../../App';
import { getMyStringValue, setStringValue } from '../components/AsyncStorage';
import { CommonActions } from '@react-navigation/native';

class LoginScreen extends React.Component {
  state = {
    email: "",
    password: "",
    showPassword: false
  }

  login = async() => {
    if(this.state.email.trim() == '') {
        Alert.alert("", "Please enter email address", [{text: "Ok"}]);
        return;
    }
    let isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email.trim());
    if(!isValidEmail) {
        Alert.alert("", "Please enter a valid email address", [{text: "Ok"}]);
        return;
    }
    if(this.state.password.trim() == '') {
        Alert.alert("", "Please enter password", [{text: "Ok"}]);
        return;
    }
    if(this.state.password.trim().length < 6) {
        Alert.alert("", "Password should consist of at least 6 characters", [{text: "Ok"}]);
        return;
    }
    let availableUsers = [];
    availableUsers = JSON.parse(this.props.users.users);
    if(availableUsers && availableUsers.length > 0) {
        availableUsers.map((item, index) => {
            if(item.email == this.state.email.trim() && item.password == this.state.password.trim()) {
                item.isLoggedIn = true;
            } 
        })
    } 
    if(availableUsers.findIndex(item => item.isLoggedIn == true) == -1) {
        Alert.alert("", "Invalid Credentials", [{text: "Ok"}]);
    } else {
        await setStringValue('employeeCredentials', JSON.stringify(availableUsers));
        availableUsers = await getMyStringValue("employeeCredentials");
        this.props.users.setUsers(availableUsers);
        Alert.alert(
            "", 
            "You have logged in successfully", 
            [
                {
                    text: "Ok", 
                    onPress: () => {
                        this.props.navigation.dispatch(
                            CommonActions.reset({
                              index: 1,
                              routes: [
                                { name: 'CheckInScreen' }
                              ],
                            })
                        );
                    }
                }
            ]
        );
    }
  }
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
        <TextInput
            value={this.state.email}
            onChangeText={text => this.setState({email: text})}
            placeholder="Email Address"
            placeholderTextColor={"#000"}
            style={{
                borderWidth: 1,
                width: Dimensions.get('screen').width * 0.9,
                borderRadius: 10,
                paddingHorizontal: 15,
                color: '#000',
                fontSize: 18,
            }}
        />
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderWidth: 1,     
                borderRadius: 10,
                paddingHorizontal: 10,
                marginTop: 10,   
                width: Dimensions.get('screen').width * 0.9,        
            }}
        >
            <TextInput
                value={this.state.password}
                onChangeText={text => this.setState({password: text})}
                placeholder="Password"
                placeholderTextColor={"#000"}
                secureTextEntry={!this.state.showPassword}
                style={{
                    color: '#000',
                    fontSize: 18,
                    flex: 1
                }}
            />
            <Ionicons
                name={`eye${this.state.showPassword ? "-off-" : "-"}outline`}
                size={20}
                color={"#000"}
                onPress={() => this.setState({showPassword: !this.state.showPassword})}
            />
        </View>
                
        <CustomButton
          style={{
            padding: 10,
            marginTop: 20
          }}
          width={Dimensions.get('screen').width * 0.9}
          borderRadius={10}
          text={"Login"} 
          color={'blue'} 
          onPress={this.login}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

export default props => {
    const users = useContext(UserContext);
    return <LoginScreen {...props} users={users} />
}
