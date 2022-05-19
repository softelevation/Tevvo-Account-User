/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Block, hp, Text, Button} from '_elements';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {TextInput} from 'react-native-paper';
import {modalStyle, TextInputStyle} from 'src/assets/styles/flatlist';
import {FieldArray, Formik} from 'formik';
import * as yup from 'yup';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {RouteNames} from '_routeName';
import Checkbox from 'src/components/checkbox';
import {Modalize} from 'react-native-modalize';
import {light} from 'src/components/theme/colors';
import MultiSelectSearch from 'src/components/multi-select';
import {capabilityRequest} from 'src/redux/capability/action';
import {
  strictValidArray,
  strictValidArrayWithLength,
  strictValidObjectWithKeys,
  strictValidString,
} from 'src/utils/commonUtils';
import Dots from 'src/components/dots';
import {TouchableOpacity} from 'react-native';

const Capabilities = () => {
  const dispatch = useDispatch();
  const {navigate} = useNavigation();
  const modalizeRef = useRef();
  const [data, tripData] = useSelector((v) => [
    v.capability.data,
    v.allTrips.savedTrip.data,
  ]);
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState('');
  const [categoriesid, setCategoriesId] = useState([]);
  const [clarification, setClarification] = useState([]);
  const {params} = useRoute();
  const currentApiCall = () => {
    dispatch(capabilityRequest());
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
    navigate(RouteNames.TRIP_DETAILS_SCREEN, {
      data: {
        ...params.data,
        ...values,
      },
    });
  };

  const onOpen = () => {
    modalizeRef.current?.open();
  };
  const onClose = () => {
    modalizeRef.current?.close();
  };

  const renderCategories = (e) => {
    const arrayText = [];
    const arrayId = [];
    e.map((c) => {
      arrayText.push(c.name);
    });

    e.map((c) => {
      arrayId.push(c.capability_id);
    });
    const name = strictValidArrayWithLength(arrayText) && arrayText.toString();
    setCategories(name);
    setCategoriesId(arrayId);
  };

  const renderClarifications = (d) => {
    const arraVal = [];
    d.map((a) => {
      a.clarification.map((a) => arraVal.push(a));
    });
    setClarification(arraVal);
  };

  const getNameFromArray = (capability_id) => {
    if (strictValidObjectWithKeys(tripData)) {
      const arraVal = [];
      const arrayText = [];
      strictValidArrayWithLength(data) &&
        data.map((c) => {
          capability_id.map((a) => {
            if (c.capability_id === a) {
              arrayText.push(c.name);
            }
          });
        });
      strictValidArrayWithLength(data) &&
        data.map((c) => {
          capability_id.map((a) => {
            if (c.capability_id === a) {
              c.clarification.map((a) => arraVal.push(a));
            }
          });
        });

      const name =
        strictValidArrayWithLength(arrayText) && arrayText.toString();
      setCategories(name);
      setClarification(arraVal);
    }
  };

  useEffect(() => {
    if (strictValidObjectWithKeys(tripData)) {
      if (strictValidObjectWithKeys(tripData.base_patient)) {
        setDescription(tripData.base_patient.description);
        setCategoriesId(tripData.capability_id);
        // setCategories()
        getNameFromArray(tripData.capability_id);
      }
    }
  }, [tripData, data]);

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          description: strictValidString(description) ? description : '',
          capability: strictValidString(categories) ? categories : '',
          capability_id: strictValidArray(categoriesid) ? categoriesid : '',
          question_id: strictValidObjectWithKeys(tripData)
            ? tripData.question_id
            : [],
        }}
        onSubmit={onSubmit}
        validationSchema={yup.object().shape({
          capability: yup.string().min(1).required(),
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
                {renderSection('Special Instructions')}
                <Block flex={false}>
                  <TextInput
                    mode="outlined"
                    value={values.description}
                    onChangeText={(e) => {
                      setFieldValue('description', e);
                      setDescription(e);
                    }}
                    onBlur={() => setFieldTouched('description')}
                    placeholder={'Special Instructions (Optional)'}
                    // label={'Special Instructions (Optional)'}
                    autoCapitalize="none"
                    // style={TextInputStyle.containerStyleWithMargin}
                    style={[
                      TextInputStyle.containerStyleWithMargin,
                      {height: hp(15)},
                    ]}
                    multiline={true}
                    numberOfLines={4}
                    textAlignVertical="top"
                  />
                </Block>
                {renderSection('Transport Mode')}
                <Block flex={false}>
                  <TouchableOpacity onPress={onOpen}>
                    <TextInput
                      mode="outlined"
                      value={values.capability}
                      onChangeText={handleChange('capability')}
                      onBlur={() => setFieldTouched('capability')}
                      label={'Transport Mode *'}
                      autoCapitalize="none"
                      style={TextInputStyle.containerStyleWithMargin}
                      keyboardType="email-address"
                      returnKeyType="next"
                      editable={false}
                      onTouchStart={onOpen}
                      error={touched.capability && errors.capability}
                    />
                  </TouchableOpacity>
                  <FieldArray
                    name="question_id"
                    render={(arrayHelpers) => (
                      <>
                        {clarification.map((item) => {
                          return (
                            <>
                              <Block
                                transparent
                                margin={[hp(1), 0]}
                                flex={false}>
                                <Checkbox
                                  checkboxStyle={{tintColor: light.secondary}}
                                  // labelStyle={labelStyle}
                                  checked={
                                    strictValidArrayWithLength(
                                      values.question_id,
                                    ) &&
                                    values.question_id.indexOf(
                                      item.question_id,
                                    ) > -1
                                  }
                                  onChange={(e) => {
                                    if (e.checked) {
                                      arrayHelpers.push(item.question_id);
                                    } else {
                                      const idx = values.question_id.indexOf(
                                        item.question_id,
                                      );
                                      arrayHelpers.remove(idx);
                                    }
                                  }}
                                  label={item.question}
                                />
                              </Block>
                            </>
                          );
                        })}
                      </>
                    )}
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
                <Dots Active={3} />
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
              <MultiSelectSearch
                label="Search Transport Mode"
                data={data}
                renderValue="name"
                // selectedState={tripData}
                onPress={(a) => {
                  renderCategories(a);
                  onClose();
                  renderClarifications(a);
                }}
              />
            </Modalize>
          </>
        )}
      </Formik>
    </>
  );
};

export default Capabilities;
