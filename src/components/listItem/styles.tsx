import { StyleSheet } from 'react-native';
import colors from '../../themes/colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginHorizontal: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
    flex: 1,
  },
  ratingContainer: {
    backgroundColor: colors.lightYellow,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.yellow,
  },
  description: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 12,
    lineHeight: 20,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.lightGrey,
    paddingTop: 12,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  currency: {
    fontSize: 14,
    color: colors.blue,
    fontWeight: '600',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.blue,
  },
  duration: {
    fontSize: 12,
    color: colors.gray,
    marginLeft: 4,
  },
  statusAvailable: {
    color: colors.green,
    fontSize: 12,
    fontWeight: '500',
  },
  statusUnavailable: {
    color: colors.red,
    fontSize: 12,
    fontWeight: '500',
  },
});
