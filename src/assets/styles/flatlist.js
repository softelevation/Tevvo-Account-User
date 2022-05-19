import {StyleSheet} from 'react-native';
import {hp} from '_elements';

export const flatlistStyle = StyleSheet.create({
  containerStyle: {
    flexGrow: 1,
  },
});
export const TextInputStyle = StyleSheet.create({
  containerStyle: {
    fontSize: 15,
    backgroundColor: '#fff',
  },
  containerStyleWithMargin: {
    fontSize: 15,
    backgroundColor: '#fff',
    marginTop: hp(0.5),
  },
});
export const ImageStyle = StyleSheet.create({
  profileImage: {height: 150, width: 150, borderRadius: 150},
});
export const modalStyle = StyleSheet.create({
  modal: {
    backgroundColor: '#fff',
    flex: 1,
  },
  overlay: {backgroundColor: 'transparent'},
});
