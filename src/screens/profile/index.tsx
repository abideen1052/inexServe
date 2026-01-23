import { Text, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import { styles } from './styles';
import CustomButton from '../../components/customButton';
import {
  saveIsLoggedIn,
  clearLoggedInUser,
  getLoggedInUser,
} from '../../utils/asyncStore';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

const ProfileScreen = ({ navigation }: { navigation: any }) => {
  const insets = useSafeAreaInsets();
  const [userData, setUserData] = useState<any>(null);
  const handleLogout = async () => {
    await clearLoggedInUser();
    await saveIsLoggedIn(false);
    navigation.replace('Login');
  };

  const fetchUserData = useCallback(async () => {
    try {
      const data = await getLoggedInUser();
      setUserData(data);
    } catch (error) {
      console.log('Error fetching user data:', error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchUserData();
    }, [fetchUserData]),
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.headText}>Profile</Text>

      <Text style={styles.nameText}>Name : {userData?.name}</Text>
      <Text style={styles.emailText}>Email : {userData?.email}</Text>
      <CustomButton
        title="Logout"
        onPress={handleLogout}
        style={styles.button}
      />
    </View>
  );
};

export default ProfileScreen;
