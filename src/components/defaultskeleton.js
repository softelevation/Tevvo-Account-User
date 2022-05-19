import React from 'react';
import {FlatList} from 'react-native';
import Block from './Block';
import {hp, wp} from './responsive';
import SkeletonComponent from './skeleton';

const DefaultSkeleton = ({data = [1, 2]}) => {
  return (
    <FlatList
      data={data}
      renderItem={({item}) => {
        return (
          <Block margin={[hp(2), wp(4)]} flex={false}>
            <SkeletonComponent width={wp(90)} />
            <Block flex={false} margin={[hp(1.5), 0, 0]}>
              <Block row flex={false} center>
                <SkeletonComponent
                  style={{borderRadius: 30, width: 30, height: 30}}
                />
                <SkeletonComponent width={wp(20)} style={{marginLeft: wp(3)}} />
              </Block>
              <Block flex={false} margin={[0, 0, 0, wp(10)]}>
                <SkeletonComponent width={wp(80)} style={{marginTop: hp(1)}} />
                <SkeletonComponent
                  width={wp(80)}
                  style={{marginTop: hp(1.5)}}
                />
                <SkeletonComponent width={wp(80)} style={{marginTop: hp(1)}} />
                <SkeletonComponent
                  width={wp(80)}
                  style={{marginTop: hp(1.5)}}
                />
              </Block>
            </Block>
            <Block flex={false} margin={[hp(1), 0, 0]}>
              <Block row flex={false} center>
                <SkeletonComponent
                  style={{borderRadius: 30, width: 30, height: 30}}
                />
                <SkeletonComponent width={wp(20)} style={{marginLeft: wp(3)}} />
              </Block>
              <Block flex={false} margin={[0, 0, 0, wp(10)]}>
                <SkeletonComponent width={wp(80)} style={{marginTop: hp(1)}} />
              </Block>
            </Block>
            <Block flex={false} margin={[hp(1), 0, 0]}>
              <Block row flex={false} center>
                <SkeletonComponent
                  style={{borderRadius: 30, width: 30, height: 30}}
                />
                <SkeletonComponent width={wp(20)} style={{marginLeft: wp(3)}} />
              </Block>
              <Block flex={false} margin={[0, 0, 0, wp(10)]}>
                <SkeletonComponent width={wp(80)} style={{marginTop: hp(1)}} />
              </Block>
            </Block>
            <Block
              margin={[hp(3), 0, 0]}
              borderColor={'#C5C5C7'}
              borderWidth={[0, 0, 1, 0]}
            />
          </Block>
        );
      }}
    />
  );
};

export default DefaultSkeleton;
