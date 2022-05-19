import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Block, Button, hp, ImageComponent, wp, Text} from '_elements';
import {
  formatDateTime,
  formatDOB,
  strictValidArrayWithLength,
  strictValidObjectWithKeys,
  strictValidString,
} from 'src/utils/commonUtils';
import {Alert, ScrollView} from 'react-native';
import {light} from 'src/components/theme/colors';
import {RouteNames} from '_routeName';
import {useDispatch, useSelector} from 'react-redux';
import {tripSavedSuccess} from 'src/redux/unit/activity/action';
import {apiCall} from 'src/redux/store/api-client';
import {onDisplayNotification} from 'src/utils/mobile-utils';
import {API_URL} from 'src/utils/config';
import io from 'socket.io-client';

const TripDetails = () => {
  const {params} = useRoute();
  const {navigate, goBack} = useNavigation();
  const {data} = params;
  const dispatch = useDispatch();
  const [user] = useSelector((v) => [v.auth.login.profile]);
  const renderSection = (title, image, height = 18, width = 18) => {
    return (
      <Block margin={[hp(2), 0, hp(0)]} flex={false}>
        <Block flex={false} row center space={'between'}>
          <Block padding={[0, 0, hp(1), 0]} flex={false} row center>
            <ImageComponent name={image} height={height} width={width} />
            <Text semibold size={16} margin={[0, 0, 0, wp(3)]}>
              {title}
            </Text>
          </Block>
        </Block>
        <Block
          margin={[hp(1), 0, hp(1.5)]}
          borderColor={light.secondary}
          borderWidth={[0, 0, 1, 0]}
        />
      </Block>
    );
  };
  const renderDivider = () => {
    return (
      <Block
        margin={[hp(2), 0, 0]}
        borderColor={'#C5C5C7'}
        borderWidth={[0, 0, 1, 0]}
      />
    );
  };
  const renderSectionData = (title, subtitle) => {
    return (
      <Block margin={[hp(1), 0, 0]} flex={false} row space="between">
        <Text style={{width: wp(35)}} grey size={14}>
          {title}
        </Text>
        <Text
          numberOfLines={2}
          style={{width: wp(58)}}
          right
          height={18}
          semibold
          size={14}>
          {subtitle || 'N/A'}
        </Text>
      </Block>
    );
  };
  const onPressCard = () => {
    dispatch(tripSavedSuccess(data));
    navigate(RouteNames.PLANNED_STACK_SCREEN);
  };

  const cancelTripDelete = async () => {
    const socket = io(API_URL.BASE_URL);
    const res = await apiCall('DELETE', `/account-user/trip/${data.trip_id}`);
    if (res) {
      socket.emit('create_trip', data.trip_id);
      if (data.status !== 'requested') {
        socket.emit('trip_cancelled', data.trip_id);
      }
      onDisplayNotification(res.message);
      setTimeout(() => {
        goBack();
      }, 1000);
    }
  };
  const cancelTrip = () => {
    Alert.alert('Info', 'Are you sure you want to cancel the trip ?', [
      {
        text: 'Cancel',
        style: 'destructive',
      },
      {text: 'OK', onPress: () => cancelTripDelete()},
    ]);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1}}>
      <Block primary>
        <Block defaultPadding flex={false}>
          {renderSection('Planned trip Information', 'warning_icon', 20, 20)}
          {renderSectionData(
            'Trip ID',
            strictValidObjectWithKeys(data) && data.leg_id,
          )}
          {renderSectionData(
            'PU Time',
            strictValidObjectWithKeys(data) &&
              formatDateTime(data.pick_up_date_time),
          )}
          {renderSectionData(
            'PU',
            strictValidObjectWithKeys(data) && data.trip_pickup_location,
          )}
          {renderSectionData(
            'DO',
            strictValidObjectWithKeys(data) && data.trip_dropoff_location,
          )}
          {renderSectionData(
            'Patient',
            strictValidObjectWithKeys(data) &&
              `${data.base_patient.last_name}, ${data.base_patient.first_name}`,
          )}
          {renderSectionData(
            'DOB',
            strictValidObjectWithKeys(data) && formatDOB(data.base_patient.dob),
          )}
          {renderSectionData(
            'Transport Mode',
            strictValidObjectWithKeys(data) && data.capability_name,
          )}
          {renderSectionData(
            'Clarifications',
            strictValidObjectWithKeys(data) && data.capability_clarification,
          )}
          {renderSectionData(
            'Special Instructions',
            strictValidObjectWithKeys(data) &&
              strictValidString(data.base_patient.description) &&
              `${data.base_patient.description}`,
          )}
          {renderSectionData(
            'Weight',
            strictValidObjectWithKeys(data) &&
              strictValidString(data.base_patient.weight) &&
              `${data.base_patient.weight} lbs`,
          )}
          {renderSectionData(
            'Room Number',
            strictValidObjectWithKeys(data) && data.base_patient.room_no,
          )}
          {renderDivider()}
          {renderSection('Account', 'account_icon')}
          {renderSectionData(
            'Name',
            strictValidObjectWithKeys(data) && `${data.corporate_account.name}`,
          )}
          {renderSectionData(
            'Billing Address',
            strictValidObjectWithKeys(data) &&
              data.corporate_account.billing_address,
          )}
          {renderSectionData(
            'ER Phone Number',
            strictValidObjectWithKeys(data) &&
              data.corporate_account.corporate_contact,
          )}
          {renderDivider()}
          {renderSection('Contact', 'contact_icon', 18, 22)}
          {renderSectionData(
            'Name',
            strictValidObjectWithKeys(data) &&
              strictValidArrayWithLength(data.company_contact) &&
              `${data.company_contact[0].last_name}, ${data.company_contact[0].first_name}`,
          )}
          {renderSectionData(
            'Email',
            strictValidObjectWithKeys(data) &&
              strictValidArrayWithLength(data.company_contact) &&
              `${data.company_contact[0].email_id}`,
          )}
          {renderSectionData(
            'Phone Number',
            strictValidObjectWithKeys(data) &&
              strictValidArrayWithLength(data.company_contact) &&
              `${data.company_contact[0].phone_number}`,
          )}
          {renderDivider()}
          {renderSection('Pick Up Location', 'pickup_icon', 16, 14)}
          {renderSectionData(
            'Address',
            strictValidObjectWithKeys(data) && data.trip_pickup_location,
          )}
          {renderSectionData(
            'Date and Time',
            strictValidObjectWithKeys(data) &&
              formatDateTime(data.pick_up_date_time),
          )}
          {renderDivider()}
          {renderSection('Patient', 'patient_icon', 20, 18)}
          {renderSectionData(
            'Name',
            strictValidObjectWithKeys(data) &&
              `${data.base_patient.last_name}, ${data.base_patient.first_name}`,
          )}
          {renderSectionData(
            'DOB',
            strictValidObjectWithKeys(data) && formatDOB(data.base_patient.dob),
          )}
          {renderSectionData(
            'Phone Number',
            strictValidObjectWithKeys(data) && data.base_patient.phone,
          )}
          {renderSectionData(
            'Email',
            strictValidObjectWithKeys(data) && data.base_patient.email_id,
          )}
          {renderDivider()}
          {renderSection('Drop Off Location', 'drop_icon', 17, 14)}
          {renderSectionData(
            'Address',
            strictValidObjectWithKeys(data) && data.trip_dropoff_location,
          )}
          {renderDivider()}
          <Block row space={'between'} margin={[hp(2), 0, hp(4)]} flex={false}>
            <Button
              disabled={data.status !== 'requested'}
              style={{width: wp(43)}}
              onPress={() => onPressCard()}
              color="primary">
              Edit Trip
            </Button>
            <Button
              style={{width: wp(43)}}
              onPress={() => cancelTrip()}
              color="primary">
              Cancel Trip
            </Button>
          </Block>
        </Block>
      </Block>
    </ScrollView>
  );
};

export default TripDetails;
