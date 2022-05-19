/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, FlatList} from 'react-native';
import ResponsiveImage from 'react-native-responsive-image';
import {images} from 'src/assets';
import {hp} from './responsive';
import {light} from './theme/colors';

const Dots = ({Active}) => {
  const Selected = `${Active}`;
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        height: hp(5),
      }}>
      <FlatList
        horizontal
        data={['1', '2', '3', '4']}
        keyExtractor={(item) => item}
        renderItem={({item}) => {
          return (
            <View>
              <ResponsiveImage
                source={images.dot}
                initHeight="50"
                initWidth="15"
                style={{
                  tintColor: item === Selected ? light.secondary : '#00000052',
                }}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

export default React.memo(Dots);
