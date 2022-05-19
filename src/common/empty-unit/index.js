import React from 'react';
import {Block, hp, ImageComponent, Text} from '_elements';

const EmptyUnit = ({header, subtitle}) => {
  return (
    <Block margin={[hp(10), 0]} flex={false} center={true}>
      <ImageComponent name="logoW" height={95} width={320} />
      <Block center flex={false} margin={[hp(12), 0]}>
        <Text size={16} gutterBottom={true}>
          {header}
        </Text>
        <Text size={16}>{subtitle}</Text>
      </Block>
    </Block>
  );
};

EmptyUnit.defaultProps = {
  header: 'No Unit Active or Pending',
  subtitle: 'Check the Planned Units Tab',
};

export default EmptyUnit;
