import React from 'react';
import {FlatList} from 'react-native';
import {Block, CustomButton, hp, ImageComponent, Text, wp} from '_elements';
import PropTypes from 'prop-types';
import {light} from 'src/components/theme/colors';
import {formatDateTime, strictValidObjectWithKeys} from 'src/utils/commonUtils';
import EmptyUnit from '../empty-unit';
import {flatlistStyle} from 'src/assets/styles/flatlist';
import {transportStatus} from '_constants';
const PlanningCards = ({
  data,
  refreshControl,
  subtitleText,
  headerText,
  onPress,
  disabled = false,
}) => {
  const renderData = (title, subtitle) => {
    return (
      <Block margin={[hp(1.5), 0, 0]} flex={false} row space="between">
        <Text style={{width: wp(24)}} grey size={14}>
          {title}
        </Text>
        <Text style={{width: wp(67)}} right semibold size={14}>
          {subtitle || 'N/A'}
        </Text>
      </Block>
    );
  };
  const _renderItem = ({item}) => {
    return (
      <CustomButton
        disabled={disabled}
        onPress={() => onPress(item)}
        activeOpacity={0.9}
        flex={false}>
        {strictValidObjectWithKeys(item) && (
          <Block margin={[hp(2), 0, 0]} flex={false}>
            <Block flex={false} row center space={'between'}>
              <Block padding={[0, 0, hp(1), 0]} flex={false} row center>
                <ImageComponent
                  name={
                    strictValidObjectWithKeys(item.corporate_account) &&
                    item.status === 'requested'
                      ? 'pending_unit'
                      : 'active_unit'
                  }
                  height={26}
                  width={26}
                />
                <Text semibold size={16} margin={[0, 0, 0, wp(3)]}>
                  <Text semibold size={16}>
                    {strictValidObjectWithKeys(item.corporate_account) &&
                      transportStatus(item.status)}{' '}
                  </Text>
                  - {item.leg_id}
                </Text>
              </Block>
              <ImageComponent
                name="arrow_forward_green"
                height={24}
                width={24}
                color={light.secondary}
              />
            </Block>
            <Block
              margin={[hp(1), 0, hp(1.5)]}
              borderColor={'#C5C5C7'}
              borderWidth={[0, 0, 1, 0]}
            />
            {renderData(
              'Account',
              strictValidObjectWithKeys(item.corporate_account) &&
                item.corporate_account.name,
            )}
            {renderData('Pickup Time', formatDateTime(item.pick_up_date_time))}
            {renderData('E. End Time', formatDateTime(item.estimated_end_time))}
            {renderData(
              'Patient',
              strictValidObjectWithKeys(item.base_patient) &&
                `${item.base_patient.last_name} ${item.base_patient.first_name}`,
            )}
            {renderData('PU', item.trip_pickup_location)}
            {renderData(
              'DO',
              strictValidObjectWithKeys(item.base_patient) &&
                item.trip_dropoff_location,
            )}
            <Block
              margin={[hp(2), 0, 0]}
              borderColor={light.secondary}
              borderWidth={[0, 0, 1, 0]}
            />
          </Block>
        )}
      </CustomButton>
    );
  };
  return (
    <Block defaultPadding flex={1}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={_renderItem}
        contentContainerStyle={flatlistStyle.containerStyle}
        refreshControl={refreshControl}
        ListEmptyComponent={
          <EmptyUnit header={headerText} subtitle={subtitleText} />
        }
      />
    </Block>
  );
};
PlanningCards.defaultProps = {
  data: [],
};

PlanningCards.propTypes = {
  data: PropTypes.array,
};

export default PlanningCards;
