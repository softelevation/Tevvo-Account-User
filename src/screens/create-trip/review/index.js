import React, {useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Block, Button, hp, ImageComponent, wp, Text} from '_elements';
import {
  formatDateTime,
  strictValidArrayWithLength,
  strictValidNumber,
  strictValidObjectWithKeys,
  strictValidString,
} from 'src/utils/commonUtils';
import {ScrollView} from 'react-native';
import {light} from 'src/components/theme/colors';
import {RouteNames} from '_routeName';
import {API_URL} from 'src/utils/config';
import io from 'socket.io-client';
import {BackHandler} from 'react-native';

const ReviewDetails = () => {
  const {params} = useRoute();
  const navigation = useNavigation();
  const {data} = params;
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
  useEffect(() => {
    const socket = io(API_URL.BASE_URL);
    if (strictValidObjectWithKeys(data)) {
      socket.emit('create_trip', data.trip_id);
    }
  }, [data]);
  const handleBackPress = () => {
    return true;
  };
  React.useEffect(() => {
    const BackButton = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );
    return () => BackButton.remove();
  }, []);

  const onSubmit = () => {
    navigation.navigate(RouteNames.CURRENT_UNIT_STACK_SCREEN);
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
              `${data.last_name}, ${data.first_name}`,
          )}
          {renderSectionData(
            'DOB',
            strictValidObjectWithKeys(data) && data.dob,
          )}
          {renderSectionData(
            'Transport Mode',
            strictValidObjectWithKeys(data) && data.capability,
          )}
          {renderSectionData(
            'Clarifications',
            strictValidObjectWithKeys(data) && data.capability_clarification,
          )}
          {renderSectionData(
            'Weight',
            strictValidObjectWithKeys(data) &&
              strictValidString(data.weight) &&
              `${data.weight} lbs`,
          )}
          {renderSectionData(
            'Special Instructions',
            strictValidObjectWithKeys(data) &&
              strictValidString(data.description) &&
              `${data.description}`,
          )}
          {renderSectionData(
            'Room Number',
            strictValidObjectWithKeys(data) && data.room_no,
          )}
          {renderDivider()}
          {renderSection('Account', 'account_icon')}
          {renderSectionData(
            'Name',
            strictValidObjectWithKeys(data) && `${data.account_name}`,
          )}
          {renderSectionData(
            'Billing Address',
            strictValidObjectWithKeys(data) && data.hospital_address,
          )}
          {renderSectionData(
            'ER Phone Number',
            strictValidObjectWithKeys(data) && data.hospital_phone,
          )}
          {renderDivider()}
          {renderSection('Contact', 'contact_icon', 18, 22)}
          {renderSectionData(
            'Name',
            strictValidObjectWithKeys(data) &&
              strictValidArrayWithLength(data.corporate_contact) &&
              `${data.corporate_contact[0].last_name}, ${data.corporate_contact[0].first_name}`,
          )}
          {renderSectionData(
            'Email',
            strictValidObjectWithKeys(data) &&
              strictValidArrayWithLength(data.corporate_contact) &&
              `${data.corporate_contact[0].email_id}`,
          )}
          {renderSectionData(
            'Phone Number',
            strictValidObjectWithKeys(data) &&
              strictValidArrayWithLength(data.corporate_contact) &&
              `${data.corporate_contact[0].phone_number}`,
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
              `${data.last_name}, ${data.first_name}`,
          )}
          {renderSectionData(
            'DOB',
            strictValidObjectWithKeys(data) && data.dob,
          )}
          {renderSectionData(
            'Phone Number',
            strictValidObjectWithKeys(data) && data.phone,
          )}
          {renderSectionData(
            'Email',
            strictValidObjectWithKeys(data) && data.email_id,
          )}
          {renderDivider()}
          {renderSection('Drop Off Location', 'drop_icon', 17, 14)}
          {renderSectionData(
            'Address',
            strictValidObjectWithKeys(data) && data.trip_dropoff_location,
          )}
          {renderDivider()}
          <Block margin={[hp(2), 0, hp(4)]} flex={false}>
            <Button
              onPress={() => {
                onSubmit();
              }}
              color="primary">
              Ok
            </Button>
          </Block>
        </Block>
      </Block>
    </ScrollView>
  );
};

export default ReviewDetails;
