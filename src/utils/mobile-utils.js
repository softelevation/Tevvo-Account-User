import {Platform, Linking} from 'react-native';
import {showMessage} from 'react-native-flash-message';

export const onDisplayNotification = async (message, description) => {
  showMessage({
    message: message,
    description: description,
    type: 'default',
  });
};

export const openMaps = (lat, lng, title) => {
  const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
  const latLng = `${lat},${lng}`;
  const label = title;
  const url = Platform.select({
    ios: `${scheme}${label}@${latLng}`,
    android: `${scheme}${latLng}(${label})`,
  });

  Linking.openURL(url);
};
