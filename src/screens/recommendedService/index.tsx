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
  getReferredServices,
  removeReferredService,
} from '../../utils/asyncStore';
import { ReferredService } from '../../types/referredService';
import ListItem from '../../components/listItem';
import colors from '../../themes/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import EmptyState from '../../components/emptyState';

const RecommendedServiceScreen = () => {
  const insets = useSafeAreaInsets();
  const [referredServices, setReferredServices] = useState<ReferredService[]>(
    [],
  );
  const [loading, setLoading] = useState(true);

  const fetchReferredServices = useCallback(async () => {
    try {
      const data = await getReferredServices();
      setReferredServices(data);
    } catch (error) {
      console.log('Error fetching referred services:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleRemove = async (referralId: string) => {
    await removeReferredService(referralId);
    fetchReferredServices();
  };

  useFocusEffect(
    useCallback(() => {
      fetchReferredServices();
    }, [fetchReferredServices]),
  );

  const renderItem = ({ item }: { item: ReferredService }) => {
    return (
      <View>
        <ListItem item={item} onRemove={() => handleRemove(item.referralId)} />
        <View style={styles.referredInfoContainer}>
          <Text style={styles.referredInfoText}>
            Referred to:{' '}
            <Text style={styles.referredName}>{item.referredName}</Text> (
            {item.referredEmail})
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
      <Text style={styles.headText}>Referred Services</Text>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <FlatList
          data={referredServices}
          renderItem={renderItem}
          keyExtractor={item => item.referralId}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <EmptyState
              title="No Referred Services"
              description="You haven't referred any services to anyone yet. Share the love and refer your first service!"
            />
          }
        />
      )}
    </View>
  );
};

export default RecommendedServiceScreen;
