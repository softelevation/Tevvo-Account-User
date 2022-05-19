import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from 'src/utils/config';
import {defaultRoot} from 'src/routes/NavigationService';
import {Alert} from 'react-native';
import TimeZone from 'react-native-timezone';

const client = axios.create({
  baseURL: API_URL.BASE_URL,
  headers: {
    Accept: 'application/json',
    // Authorization: 'Bearer',
  },
  timeout: 100000,
});
/**
 * Request Wrapper with default success/error actions
 */
client.interceptors.request.use(
  async (config) => {
    if (!config.headers.Authorization) {
      const token = await AsyncStorage.getItem('token');
      const timeZone = await TimeZone.getTimeZone().then((zone) => zone);
      config.headers.timezone = timeZone;
      if (token) {
        config.headers.authorization = `${token}`;
      }
    }
    return config;
  },
  (error) => console.log(error),
);

export const apiCall = function (method, route, body = null, token = null) {
  const logout = async () => {
    await AsyncStorage.clear();
    defaultRoot();
  };

  const onSuccess = function (response) {
    console.log('Request Successful!', response);
    return response.data;
  };

  const onSubmit = () => {
    Alert.alert('Error', 'Oops, Something went wrong Please Login again', [
      {
        text: 'Ok',
        onPress: () => {
          logout();
        },
      },
    ]);
  };
  const onError = function (error) {
    console.log('Request Failed:', error.config);

    if (error.response) {
      // Request was made but server responded with something
      // other than 2xx
      if (error.response.status === 401) {
        onSubmit();
      }
      console.log('Data:', error.response.data);
    } else {
      // Something else happened while setting up the request
      // triggered the error
      console.log('Error Message:', error.message);
    }
    const data = error.response.status === 401 ? '' : error.message;

    return Promise.reject(error.response || data);
  };

  return client({
    method,
    url: route,
    data: body,
  })
    .then(onSuccess)
    .catch(onError);
};
