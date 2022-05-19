/* eslint-disable react-hooks/exhaustive-deps */
import {CommonActions, useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  Block,
  Button,
  CustomButton,
  hp,
  ImageComponent,
  Text,
  wp,
} from '_elements';
import {RouteNames} from '_routeName';
import {strictValidObjectWithKeys} from '../../utils/commonUtils';
import {API_URL} from '../../utils/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProgressiveImage from 'src/components/Image';
import {images} from 'src/assets';
import {ImageStyle} from 'src/assets/styles/flatlist';
import {resetStore} from 'src/redux/resetAction';
import {profileRequest} from 'src/redux/login/action';
import SkeletonComponent from 'src/components/skeleton';
const Profile = () => {
  const navigation = useNavigation();
  const profile = useSelector((state) => state.auth.login.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(profileRequest());
  }, []);

  const _renderItem = (name, route) => {
    return (
      <CustomButton
        onPress={() => navigation.navigate(route)}
        flex={false}
        row
        space="between"
        padding={[hp(1)]}
        borderWidth={1}
        borderColorDeafult>
        <Text semibold size={16}>
          {name}
        </Text>
        <ImageComponent name="arrow_right_2_icon" height={20} width={20} />
      </CustomButton>
    );
  };

  const logout = async () => {
    await AsyncStorage.clear();
    dispatch(resetStore());
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: RouteNames.LOGIN_SCREEN}],
      }),
    );
  };
  return (
    <Block white>
      <ScrollView showsVerticalScrollIndicator={false}>
        {strictValidObjectWithKeys(profile) ? (
          <>
            <Block margin={[hp(1), 0]} flex={false} center>
              <ProgressiveImage
                defaultImageSource={images.default_profile_icon}
                source={{uri: `${API_URL.BASE_URL}/${profile.profile_image}`}}
                style={ImageStyle.profileImage}
              />

              <Text transform="capitalize" semibold margin={[hp(1), 0]}>
                {profile.first_name} {profile.last_name}
              </Text>
              <Text size={16} grey>
                {'Reservation'}
              </Text>
            </Block>
            <Block
              flex={false}
              row
              space={'between'}
              margin={[hp(1), 0]}
              padding={[0, wp(3)]}
              center>
              <Text size={16}>{'Email'}</Text>
              <Text grey size={16}>
                {profile.email_id}
              </Text>
            </Block>
            <Block
              flex={false}
              row
              space={'between'}
              margin={[hp(1), 0]}
              padding={[0, wp(3)]}
              center>
              <Text size={16}>{'Phone No'}</Text>
              <Text grey size={16}>
                {profile.phone_number || 'N/A'}
              </Text>
            </Block>
            <Block
              flex={false}
              row
              space={'between'}
              margin={[hp(1), 0]}
              padding={[0, wp(3)]}>
              <Text size={16}>{'Address'}</Text>
              <Text right style={{width: wp(70)}} grey size={16}>
                {profile.address || 'N/A'}
              </Text>
            </Block>
            <Block
              flex={false}
              row
              space={'between'}
              margin={[hp(1), 0]}
              padding={[0, wp(3)]}>
              <Text size={16}>{'App Version'}</Text>
              <Text right style={{width: wp(70)}} grey size={16}>
                {API_URL.appVersion}
              </Text>
            </Block>
          </>
        ) : (
          <>
            <Block margin={[hp(1), 0]} flex={false} center>
              <SkeletonComponent style={ImageStyle.profileImage} />
              <Block margin={[hp(1), 0]}>
                <SkeletonComponent style={{width: wp(45)}} />
              </Block>
              <Block>
                <SkeletonComponent style={{width: wp(45)}} />
              </Block>
            </Block>
            <Block
              flex={false}
              row
              space={'between'}
              margin={[hp(1), 0]}
              padding={[0, wp(3)]}
              center>
              <SkeletonComponent style={{width: wp(45)}} />
              <SkeletonComponent style={{width: wp(45)}} />
            </Block>
            <Block
              flex={false}
              row
              space={'between'}
              margin={[hp(1), 0]}
              padding={[0, wp(3)]}
              center>
              <SkeletonComponent style={{width: wp(45)}} />
              <SkeletonComponent style={{width: wp(45)}} />
            </Block>
            <Block
              flex={false}
              row
              space={'between'}
              margin={[hp(1), 0]}
              padding={[0, wp(3)]}
              center>
              <SkeletonComponent style={{width: wp(45)}} />
              <SkeletonComponent style={{width: wp(45)}} />
            </Block>
          </>
        )}
        <Block flex={false} padding={[0, wp(3)]} margin={[hp(5), 0, 0]}>
          <Block
            flex={false}
            style={{
              paddingBottom: hp(10),
              paddingTop: hp(2),
            }}
          />
          <Button
            onPress={() =>
              navigation.navigate(RouteNames.CHANGE_PASSWORD_SCREEN)
            }
            color={'secondary'}>
            Change Password
          </Button>
          <Button
            onPress={() => {
              logout();
            }}
            icon={'profile_selected'}
            iconWithText
            color={'secondary'}>
            Log Out
          </Button>
        </Block>
      </ScrollView>
    </Block>
  );
};

export default Profile;
