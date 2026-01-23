import { StyleSheet } from 'react-native';
import colors from '../../themes/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingBottom: 60,
  },
  headText: {
    marginLeft: 14,
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.black,
    marginTop: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingVertical: 16,
  },
});
