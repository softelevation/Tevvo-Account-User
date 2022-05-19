import React, {useState} from 'react';
import {Block, Button, hp, Text, wp} from '_elements';
import {Formik} from 'formik';
import * as yup from 'yup';
import {encrypted, strictValidString} from 'src/utils/commonUtils';
import {useNavigation} from '@react-navigation/native';
import {apiCall} from 'src/redux/store/api-client';
import {API_URL} from 'src/utils/config';
import {TextInput} from 'react-native-paper';
import {TextInputStyle} from 'src/assets/styles/flatlist';
import {onDisplayNotification} from 'src/utils/mobile-utils';

const ChangePassword = () => {
  const {goBack} = useNavigation();
  const [loading, setloading] = useState(false);

  const onSubmit = async (values) => {
    setloading(true);
    const data = {
      password: values.password,
    };
    const encryptData = encrypted(data);
    const res = await apiCall('POST', API_URL.UPDATE_PASSWORD_URL, encryptData);
    if (res.status === 1) {
      setloading(false);
      goBack();
      onDisplayNotification(res.message);
    }
  };

  const errorText = (err) => {
    return (
      <Text
        style={{alignSelf: 'flex-start'}}
        margin={[hp(1), wp(1), 0]}
        size={14}
        accent>
        {err}
      </Text>
    );
  };
  return (
    <Block primary defaultPadding>
      <Block flex={false} margin={[hp(3), 0, 0]} />
      <Formik
        initialValues={{
          confirm: '',
          password: '',
        }}
        onSubmit={onSubmit}
        validationSchema={yup.object().shape({
          password: yup.string().min(8).required('Password is Required'),
          confirm: yup
            .string()
            .when('password', {
              is: (val) => (val && val.length > 0 ? true : false),
              then: yup
                .string()
                .oneOf([yup.ref('password')], 'Password Must Match'),
            })
            .required('Confirm Password is Required'),
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
          <Block flex={1}>
            <Block padding={[0, wp(2)]}>
              <TextInput
                mode="outlined"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={() => setFieldTouched('password')}
                error={touched.password && errors.password}
                label={'New Password'}
                secureTextEntry
                style={TextInputStyle.containerStyle}
              />
              {touched.password &&
                strictValidString(errors.password) &&
                errorText(errors.password)}
              <Block flex={false} margin={[hp(0.5), 0]} />
              <TextInput
                mode="outlined"
                value={values.confirm}
                onChangeText={handleChange('confirm')}
                error={touched.confirm && errors.confirm}
                onBlur={() => setFieldTouched('confirm')}
                label={'Confirm Password'}
                secureTextEntry
                style={TextInputStyle.containerStyle}
              />
              {touched.confirm &&
                strictValidString(errors.confirm) &&
                errorText(errors.confirm)}

              <Block flex={false} margin={[hp(1), 0]} />
              <Button
                isLoading={loading}
                disabled={!dirty}
                onPress={handleSubmit}
                color="primary">
                Change Password
              </Button>
            </Block>
          </Block>
        )}
      </Formik>
    </Block>
  );
};

export default ChangePassword;
