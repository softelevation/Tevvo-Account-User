import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiCall} from '../redux/store/api-client';
import {StackActions} from '@react-navigation/native';

//Post Request
//Post Request
export async function post(api, data) {
  return apiCall('POST', api, data)
    .then((res) => {
      if (res.data && res.data.message === 'Not Authorized') {
        checkUserNotAuthorised({...res, status: 401});
      }
      return res.data;
    })
    .catch((err) => (err && err.response ? err.response : err));
}

//Get Request
export async function get(api, data) {
  return apiCall('GET', api, data)
    .then((res) => {
      if (res.data && res.data.message === 'Not Authorized') {
        checkUserNotAuthorised({...res, status: 401});
      } else if (res.status === 200 && !res.data.status) {
        return {
          ...res.data,
          status: 'success',
        };
      }
      return res.data;
    })
    .catch((err) => err);
}
// export async function getWebView(api, data) {
//   return AxiosInstance.get(`${config.API_URL}${api}`)
//     .then((res) => {
//       if (res.status == 200 && !res.data.status) {
//         return {
//           data: res.data,
//           status: 'success',
//         };
//       }
//       return res.data;
//     })
//     .catch((err) => err);
// }
//Put Request
export async function put(api, data) {
  return apiCall('PUT', api, data)
    .then((res) => res.data)
    .catch((err) => err.response);
}

//Delete Request
export async function deleteRequest(api, data) {
  return apiCall('DELETE', api, data)
    .then((res) => res.data)
    .catch((err) => err.response);
}

//Get All Request
export async function getAll(data) {
  return Promise.all(data)
    .then((values) => {
      return values;
    })
    .catch((err) => {
      return err;
    });
}

// Get Token
export async function getAccessTokenFromCookies() {
  return new Promise(async (resolve, reject) => {
    let token = await AsyncStorage.getItem('token');
    if (token) {
      resolve(token);
    } else {
      reject(true);
    }
  });
}
// Get Language
// Get Language
const checkUserNotAuthorised = (res) => {
  if (res.data && res.data.message === 'Not Authorized') {
    // dispatch(logoutRequest());
    setTimeout(() => {
      StackActions.replace('Auth', {});
    });
  }
};
