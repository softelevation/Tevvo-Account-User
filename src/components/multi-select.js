import React, {useEffect, useState} from 'react';
import {hp, wp} from './responsive';
import {Block} from './';
import {Divider, List, TextInput} from 'react-native-paper';
import {TextInputStyle} from 'src/assets/styles/flatlist';
import ImageComponent from './ImageComponent';
import {
  strictValidArrayWithLength,
  strictValidString,
} from 'src/utils/commonUtils';
import _ from 'lodash';
import Button from './Button';

const MultiSelectSearch = ({
  data,
  onPress,
  renderValue,
  label = 'Search Accounts',
}) => {
  const [state, setstate] = useState('');
  const [response, setResponse] = useState([]);
  const [select, setSelect] = useState([]);

  const renderdata = (value) => {
    const agentFiltered = select.filter((v) => v !== value);
    const isExist = select.filter((v) => v === value);
    if (isExist.length) {
      setSelect([...agentFiltered]);
    } else {
      setSelect([...agentFiltered, value]);
    }
  };

  useEffect(() => {
    setResponse(data);
  }, [data]);

  const contains = (displayTitle, query) => {
    const title = strictValidString(renderValue)
      ? displayTitle[renderValue]
      : displayTitle;
    const formattedTitle = title.toLowerCase();
    if (formattedTitle.indexOf(query) > -1) {
      return true;
    }
    return false;
  };

  const prepareServiceList = (text) => {
    const formattedQuery = text.toLowerCase();
    const filteredData = _.filter(data, (displayTitle) => {
      return contains(displayTitle, formattedQuery);
    });
    setResponse(filteredData);
    setstate(text);
  };

  return (
    <Block padding={[hp(2), 0]} flex={false}>
      <Block padding={[hp(2), wp(4)]}>
        <TextInput
          dense
          mode="outlined"
          value={state}
          onChangeText={(w) => prepareServiceList(w)}
          label={label}
          autoCapitalize="none"
          style={TextInputStyle.containerStyle}
          keyboardType="email-address"
          returnKeyType="next"
          right={
            <TextInput.Icon
              name={() => (
                <ImageComponent name={'search_icon'} height={30} width={30} />
              )}
            />
          }
        />
        <Block margin={[hp(2), 0, 0]}>
          {strictValidArrayWithLength(response) &&
            response.map((a) => {
              const selected = select.filter((ele) => ele === a) > -1;
              return (
                <>
                  <List.Item
                    style={
                      selected
                        ? {backgroundColor: 'transparent'}
                        : {backgroundColor: '#ceedfd'}
                    }
                    onPress={() => renderdata(a)}
                    title={
                      strictValidString(renderValue)
                        ? `${a[renderValue]} - ${a.description}`
                        : a
                    }
                  />
                  <Divider />
                </>
              );
            })}
        </Block>
        <Button onPress={() => onPress(select)} color="primary">
          Continue
        </Button>
      </Block>
    </Block>
  );
};

export default MultiSelectSearch;
