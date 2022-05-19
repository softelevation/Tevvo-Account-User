import {CommonActions} from '@react-navigation/native';
import * as React from 'react';
import {RouteNames} from '_routeName';

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export function goBack() {
  navigationRef.current?.goBack();
}

export function defaultRoot() {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [{name: RouteNames.LOGIN_SCREEN}],
    }),
  );
}
