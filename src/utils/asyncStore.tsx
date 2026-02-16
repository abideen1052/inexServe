import AsyncStorage from '@react-native-async-storage/async-storage';

const IS_LOGGED_KEY = 'IS_LOGGED';

export const saveIsLoggedIn = async (isLogged: boolean): Promise<void> => {
  try {
    await AsyncStorage.setItem(IS_LOGGED_KEY, JSON.stringify(isLogged));
  } catch (error) {
    console.log('saveIsLoggedInError', error);
  }
};

export const getIsLoggedIn = async (): Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem(IS_LOGGED_KEY);
    return value ? JSON.parse(value) : false;
  } catch (error) {
    console.log('getIsLoggedInError', error);
    return false;
  }
};
