import {
  FlatList,
  View,
  ActivityIndicator,
  StatusBar,
  Text,
} from 'react-native';
import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { styles } from './styles';
import {
  getRequestedServices,
  removeRequestedService,
} from '../../utils/asyncStore';
import { RequestedService } from '../../types/requestedService';
import ListItem from '../../components/listItem';
import colors from '../../themes/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const RequestedServiceScreen = () => {
  const insets = useSafeAreaInsets();
  const [requestedServices, setRequestedServices] = useState<
    RequestedService[]
  >([]);
  const [loading, setLoading] = useState(true);

  const fetchRequestedServices = useCallback(async () => {
    try {
      const data = await getRequestedServices();
      setRequestedServices(data);
    } catch (error) {
      console.log('Error fetching requested services:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleRemove = async (serviceId: string) => {
    await removeRequestedService(serviceId);
    fetchRequestedServices();
  };

  useFocusEffect(
    useCallback(() => {
      fetchRequestedServices();
    }, [fetchRequestedServices]),
  );

  const renderItem = ({ item }: { item: RequestedService }) => {
    return <ListItem item={item} onRemove={() => handleRemove(item.id)} />;
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
      <Text style={styles.headText}>Requested Sevices</Text>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <FlatList
          data={requestedServices}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={null}
        />
      )}
    </View>
  );
};

export default RequestedServiceScreen;
