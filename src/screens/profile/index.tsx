import { View } from 'react-native';
import React from 'react';
import { styles } from './styles';
import CustomButton from '../../components/customButton';
import { saveIsLoggedIn, clearLoggedInUser } from '../../utils/asyncStore';

const ProfileScreen = ({ navigation }: { navigation: any }) => {
  const handleLogout = async () => {
    await clearLoggedInUser();
    await saveIsLoggedIn(false);
    navigation.replace('Login');
  };
  return (
    <View style={styles.container}>
      <CustomButton
        title="Logout"
        onPress={handleLogout}
        style={styles.button}
      />
    </View>
  );
};

export default ProfileScreen;
