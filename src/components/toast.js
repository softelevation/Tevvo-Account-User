import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '_elements';
import {wp, hp} from './responsive';
import {hideMessage} from 'react-native-flash-message';
import Block from './Block';

const FlashMessage = (data) => {
  const message = data.data.message;
  return (
    <View style={[styles.FlashMessageStyle]}>
      <Block shadow style={styles.ImageContainer}>
        <Text style={{width: wp(65)}} white>
          {message.message}
        </Text>
        <Text semibold onPress={() => hideMessage()} white>
          Ok
        </Text>
      </Block>
    </View>
  );
};

const styles = StyleSheet.create({
  FlashMessageStyle: {
    padding: hp(2),
    marginBottom: hp(4),
    width: wp(95),
    alignSelf: 'center',
    backgroundColor: '#1C2A39',
    borderRadius: 5,
  },
  ImageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(3),
  },
});
export default FlashMessage;
