import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { Keyboard } from 'react-native';

const CustomButton = props => (
  <TouchableOpacity
    activeOpacity={0.7}
    style={[
      {
        backgroundColor: props.color,
        borderWidth: props.borderWidth ? props.borderWidth : 1,
        borderColor: props.borderColor ? props.borderColor : props.color,
        padding: 10,
        borderRadius: props.borderRadius,
        flexDirection: 'row',
        alignSelf: props.details ? 'flex-start' : 'center',
        justifyContent: props.dropdown ? 'space-between' : props.details ? 'flex-start' : 'center',
        alignItems: props.details ? 'flex-start' : 'center',
        width: props.width ? props.width : undefined,
        ...props.style,
      },
      Platform.OS == 'ios' &&
        props.selectBusiness
    ]}
    disabled={props.isLoading}
    onPress={props.onPress ? () => {
      Keyboard.dismiss();
      props.onPress();
    } : () => undefined}>
    {props.image ? props.image : null}
    {props.icon ? props.icon : null}
    {props.image && <View style={{width: 20}} />}
    <Text
      style={{
        fontFamily: 'AzoSans-Regular',
        color: props.fontColor ? props.fontColor : '#fff',
        fontSize: props.fontSize ? props.fontSize : 22,
        ...props.textStyle,
      }}>
      {props.text}
    </Text>
    {
      props.isLoading && 
      <View
        style={{
          position: 'absolute',
          right: 12,
          bottom: 12
        }}
      >
        <ActivityIndicator size={"small"} color="#fff" />
      </View>
    }
  </TouchableOpacity>
);

export default CustomButton;