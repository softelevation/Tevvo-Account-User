import {hp} from '_elements';

export const floatingStyle = {
  inputStyle: {
    color: '#1C2A39',
    paddingHorizontal: 6,
    paddingTop: 5,
    minHeight: 28,
    paddingVertical: 0,
    flex: 1,
    zIndex: 10,
  },
  containerStyle: {
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#C5C5C7',
    flexDirection: 'row',
    color: '#1C2A39',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 10,
    alignContent: 'center',
    justifyContent: 'center',
  },
  customLabelStyle: {
    fontSizeFocused: 10,
    fontSizeBlurred: 14,
    colorFocused: '#1C2A39',
    colorBlurred: '#1C2A39',
  },
  multilineInputStyle: {
    color: '#1C2A39',
    paddingHorizontal: 6,
    paddingTop: 10,
    minHeight: 28,
    paddingVertical: 0,
    flex: 1,
    zIndex: 10,
    height: hp(10),
  },
};
