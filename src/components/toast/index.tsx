/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef } from 'react';
import {
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  Animated,
} from 'react-native';
import colors from '../../themes/colors';
import SvgImage from '../../utils/svgImage';

const { width } = Dimensions.get('window');

type ToastType = {
  type: string;
  message: string;
  visible: boolean;
};

type ToastProps = {
  toast: ToastType;
  onClose: () => void;
  duration?: number;
  bottomSpace?: number;
};

const Toast: React.FC<ToastProps> = ({
  toast,
  onClose,
  duration = 3000,
  bottomSpace,
}) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(30)).current;

  const isSuccess = toast.type === 'success';

  useEffect(() => {
    if (toast.visible) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      const timeout = setTimeout(() => {
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 30,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start(() => {
          onClose();
        });
      }, duration);

      return () => clearTimeout(timeout);
    }
  }, [toast.visible, duration, onClose, opacity, translateY]);

  if (!toast.visible) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.toast,
        {
          opacity: opacity,
          transform: [{ translateY: translateY }],
          backgroundColor: isSuccess
            ? colors.greenDark
            : colors.toastBackground,

          bottom: bottomSpace ? bottomSpace : 50,
        },
      ]}
    >
      <Text
        numberOfLines={2}
        style={[
          styles.message,
          { color: isSuccess ? '#8EF9F3' : colors.toastText },
        ]}
      >
        {toast.message}
      </Text>
      <Pressable onPress={() => onClose()}>
        <SvgImage
          icon={isSuccess ? 'sussesToastClose' : 'errorToastClose'}
          width={20}
          height={20}
          color={isSuccess ? '#8EF9F3' : colors.toastText}
        />
      </Pressable>
    </Animated.View>
  );
};

export default Toast;

const styles = StyleSheet.create({
  toast: {
    height: 40,
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width * 0.9,
    borderRadius: 8,
    elevation: 5,
    zIndex: 999,
    paddingHorizontal: 15,
    flexDirection: 'row',
  },
  message: {
    fontWeight: '400',
    fontSize: 14,
    textAlign: 'center',
    flex: 1,
  },
});
