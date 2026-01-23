import { FlatList, StatusBar, View } from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles';
import { servicesData } from '../../utils/data';
import ListItem, { ServiceItem } from '../../components/listItem';
import SearchField from '../../components/searchField';
import colors from '../../themes/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ServiceListScreen = () => {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = servicesData.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const renderItem = ({ item }: { item: ServiceItem }) => {
    return <ListItem item={item} />;
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
      <SearchField
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search services..."
      />
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        style={styles.list}
      />
    </View>
  );
};

export default ServiceListScreen;
