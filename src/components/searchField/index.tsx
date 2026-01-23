import { TextInput, View } from 'react-native';
import React from 'react';
import { styles } from './styles';
import SvgImage from '../../utils/svgImage';
import colors from '../../themes/colors';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

const SearchField = ({
  value,
  onChangeText,
  placeholder = 'Search...',
}: Props) => {
  return (
    <View style={styles.container}>
      <SvgImage icon="search" width={20} height={20} color={colors.black} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#999"
      />
    </View>
  );
};

export default SearchField;
