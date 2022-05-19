/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState, useContext} from 'react';
import {Block} from '_elements';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {RouteNames} from '_routeName';
import {currentUnitRequest} from 'src/redux/unit/current/action';
import {useDispatch, useSelector} from 'react-redux';
import {AppState, RefreshControl} from 'react-native';
import DefaultSkeleton from 'src/components/defaultskeleton';
import {profileRequest} from 'src/redux/login/action';
import PlanningCards from 'src/common/planning-cards';
import {tripSavedFlush} from 'src/redux/unit/activity/action';
import {API_URL} from 'src/utils/config';
import {strictValidObjectWithKeys} from 'src/utils/commonUtils';
import {SocketContext} from '../../utils/socketContext';
import {onDisplayNotification} from 'src/utils/mobile-utils';
import BackgroundTimer from 'react-native-background-timer';

const CurrentUnit = () => {
  const navigation = useNavigation();
  const [refreshing, setrefreshing] = useState(false);
  const appState = useRef(AppState.currentState);
  const socketContext = useContext(SocketContext);
  console.log('socketContext: ', socketContext.connected, socketContext);
  const dispatch = useDispatch();
  const [loading, data, user] = useSelector((v) => [
    v.allTrips.trips.loading,
    v.allTrips.trips.data,
    v.auth.login.profile,
  ]);
  var interval;

  const apiCall = () => {
    dispatch(currentUnitRequest());
    dispatch(profileRequest());
    dispatch(tripSavedFlush());
  };
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        apiCall();
        BackgroundTimer.clearInterval(interval);
      } else {
        interval = BackgroundTimer.setInterval(() => {
          console.log('connection status ', socketContext.connected);
          socketContext.emit('online', {});
        }, 5000);

        console.log('socketContext: ', socketContext);
      }

      appState.current = nextAppState;
      // setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      apiCall();
    }, []),
  );

  const onRefresh = () => {
    setrefreshing(true);
    setTimeout(() => {
      setrefreshing(false);
    }, 2000);
    dispatch(currentUnitRequest());
  };
  const onPressCard = (i) => {
    navigation.navigate(RouteNames.REVIEW_TRIP_DETAILS_SCREEN, {
      data: i,
    });
  };

  useEffect(() => {
    if (strictValidObjectWithKeys(user)) {
      socketContext.on(`create_trip_${user.user_id}`, (msg) => {
        dispatch(currentUnitRequest());
      });
    }
    if (strictValidObjectWithKeys(user)) {
      socketContext.on(`transport_status_${user.user_id}`, (msg) => {
        dispatch(currentUnitRequest());
      });
    }
  }, []);

  return (
    <Block primary>
      {!refreshing && loading ? (
        <DefaultSkeleton data={[1, 2, 3, 4, 5]} />
      ) : (
        <PlanningCards
          onPress={(i) => onPressCard(i)}
          data={data}
          headerText={'Trips not found'}
          subtitleText={''}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </Block>
  );
};

export default CurrentUnit;
