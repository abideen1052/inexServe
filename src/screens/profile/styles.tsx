import { StyleSheet } from 'react-native';
import colors from '../../themes/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  button: {
    backgroundColor: colors.red,
  },
});
