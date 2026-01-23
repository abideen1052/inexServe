import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { styles } from './styles';
import { ServiceItem } from '../listItem';
import { images } from '../../themes/images';
import colors from '../../themes/colors';
import { addRequestedService } from '../../utils/asyncStore';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  item: ServiceItem | null;
}

const BottomPopUp = ({ isVisible, onClose, item }: Props) => {
  const [imageLoading, setImageLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (item?.id) {
      setHasError(false);
      setImageLoading(false);
    }
  }, [item?.id]);

  if (!item) return null;

  const handleRequest = async () => {
    if (item) {
      await addRequestedService(item);
      onClose();
    }
  };
  const handleReffer = () => {};

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <View style={styles.dragHandle} />

              <View style={styles.imageContainer}>
                <FastImage
                  source={
                    item.imageUrl && !hasError
                      ? {
                          uri: item.imageUrl,
                          priority: FastImage.priority.normal,
                          cache: FastImage.cacheControl.immutable,
                        }
                      : images.placeholder
                  }
                  style={styles.image}
                  resizeMode={FastImage.resizeMode.cover}
                  onLoadStart={() => setImageLoading(true)}
                  onLoadEnd={() => setImageLoading(false)}
                  onError={() => {
                    setHasError(true);
                    setImageLoading(false);
                  }}
                />
                {imageLoading && (
                  <View style={styles.loaderContainer}>
                    <ActivityIndicator size="small" color={colors.primary} />
                  </View>
                )}
              </View>

              <Text style={styles.name}>{item.name}</Text>

              <View style={styles.priceContainer}>
                <Text style={styles.currency}>$</Text>
                <Text style={styles.price}>{item.price}</Text>
                <Text style={styles.duration}> / {item.duration}</Text>
              </View>

              <Text style={styles.description}>{item.description}</Text>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.requestButton]}
                  onPress={handleRequest}
                >
                  <Text style={styles.requestButtonText}>Request</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.referButton]}
                  onPress={handleReffer}
                >
                  <Text style={styles.referButtonText}>Refer</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default BottomPopUp;
