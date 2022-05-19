/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {Block} from '_elements';
import {useFocusEffect} from '@react-navigation/native';
import {encrypted, strictValidObjectWithKeys} from 'src/utils/commonUtils';
import {STATUS_URL} from 'src/utils/config';
import {transportRequest} from 'src/redux/transport/action';
import {useDispatch, useSelector} from 'react-redux';
import {AppState, RefreshControl} from 'react-native';
import io from 'socket.io-client';
import {API_URL} from 'src/utils/config';
import DefaultSkeleton from 'src/components/defaultskeleton';
import {profileRequest} from 'src/redux/login/action';
import PlanningCards from 'src/common/planning-cards';
import {tripSavedFlush} from 'src/redux/unit/activity/action';

const CurrentUnit = () => {
  const [refreshing, setrefreshing] = useState(false);
  const dispatch = useDispatch();
  const [loading, data, user] = useSelector((v) => [
    v.transport.transport.loading,
    v.transport.transport.data,
    v.auth.login.profile,
  ]);
  const appState = useRef(AppState.currentState);
  useEffect(() => {
    dispatch(profileRequest());
    dispatch(tripSavedFlush());
  }, []);

  useEffect(() => {
    const socket = io(API_URL.BASE_URL);
    const statusData = {status: STATUS_URL.Active_Status};
    const encryptedData = encrypted(statusData);
    if (strictValidObjectWithKeys(user) && user.driver_id) {
      socket.on(`driver_id_${user.driver_id}`, (msg) => {
        dispatch(transportRequest(encryptedData));
      });
    }
  }, []);

  const callApi = () => {
    const statusData = {status: STATUS_URL.Active_Status};
    const encryptedData = encrypted(statusData);
    dispatch(transportRequest(encryptedData));
  };

  useFocusEffect(
    React.useCallback(() => {
      callApi();
    }, []),
  );

  const onRefresh = () => {
    const statusData = {status: STATUS_URL.Active_Status};
    const encryptedData = encrypted(statusData);
    setrefreshing(true);
    setTimeout(() => {
      setrefreshing(false);
    }, 2000);
    dispatch(transportRequest(encryptedData));
  };

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        callApi();
      }

      appState.current = nextAppState;
      // setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <Block primary>
      {!refreshing && loading ? (
        <DefaultSkeleton data={[1, 2, 3, 4, 5]} />
      ) : (
        <PlanningCards
          disabled
          data={data}
          headerText={'No Completed Trips'}
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
