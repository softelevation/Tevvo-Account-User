import React, {useEffect, useRef, useState} from 'react';
import {Block, Button, hp, ImageComponent, Text, wp} from '_elements';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {authRequest} from 'src/redux/login/action';
import {encrypted, strictValidString} from 'src/utils/commonUtils';
import {TextInput} from 'react-native-paper';
import {flatlistStyle, TextInputStyle} from 'src/assets/styles/flatlist';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {light} from 'src/components/theme/colors';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(true);
  const [loading] = useSelector((v) => [v.auth.login.loading]);
  const emailRef = useRef();
  const passwordRef = useRef();
  const onSubmit = (values) => {
    const {email, password} = values;
    const data = {
      email: email,
      password: password,
    };
    const encryptData = encrypted(data);
    dispatch(authRequest(encryptData));
  };

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const errorText = (err) => {
    return (
      <Text margin={[hp(1), wp(1), 0]} size={14} accent>
        {err}
      </Text>
    );
  };
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={flatlistStyle.containerStyle}
      bounces={false}>
      <Block safearea primary>
        <Block center middle flex={2}>
          <ImageComponent name="logoW" height={95} width={320} />
        </Block>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={onSubmit}
          validationSchema={yup.object().shape({
            email: yup
              .string()
              .email('Must be a valid email address')
              .required('Email is required'),
            password: yup.string().min(8).required('Password is required'),
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
              <Block padding={[0, wp(4)]}>
                <TextInput
                  mode="outlined"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={() => setFieldTouched('email')}
                  error={touched.email && errors.email}
                  label={'Email'}
                  autoCapitalize="none"
                  style={TextInputStyle.containerStyle}
                  ref={emailRef}
                  keyboardType="email-address"
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    passwordRef.current?.focus();
                  }}
                />
                {touched.email &&
                  strictValidString(errors.email) &&
                  errorText(errors.email)}
                <Block flex={false} margin={[hp(1), 0]} />
                <TextInput
                  mode="outlined"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={() => setFieldTouched('password')}
                  error={touched.password && errors.password}
                  label={'Password'}
                  style={TextInputStyle.containerStyle}
                  secureTextEntry={showPassword}
                  autoCapitalize="none"
                  ref={passwordRef}
                  returnKeyType="done"
                  right={
                    <TextInput.Icon
                      name={() => (
                        <ImageComponent
                          name={!showPassword ? 'eye' : 'eye_off'}
                          color={light.secondary}
                          height={15}
                          width={20}
                        />
                      )}
                      onPress={() => {
                        setShowPassword(!showPassword);
                      }}
                    />
                  }
                  onSubmitEditing={() => {
                    handleSubmit();
                  }}
                />

                {touched.password &&
                  strictValidString(errors.password) &&
                  errorText(errors.password)}
                <Block flex={false} margin={[hp(1), 0]} />
                <Button
                  isLoading={loading}
                  disabled={!isValid || !dirty}
                  onPress={handleSubmit}
                  color="primary">
                  Login
                </Button>
              </Block>
              <Text semibold size={10} center margin={[hp(2), 0, 0, 0]}>
                GMTCare{' '}
                <Text semibold size={8}>
                  © COPYRIGHT 2022 | ALL RIGHTS RESERVED
                </Text>
              </Text>
            </Block>
          )}
        </Formik>
      </Block>
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;
