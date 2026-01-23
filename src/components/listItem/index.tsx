import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  price: number;
  duration: string;
  isAvailable: boolean;
  rating: number;
}

interface Props {
  item: ServiceItem;
}

const ListItem = ({ item }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>★ {item.rating}</Text>
        </View>
      </View>

      <Text style={styles.description}>{item.description}</Text>

      <View style={styles.footerRow}>
        <View style={styles.priceContainer}>
          <Text style={styles.currency}>$</Text>
          <Text style={styles.price}>{item.price}</Text>
          <Text style={styles.duration}> / {item.duration}</Text>
        </View>
        <Text
          style={
            item.isAvailable ? styles.statusAvailable : styles.statusUnavailable
          }
        >
          {item.isAvailable ? 'Available' : 'Unavailable'}
        </Text>
      </View>
    </View>
  );
};

export default ListItem;
