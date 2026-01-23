import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { styles } from './styles';
import { ServiceItem } from '../listItem';
import { images } from '../../themes/images';
import colors from '../../themes/colors';
import {
  addRequestedService,
  addReferredService,
} from '../../utils/asyncStore';
import CustomButton from '../customButton';
import InputField from '../inputField';
import { NameValid, EmailValid } from '../../utils/validations';
import Toast from '../toast';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  item: ServiceItem | null;
}

const BottomPopUp = ({ isVisible, onClose, item }: Props) => {
  const [imageLoading, setImageLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isReferring, setIsReferring] = useState(false);
  const [referName, setReferName] = useState('');
  const [referEmail, setReferEmail] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [toast, setToast] = useState({
    visible: false,
    message: '',
    type: '',
  });

  useEffect(() => {
    if (isVisible) {
      setHasError(false);
      setImageLoading(false);
      setIsReferring(false);
      setReferName('');
      setReferEmail('');
      setNameError('');
      setEmailError('');
      setToast({
        visible: false,
        message: '',
        type: '',
      });
    }
  }, [isVisible, item?.id]);

  if (!item) return null;

  const handleRequest = async () => {
    if (item) {
      await addRequestedService(item);
      setToast({
        visible: true,
        message: 'Service requested successfully',
        type: 'success',
      });
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  };

  const handleReffer = () => {
    setIsReferring(true);
  };

  const handleReferSubmit = async () => {
    const nameValidation = NameValid(referName);
    const emailValidation = EmailValid(referEmail);
    if (nameValidation || emailValidation) {
      setNameError(nameValidation || '');
      setEmailError(emailValidation || '');
      return;
    }
    setNameError('');
    setEmailError('');
    await addReferredService({
      ...item,
      referredName: referName,
      referredEmail: referEmail,
      referralId: '',
    });
    setToast({
      visible: true,
      message: 'Service referred successfully',
      type: 'success',
    });
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={() => {
        setToast({
          visible: false,
          message: '',
          type: '',
        });
        onClose();
      }}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <View style={styles.dragHandle} />

              {isReferring ? (
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                  <View style={styles.formContainer}>
                    <Text style={styles.formTitle}>Enter the details</Text>
                    <View style={styles.inputContainer}>
                      <InputField
                        placeholder="Name"
                        value={referName}
                        onChangeText={text => {
                          setReferName(text);
                          if (nameError) setNameError('');
                        }}
                        error={nameError}
                      />
                      <InputField
                        placeholder="Email"
                        keyboardType="email-address"
                        value={referEmail}
                        onChangeText={text => {
                          setReferEmail(text);
                          if (emailError) setEmailError('');
                        }}
                        autoCapitalize="none"
                        error={emailError}
                      />
                    </View>
                    <CustomButton
                      title="Submit"
                      onPress={handleReferSubmit}
                      style={styles.refferButton}
                    />
                  </View>
                </TouchableWithoutFeedback>
              ) : (
                <>
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
                        <ActivityIndicator
                          size="small"
                          color={colors.primary}
                        />
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
                      onPress={() => handleRequest()}
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
                </>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
      <Toast
        toast={toast}
        onClose={() => setToast({ ...toast, visible: false })}
      />
    </Modal>
  );
};

export default BottomPopUp;
