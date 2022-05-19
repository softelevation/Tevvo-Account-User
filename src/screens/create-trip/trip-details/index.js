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
import {RouteNames} from '_routeName';
import Dots from 'src/components/dots';
import GooglePlacesTextInput from 'src/components/google-places';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {
  decrypted,
  encrypted,
  formatDateTime,
  getPhoenixDateTime,
  strictValidObjectWithKeys,
} from 'src/utils/commonUtils';
import {createTripRequest} from 'src/redux/trip/action';
import {apiCall} from 'src/redux/store/api-client';
import {API_URL} from 'src/utils/config';
import {onDisplayNotification} from 'src/utils/mobile-utils';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import moment from 'moment-timezone';
import {Platform} from 'react-native';

const TripDetails = () => {
  const dispatch = useDispatch();
  const [tripData, loading] = useSelector((v) => [
    v.allTrips.savedTrip.data,
    v.trip.loading,
  ]);
  const {navigate} = useNavigation();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [Loader, setLoading] = useState(false);
  const {params} = useRoute();
  const currentApiCall = () => {
    dispatch(corporateAccountsRequest());
  };

  useFocusEffect(
    React.useCallback(() => {
      currentApiCall();
    }, []),
  );

  const timeFormatPhoenix = () => {
    const timeFormat = moment(new Date()).zone('-0700');
    return new Date(timeFormat);
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

  const renderSection = (title = 'Account') => {
    return (
      <Block flex={false} margin={[hp(1), 0]}>
        <Text size={16} bold>
          {title}
        </Text>
      </Block>
    );
  };

  const callUpdateApi = async (data, id) => {
    setLoading(true);
    try {
      const response = await apiCall(
        'PUT',
        `${API_URL.CREATE_TRIP}/${id}`,
        data,
      );
      const dataResponse = decrypted(response.data);
      if (response.status === 1) {
        setLoading(false);
        navigate(RouteNames.REVIEW_DETAILS_SCREEN, {
          data: dataResponse,
        });
        onDisplayNotification(response.message);
      } else {
        setLoading(false);
        onDisplayNotification(response.message);
      }
    } catch (error) {
      setLoading(false);
      onDisplayNotification(error.data.message);
    }
  };

  const onSubmit = (values) => {
    const data = {
      ...values,
      ...params.data,
    };
    const encryptedData = encrypted(data);
    if (strictValidObjectWithKeys(tripData)) {
      callUpdateApi(encryptedData, tripData.trip_id);
    } else {
      dispatch(createTripRequest(encryptedData));
    }
  };
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          trip_pickup_location: strictValidObjectWithKeys(tripData)
            ? tripData.trip_pickup_location
            : '',
          trip_dropoff_location: strictValidObjectWithKeys(tripData)
            ? tripData.trip_dropoff_location
            : '',
          pick_up_date_time: strictValidObjectWithKeys(tripData)
            ? tripData.pick_up_date_time
            : '',
          pickup_lat: strictValidObjectWithKeys(tripData)
            ? tripData.pickup_lat
            : '',
          pickup_lng: strictValidObjectWithKeys(tripData)
            ? tripData.pickup_lng
            : '',
          dropoff_lat: strictValidObjectWithKeys(tripData)
            ? tripData.dropoff_lat
            : '',
          dropoff_lng: strictValidObjectWithKeys(tripData)
            ? tripData.dropoff_lng
            : '',
          pick_date_time: strictValidObjectWithKeys(tripData)
            ? formatDateTime(tripData.pick_up_date_time)
            : '',
        }}
        onSubmit={onSubmit}
        validationSchema={yup.object().shape({
          trip_pickup_location: yup.string().min(1).required(),
          trip_dropoff_location: yup.string().min(1).required(),
          pick_up_date_time: yup.string().min(1).required(),
          pickup_lat: yup.string().min(1).required(),
          pickup_lng: yup.string().min(1).required(),
          dropoff_lat: yup.string().min(1).required(),
          dropoff_lng: yup.string().min(1).required(),
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
            <KeyboardAwareScrollView contentContainerStyle={{flexGrow: 1}}>
              <Block primary defaultPadding>
                {renderSection('Trip Details')}
                <Block flex={false}>
                  <GooglePlacesTextInput
                    searchKeyword={values.trip_pickup_location}
                    placeholder={'Pick Up Location *'}
                    onPress={(data, details) => {
                      const {name, latLng} = data;
                      setFieldValue('trip_pickup_location', name);
                      setFieldValue('pickup_lat', latLng.lat);
                      setFieldValue('pickup_lng', latLng.lng);
                    }}
                    onChangeText={(e) => {
                      if (e === '') {
                        setFieldValue('trip_pickup_location', '');
                        setFieldValue('pickup_lat', '');
                        setFieldValue('pickup_lng', '');
                      } else {
                        setFieldValue('trip_pickup_location', e);
                      }
                    }}
                    error={
                      touched.trip_pickup_location &&
                      errors.trip_pickup_location
                    }
                  />
                  <GooglePlacesTextInput
                    searchKeyword={values.trip_dropoff_location}
                    onPress={(data, details) => {
                      const {name, latLng} = data;
                      setFieldValue('trip_dropoff_location', name);
                      setFieldValue('dropoff_lat', latLng.lat);
                      setFieldValue('dropoff_lng', latLng.lng);
                    }}
                    onChangeText={(e) => {
                      if (e === '') {
                        setFieldValue('trip_dropoff_location', '');
                        setFieldValue('dropoff_lat', '');
                        setFieldValue('dropoff_lng', '');
                      } else {
                        setFieldValue('trip_dropoff_location', e);
                      }
                    }}
                    placeholder={'Drop Off Location *'}
                    error={
                      touched.trip_dropoff_location &&
                      errors.trip_dropoff_location
                    }
                  />
                  {/* <TextInput
                    mode="outlined"
                    value={values.last_name}
                    onChangeText={handleChange('last_name')}
                    onBlur={() => setFieldTouched('last_name')}
                    placeholder={'Date And Time'}
                    autoCapitalize="none"
                    style={TextInputStyle.containerStyleWithMargin}
                    keyboardType="email-address"
                    returnKeyType="next"
                  /> */}
                  <TextInput
                    placeholder={'Pick Up Time *'}
                    label={'Pick Up Time *'}
                    value={values.pick_date_time}
                    // error={touched.pick_date_time && errors.pick_date_time}
                    editable={false}
                    mode="outlined"
                    style={[TextInputStyle.containerStyleWithMargin]}
                    right={
                      <TextInput.Icon
                        onPress={() => {
                          showDatePicker();
                        }}
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
                </Block>
              </Block>
            </KeyboardAwareScrollView>
            <Block flex={false} defaultPadding primary={true}>
              <Button
                isLoading={loading || Loader}
                disabled={!isValid}
                onPress={handleSubmit}
                color="primary">
                {strictValidObjectWithKeys(tripData)
                  ? 'Update Trip'
                  : 'Create Trip'}
              </Button>
              <Dots Active={4} />
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime"
                // minimumDate={
                //   Platform.OS === 'android'
                //     ? timeFormatPhoenix()
                //     : getPhoenixDateTime()
                // }
                minuteInterval={5}
                is24Hour={false}
                // timeZoneOffsetInMinutes={60}
                onConfirm={(date) => {
                  handleConfirm(date);
                  setFieldValue('pick_date_time', formatDateTime(date));
                  setFieldValue('pick_up_date_time', date);
                }}
                onCancel={hideDatePicker}
              />
            </Block>
          </>
        )}
      </Formik>
    </>
  );
};

export default TripDetails;
