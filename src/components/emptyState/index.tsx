import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

interface Props {
  title?: string;
  description?: string;
}

const EmptyState = ({
  title = 'No Items Found',
  description = 'It looks like there is nothing to show here yet.',
}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

export default EmptyState;
