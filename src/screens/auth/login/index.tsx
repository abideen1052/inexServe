import { Keyboard, Pressable, StatusBar, Text } from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '../../../themes/colors';
import InputField from '../../../components/inputField';
import CustomButton from '../../../components/customButton';
import FastImage from 'react-native-fast-image';
import { images } from '../../../themes/images';

import { saveIsLoggedIn, saveLoggedInUser } from '../../../utils/asyncStore';
import {
  EmailValid,
  PasswordValid,
  validateUserLogin,
} from '../../../utils/validations';

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    const emailValidation = EmailValid(email);
    const passwordValidation = PasswordValid(password);

    if (emailValidation || passwordValidation) {
      setEmailError(emailValidation || '');
      setPasswordError(passwordValidation || '');
      return;
    }
    setEmailError('');
    setPasswordError('');
    setIsLoading(true);

    const user = await validateUserLogin(email, password);

    if (!user) {
      setEmailError('Invalid email or password');
      setPasswordError('Invalid email or password');
      setIsLoading(false);
      return;
    }

    await saveLoggedInUser(user);
    await saveIsLoggedIn(true);
    navigation.navigate('BottomNavigation');

    setIsLoading(false);
  };
  return (
    <Pressable
      style={[styles.container, { paddingTop: insets.top }]}
      onPress={() => Keyboard.dismiss()}
    >
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
      <FastImage source={images.logo} style={styles.logo} />
      <InputField
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChangeText={text => {
          setEmail(text);
          if (emailError) setEmailError('');
        }}
        keyboardType="email-address"
        error={emailError}
        maxLength={50}
      />
      <InputField
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChangeText={text => {
          setPassword(text);
          if (passwordError) setPasswordError('');
        }}
        secureTextEntry
        error={passwordError}
        maxLength={20}
      />
      <CustomButton
        title="Login"
        onPress={handleLogin}
        loading={isLoading}
        style={styles.button}
      />
      <Text style={styles.registerText}>
        Don't have an account?
        <Text
          onPress={() => navigation.navigate('Register')}
          style={styles.registerLink}
        >
          {' '}
          Register
        </Text>
      </Text>
    </Pressable>
  );
};

export default LoginScreen;
