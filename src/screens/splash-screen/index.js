/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Block, ImageComponent, wp} from '_elements';
import {RouteNames} from '_routeName';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {strictValidString} from 'src/utils/commonUtils';
import {authSuccess} from 'src/redux/login/action';
import {useDispatch} from 'react-redux';

const SplashScreen = () => {
  const navigation = useNavigation();
  const animateValue = useSharedValue(0);
  const dispatch = useDispatch();

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      left: Number(animateValue.value),
    };
  });

  useEffect(() => {
    animateValue.value = withTiming(250, {duration: 3000});
  }, []);

  const callAuthApi = async () => {
    const token = await AsyncStorage.getItem('token');
    const user = await AsyncStorage.getItem('user');
    const parsedUser = JSON.parse(user);
    if (strictValidString(token)) {
      dispatch(authSuccess(parsedUser));
      setTimeout(() => {
        navigation.reset({
          routes: [{name: RouteNames.HOME_SCREEN}],
        });
      }, 3000);
    } else {
      setTimeout(() => {
        navigation.reset({
          routes: [{name: RouteNames.LOGIN_SCREEN}],
        });
      }, 3000);
    }
  };
  useEffect(() => {
    callAuthApi();
  }, []);

  return (
    <Block secondary>
      <Block center bottom>
        <ImageComponent name="logo" height={95} width={320} />
      </Block>
      <Block middle flex={1}>
        <Animated.View style={[styles.ambulance_icon, reanimatedStyle]}>
          <ImageComponent
            color="#fff"
            name="ambulance"
            height={32}
            width={32}
          />
        </Animated.View>
        <Block flex={false} center middle>
          <ImageComponent
            color="#fff"
            name="ambulance_line"
            height={2}
            width={285}
          />
        </Block>
      </Block>
    </Block>
  );
};
const styles = StyleSheet.create({
  ambulance_icon: {zIndex: 99, marginBottom: -3, marginLeft: wp(14)},
});
export default SplashScreen;
