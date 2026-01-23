import { StyleSheet } from 'react-native';
import colors from '../../../themes/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: 14,
  },
  logo: {
    height: 100,
    width: 100,
    marginVertical: 80,
  },
  button: {
    marginTop: 50,
  },
  registerText: {
    marginTop: 10,
    fontSize: 14,
    color: colors.gray,
    textAlign: 'center',
    fontWeight: '500',
  },
  registerLink: {
    color: colors.primary,
    fontWeight: '600',
  },
});
