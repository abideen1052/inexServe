import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../themes/colors';

const { height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 40,
    minHeight: height * 0.5,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: -10,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 30,
  },
  dragHandle: {
    width: 36,
    height: 5,
    backgroundColor: '#E0E0E0',
    borderRadius: 2.5,
    alignSelf: 'center',
    marginBottom: 24,
  },
  imageContainer: {
    width: '100%',
    height: 220,
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
    backgroundColor: colors.lightGrey,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  loaderContainer: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightGrey,
  },
  name: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.black,
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 16,
  },
  currency: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
    marginRight: 2,
  },
  price: {
    fontSize: 32,
    fontWeight: '900',
    color: colors.primary,
  },
  duration: {
    fontSize: 16,
    color: colors.gray,
    fontWeight: '500',
  },
  description: {
    fontSize: 16,
    color: colors.gray,
    lineHeight: 24,
    marginBottom: 32,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  requestButton: {
    backgroundColor: colors.primary,
  },
  referButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  requestButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  referButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});
