import React from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  StyleProp,
} from 'react-native';
import { styles } from './styles';
import colors from '../../themes/colors';

interface Props extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const CustomButton = ({
  title,
  loading = false,
  disabled,
  style,
  textStyle,
  onPress,
}: Props) => {
  return (
    <TouchableOpacity
      style={[styles.container, disabled && styles.disabled, style]}
      disabled={disabled || loading}
      activeOpacity={0.8}
      onPress={onPress}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={colors.white}
          style={styles.loader}
        />
      ) : (
        <Text style={[styles.label, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
