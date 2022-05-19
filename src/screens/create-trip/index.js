/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {corporateAccountsRequest} from 'src/redux/unit/corporate-account/action';
import {
  checkArrayObjectOfKeys,
  removeObjectByArray,
  removeObjectById,
  strictValidArrayWithLength,
  strictValidObjectWithKeys,
} from 'src/utils/commonUtils';
import {Block, hp, Text, Button, CustomButton} from '_elements';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {TextInput} from 'react-native-paper';
import {modalStyle, TextInputStyle} from 'src/assets/styles/flatlist';
import {Formik, FieldArray} from 'formik';
import * as yup from 'yup';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {RouteNames} from '_routeName';
import Dots from 'src/components/dots';
import {Modalize} from 'react-native-modalize';
import {light} from 'src/components/theme/colors';
import SelectWithSearch from 'src/components/select';

const Planning = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const modalizeRef = useRef();
  const [data, user, allTrips] = useSelector((v) => [
    v.allTrips.corporate.data,
    v.auth.login.profile,
    v.allTrips.savedTrip.data,
  ]);
  const [indexVal, setIndex] = useState('');
  useEffect(() => {
    if (strictValidObjectWithKeys(allTrips)) {
      navigation.setOptions({title: 'Edit Trip'});
    }
  }, [allTrips]);

  const currentApiCall = () => {
    dispatch(corporateAccountsRequest());
  };

  useFocusEffect(
    React.useCallback(() => {
      currentApiCall();
    }, []),
  );
  const renderSection = (title = 'Account', rightText = false, onPress) => {
    return (
      <Block row space={'between'} flex={false} margin={[hp(1), 0]}>
        <Text size={16} bold>
          {title}
        </Text>
        {rightText ? (
          <Text onPress={onPress} size={16} secondary semibold={true}>
            Add New
          </Text>
        ) : null}
      </Block>
    );
  };

  const onSubmit = (values) => {
    navigation.navigate(RouteNames.PATIENT_SCREEN, {
      data: values,
    });
  };
  const renderDivider = () => {
    return (
      <Block
        margin={[hp(1), 0, 0]}
        borderColor={'#C5C5C7'}
        borderWidth={[0, 0, 2, 0]}
      />
    );
  };
  const onOpen = (i) => {
    modalizeRef.current?.open();
    setIndex(i);
  };
  const onClose = () => {
    modalizeRef.current?.close();
  };
  let boundArrayHelpers;

  const bindArrayHelpers = (arrayHelpers) => {
    boundArrayHelpers = arrayHelpers;
  };
  const renderValues = (existData) => {
    let arraVal = [];
    existData.map((a) => {
      arraVal.push({
        first_name: a.first_name,
        email_id: a.email_id,
        last_name: a.last_name,
        phone_number: a.phone_number[0],
        corporate_contact_id: a.corporate_contact_id,
      });
    });
    return arraVal;
  };
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          corporate_account_id: strictValidArrayWithLength(data)
            ? data[0].account_id
            : '',
          account_name: strictValidArrayWithLength(data) ? data[0].name : '',
          corporate_contact: strictValidObjectWithKeys(allTrips)
            ? renderValues(allTrips.company_contact)
            : [
                {
                  first_name: '',
                  email_id: '',
                  last_name: '',
                  phone_number: '',
                  corporate_contact_id: '',
                },
              ],
        }}
        onSubmit={onSubmit}
        validationSchema={yup.object().shape({
          corporate_contact: yup.array().of(
            yup.object().shape({
              first_name: yup.string().min(1).required(),
              last_name: yup.string().min(1).required(),
              corporate_contact_id: yup.string().min(1).required(),
              // Rest of your amenities object properties
            }),
          ),
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
        }) => {
          const TripContact =
            strictValidArrayWithLength(data) && data[0].corporate_contact;
          const filterdArray =
            strictValidArrayWithLength(TripContact) &&
            removeObjectByArray(TripContact, values.corporate_contact);
          return (
            <>
              <KeyboardAwareScrollView
                bounce={false}
                contentContainerStyle={{flexGrow: 1}}>
                <Block primary defaultPadding>
                  {renderSection('Account')}
                  <Block flex={false}>
                    <TextInput
                      mode="outlined"
                      value={values.account_name}
                      onChangeText={handleChange('account_name')}
                      onBlur={() => setFieldTouched('account_name')}
                      label={'Account Name *'}
                      placeholder={'Account Name *'}
                      autoCapitalize="none"
                      style={[TextInputStyle.containerStyle]}
                      keyboardType="email-address"
                      returnKeyType="next"
                      disabled={values.account_name}
                      multiline
                    />
                  </Block>
                  <FieldArray
                    name="corporate_contact"
                    render={(arrayHelpers) => {
                      bindArrayHelpers(arrayHelpers);
                      return (
                        <>
                          {renderSection(
                            'Contact',
                            TripContact.length ===
                              values.corporate_contact.length
                              ? false
                              : true,
                            () => arrayHelpers.push({}),
                          )}
                          {values.corporate_contact &&
                            values.corporate_contact.map((friend, index) => (
                              <>
                                <CustomButton
                                  onPress={() => onOpen(index)}
                                  margin={[hp(0.5), 0]}
                                  flex={false}>
                                  <TextInput
                                    mode="outlined"
                                    value={friend.first_name}
                                    label={'First Name'}
                                    autoCapitalize="none"
                                    style={TextInputStyle.containerStyle}
                                    editable={false}
                                    keyboardType="email-address"
                                    returnKeyType="next"
                                    onTouchEnd={() => onOpen(index)}
                                  />
                                </CustomButton>
                                <Block
                                  margin={[hp(0.5), 0]}
                                  onPress={() => onOpen(index)}
                                  flex={false}>
                                  <TextInput
                                    mode="outlined"
                                    value={friend.last_name}
                                    label={'Last Name'}
                                    autoCapitalize="none"
                                    style={TextInputStyle.containerStyle}
                                    editable={false}
                                    keyboardType="email-address"
                                    returnKeyType="next"
                                    // onTouchEnd={() => onOpen(index)}
                                    disabled
                                  />
                                </Block>
                                <Block
                                  // onPress={() => onOpen(index)}
                                  margin={[hp(0.5), 0]}
                                  flex={false}>
                                  <TextInput
                                    mode="outlined"
                                    value={friend.email_id}
                                    label={'Email (Optional)'}
                                    placeholder={'Email (Optional)'}
                                    autoCapitalize="none"
                                    style={TextInputStyle.containerStyle}
                                    editable={false}
                                    keyboardType="email-address"
                                    returnKeyType="next"
                                    // onTouchEnd={() => onOpen(index)}
                                    disabled
                                  />
                                </Block>
                                <Block
                                  // onPress={() => onOpen(index)}
                                  margin={[hp(0.5), 0]}
                                  flex={false}>
                                  <TextInput
                                    mode="outlined"
                                    value={friend.phone_number}
                                    label={'Phone Number (Optional)'}
                                    placeholder={'Phone Number (Optional)'}
                                    autoCapitalize="none"
                                    style={TextInputStyle.containerStyle}
                                    editable={false}
                                    disabled
                                    keyboardType="email-address"
                                    returnKeyType="next"
                                    // onTouchEnd={() => onOpen(index)}
                                  />
                                </Block>
                                <Button
                                  disabled={index === 0}
                                  onPress={() => arrayHelpers.remove(index)}
                                  color="accent">
                                  Remove Contact
                                </Button>
                                {renderDivider()}
                              </>
                            ))}
                        </>
                      );
                    }}
                  />
                </Block>
                <Block flex={false} defaultPadding primary={true}>
                  <Button
                    disabled={checkArrayObjectOfKeys(
                      ['corporate_contact_id', 'last_name', 'first_name'],
                      values.corporate_contact,
                    )}
                    onPress={handleSubmit}
                    color="primary">
                    Continue
                  </Button>
                  <Dots Active={1} />
                </Block>
              </KeyboardAwareScrollView>
              <Modalize
                modalStyle={modalStyle.modal}
                overlayStyle={modalStyle.overlay}
                scrollViewProps={{
                  showsVerticalScrollIndicator: false,
                  keyboardShouldPersistTaps: 'always',
                }}
                handlePosition="inside"
                handleStyle={{backgroundColor: light.secondary}}
                snapPoint={800}
                ref={modalizeRef}>
                <SelectWithSearch
                  label="Search Accounts"
                  data={filterdArray}
                  renderValue="first_name"
                  // selectedState={tripData}
                  onPress={(a) => {
                    boundArrayHelpers.replace(indexVal, {
                      first_name: a.first_name,
                      email_id: a.email_id,
                      last_name: a.last_name,
                      phone_number: a.phone_number[0],
                      corporate_contact_id: a.corporate_contact_id,
                    });
                    // renderCategories(a);
                    onClose();
                    // renderClarifications(a);
                  }}
                />
              </Modalize>
            </>
          );
        }}
      </Formik>
    </>
  );
};

export default Planning;
