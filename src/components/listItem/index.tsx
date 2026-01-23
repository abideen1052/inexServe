import React, { useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { styles } from './styles';
import { images } from '../../themes/images';
import colors from '../../themes/colors';

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  imageUrl: string;
  price: number;
  duration: string;
  isAvailable: boolean;
  rating: number;
}

interface Props {
  item: ServiceItem;
  onPress?: () => void;
  onRemove?: () => void;
}

const ListItem = ({ item, onPress, onRemove }: Props) => {
  const [imageLoading, setImageLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.image}>
        <FastImage
          style={styles.image}
          source={
            item?.imageUrl && !hasError
              ? {
                  uri: item.imageUrl,
                  priority: FastImage.priority.normal,
                  cache: FastImage.cacheControl.immutable,
                }
              : images.placeholder
          }
          onLoadStart={() => {
            setImageLoading(true);
          }}
          onLoadEnd={() => {
            setImageLoading(false);
          }}
          onError={() => {
            setHasError(true);
            setImageLoading(false);
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        {imageLoading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="small" color={colors.primary} />
          </View>
        )}
      </View>
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
        <View style={styles.statusRow}>
          {/* <Text
            style={
              item.isAvailable
                ? styles.statusAvailable
                : styles.statusUnavailable
            }
          >
            {item.isAvailable ? 'Available' : 'Unavailable'}
          </Text> */}
          {onRemove && (
            <TouchableOpacity
              style={styles.removeButton}
              onPress={onRemove}
              activeOpacity={0.6}
            >
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;
