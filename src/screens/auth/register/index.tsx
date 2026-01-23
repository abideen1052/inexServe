import { Keyboard, Pressable, StatusBar, Text } from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '../../../themes/colors';
import FastImage from 'react-native-fast-image';
import CustomButton from '../../../components/customButton';
import InputField from '../../../components/inputField';
import { images } from '../../../themes/images';
import {
  saveIsLoggedIn,
  saveLoggedInUser,
  saveRegisteredUser,
} from '../../../utils/asyncStore';
import {
  EmailValid,
  NameValid,
  PasswordValid,
} from '../../../utils/validations';
import Toast from '../../../components/toast';

const RegisterScreen = ({ navigation }: { navigation: any }) => {
  const insets = useSafeAreaInsets();

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({
    visible: false,
    message: '',
    type: '',
  });

  const handleRegister = async () => {
    const nameValidation = NameValid(name);
    const emailValidation = EmailValid(email);
    const passwordValidation = PasswordValid(password);

    if (nameValidation || emailValidation || passwordValidation) {
      setNameError(nameValidation || '');
      setEmailError(emailValidation || '');
      setPasswordError(passwordValidation || '');
      return;
    }
    setNameError('');
    setEmailError('');
    setPasswordError('');
    setIsLoading(true);

    const id = Date.now().toString();
    await saveRegisteredUser({
      id,
      name,
      email,
      password,
    });

    await saveLoggedInUser({ id, name, email });
    await saveIsLoggedIn(true);
    setToast({
      visible: true,
      message: 'Register successful',
      type: 'success',
    });
    setTimeout(() => {
      navigation.navigate('BottomNavigation');
      setIsLoading(false);
    }, 2000);
  };
  return (
    <Pressable
      style={[styles.container, { paddingTop: insets.top }]}
      onPress={() => Keyboard.dismiss()}
    >
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
      <FastImage source={images.logo} style={styles.logo} />
      <InputField
        label="Name"
        placeholder="Enter your name"
        value={name}
        onChangeText={text => {
          setName(text);
          if (nameError) setNameError('');
        }}
        keyboardType="default"
        error={nameError}
        maxLength={50}
      />
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
        title="Register"
        onPress={handleRegister}
        loading={isLoading}
        style={styles.button}
      />
      <Text style={styles.registerText}>
        Already have an account?
        <Text
          onPress={() => navigation.navigate('Login')}
          style={styles.registerLink}
        >
          {' '}
          Login
        </Text>
      </Text>
      <Toast
        toast={toast}
        onClose={() => setToast({ ...toast, visible: false })}
      />
    </Pressable>
  );
};

export default RegisterScreen;
