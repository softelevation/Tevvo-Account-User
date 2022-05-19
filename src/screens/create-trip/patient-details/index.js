/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {corporateAccountsRequest} from 'src/redux/unit/corporate-account/action';
import {Block, hp, Text, Button, ImageComponent} from '_elements';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {TextInput} from 'react-native-paper';
import {TextInputStyle} from 'src/assets/styles/flatlist';
import {Formik} from 'formik';
import * as yup from 'yup';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {RouteNames} from '_routeName';
import Dots from 'src/components/dots';
// import TextInputMask from 'react-native-text-input-mask';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {
  formatDateTime,
  formatDOB,
  strictValidObjectWithKeys,
} from 'src/utils/commonUtils';
import {TextInputMask} from 'react-native-masked-text';

const PatientDetails = () => {
  const dispatch = useDispatch();
  const {navigate} = useNavigation();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [tripData] = useSelector((v) => [v.allTrips.savedTrip.data]);
  const {params} = useRoute();
  const currentApiCall = () => {
    dispatch(corporateAccountsRequest());
  };

  useFocusEffect(
    React.useCallback(() => {
      currentApiCall();
    }, []),
  );
  const renderSection = (title = 'Account') => {
    return (
      <Block flex={false} margin={[hp(1), 0]}>
        <Text size={16} bold>
          {title}
        </Text>
      </Block>
    );
  };

  const onSubmit = (values) => {
    navigate(RouteNames.CAPABILITY_SCREEN, {
      data: {
        ...params.data,
        ...values,
      },
    });
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn('A date has been picked: ', date);
    hideDatePicker();
  };
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          first_name:
            strictValidObjectWithKeys(tripData) &&
            strictValidObjectWithKeys(tripData.base_patient)
              ? tripData.base_patient.first_name
              : '',
          last_name:
            strictValidObjectWithKeys(tripData) &&
            strictValidObjectWithKeys(tripData.base_patient)
              ? tripData.base_patient.last_name
              : '',
          email_id:
            strictValidObjectWithKeys(tripData) &&
            strictValidObjectWithKeys(tripData.base_patient)
              ? tripData.base_patient.email_id
              : '',
          phone:
            strictValidObjectWithKeys(tripData) &&
            strictValidObjectWithKeys(tripData.base_patient)
              ? tripData.base_patient.phone
              : '',
          dob:
            strictValidObjectWithKeys(tripData) &&
            strictValidObjectWithKeys(tripData.base_patient)
              ? formatDOB(tripData.base_patient.dob)
              : '',
          weight:
            strictValidObjectWithKeys(tripData) &&
            strictValidObjectWithKeys(tripData.base_patient)
              ? tripData.base_patient.weight
              : '',
          room_no:
            strictValidObjectWithKeys(tripData) &&
            strictValidObjectWithKeys(tripData.base_patient)
              ? tripData.base_patient.weight
              : '',
        }}
        onSubmit={onSubmit}
        validationSchema={yup.object().shape({
          first_name: yup.string().min(1).required(),
          last_name: yup.string().min(1).required(),
          dob: yup.string().min(1).required(),
          weight: yup.string().min(1).required(),
        })}>
        {({
          values,
          handleChange,
          errors,
          setFieldTouched,
          touched,
          setFieldValue,
          handleSubmit,
          isValid,
          dirty,
        }) => (
          <>
            <KeyboardAwareScrollView
              bounce={false}
              style={{backgroundColor: '#fff'}}
              contentContainerStyle={{flexGrow: 1}}>
              <Block primary defaultPadding>
                {renderSection('Patient Details')}
                <Block flex={false}>
                  <TextInput
                    mode="outlined"
                    value={values.first_name}
                    onChangeText={handleChange('first_name')}
                    onBlur={() => setFieldTouched('first_name')}
                    error={touched.first_name && errors.first_name}
                    label={'First Name *'}
                    placeholder={'First Name *'}
                    autoCapitalize="none"
                    style={TextInputStyle.containerStyleWithMargin}
                    keyboardType="email-address"
                    returnKeyType="next"
                  />
                  <TextInput
                    mode="outlined"
                    value={values.last_name}
                    onChangeText={handleChange('last_name')}
                    onBlur={() => setFieldTouched('last_name')}
                    error={touched.last_name && errors.last_name}
                    label={'Last Name *'}
                    placeholder={'Last Name *'}
                    autoCapitalize="none"
                    style={TextInputStyle.containerStyleWithMargin}
                    keyboardType="email-address"
                    returnKeyType="next"
                  />
                  {/* <MaskedInput /> */}
                  <TextInput
                    label={'Date Of Birth *'}
                    placeholder={'Date Of Birth *'}
                    value={values.dob}
                    error={touched.dob && errors.dob}
                    editable={false}
                    mode="outlined"
                    style={[TextInputStyle.containerStyleWithMargin]}
                    right={
                      <TextInput.Icon
                        onPress={() => showDatePicker()}
                        name={() => (
                          <ImageComponent
                            name={'calendar'}
                            height={20}
                            width={20}
                          />
                        )}
                      />
                    }
                  />
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    maximumDate={new Date()}
                    minimumDate={new Date(1900, 0, 1)}
                    onConfirm={(date) => {
                      handleConfirm(date);
                      setFieldValue('dob', formatDOB(date));
                    }}
                    onCancel={hideDatePicker}
                  />
                  <TextInput
                    mode="outlined"
                    value={values.phone}
                    onChangeText={handleChange('phone')}
                    onBlur={() => setFieldTouched('phone')}
                    label={'Phone Number (Optional)'}
                    placeholder={'Phone Number (Optional)'}
                    autoCapitalize="none"
                    style={TextInputStyle.containerStyleWithMargin}
                    keyboardType="phone-pad"
                    returnKeyType="next"
                    maxLength={16}
                    render={(props) => (
                      <TextInputMask
                        type={'cel-phone'}
                        options={{
                          maskType: 'BRL',
                          withDDD: true,
                          dddMask: '+1(999) 999-9999',
                        }}
                        {...props}
                      />
                    )}
                  />
                  <TextInput
                    mode="outlined"
                    value={values.email_id}
                    onChangeText={handleChange('email_id')}
                    error={touched.email_id && errors.email_id}
                    onBlur={() => setFieldTouched('email_id')}
                    label={'Email Id (Optional)'}
                    placeholder={'Email Id (Optional)'}
                    autoCapitalize="none"
                    style={TextInputStyle.containerStyleWithMargin}
                    keyboardType="email-address"
                    returnKeyType="next"
                  />
                  <TextInput
                    mode="outlined"
                    value={values.weight}
                    error={touched.weight && errors.weight}
                    onChangeText={handleChange('weight')}
                    onBlur={() => setFieldTouched('weight')}
                    label={'Weight *'}
                    placeholder={'Weight *'}
                    autoCapitalize="none"
                    style={TextInputStyle.containerStyleWithMargin}
                    keyboardType="number-pad"
                    returnKeyType="next"
                    right={<TextInput.Affix text="lbs" />}
                  />
                  <TextInput
                    mode="outlined"
                    value={values.room_no}
                    error={touched.room_no && errors.room_no}
                    onChangeText={handleChange('room_no')}
                    onBlur={() => setFieldTouched('room_no')}
                    label={'Room Number (Optional)'}
                    placeholder={'Room Number (Optional)'}
                    autoCapitalize="none"
                    style={TextInputStyle.containerStyleWithMargin}
                    keyboardType="email-address"
                    returnKeyType="next"
                  />
                </Block>
              </Block>
              <Block flex={false} defaultPadding primary={true}>
                <Button
                  disabled={!isValid}
                  onPress={handleSubmit}
                  color="primary">
                  Continue
                </Button>
                <Dots Active={2} />
              </Block>
            </KeyboardAwareScrollView>
          </>
        )}
      </Formik>
    </>
  );
};

export default PatientDetails;
