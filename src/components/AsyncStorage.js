import AsyncStorage from '@react-native-async-storage/async-storage';

export const getMyStringValue = async key => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    // read error
  }

  console.log('Done.');
};

export const setStringValue = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // save error
  }

  console.log('Done.');
};
