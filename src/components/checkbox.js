import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
} from 'react-native';
import ResponsiveImage from 'react-native-responsive-image';
import {images} from '../assets';

class Checkbox extends PureComponent {
  state = {
    checked: this.props.checked,
  };

  static Container =
    Platform.OS === 'ios' ? TouchableOpacity : TouchableOpacity;

  static defaultProps = {
    custom: false,
    label: 'Label',
    customLabel: null,
    numberOfLabelLines: 1,
    labelBefore: false,
    checked: false,
    checkedImage: images.checkbox_active_icon,
    uncheckedImage: images.checkbox_inactive_icon,
    checkedComponent: null,
    uncheckedComponent: null,
    noFeedback: false,
    disabled: false,
  };

  static propTypes = {
    checkedComponent: PropTypes.element,
    uncheckedComponent: PropTypes.element,
    checked: PropTypes.bool,
    checkboxStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    containerStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    label: PropTypes.string,
    customLabel: PropTypes.element,
    labelBefore: PropTypes.bool,
    labelStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    numberOfLabelLines: PropTypes.number,
    onChange: PropTypes.func,
    noFeedback: PropTypes.bool,
    disabled: PropTypes.bool,
  };

  componentDidUpdate(prevProps, prevState) {
    this.setState({checked: this.props.checked});
  }

  render() {
    const {checked} = this.state;
    const {
      labelBefore,
      containerStyle,
      checkedComponent,
      uncheckedComponent,
      checkedImage,
      uncheckedImage,
      checkboxStyle,
      labelStyle,
      numberOfLabelLines,
      label,
      noFeedback,
      customLabel,
      disabled,
    } = this.props;

    const Container = noFeedback
      ? TouchableWithoutFeedback
      : Checkbox.Container;

    return (
      <Container
        style={[styles.container, containerStyle]}
        onPress={this.handleToggleChecked}
        disabled={disabled}>
        <View style={[styles.container, containerStyle]}>
          {labelBefore ? (
            <Label
              labelStyle={labelStyle}
              numberOfLabelLines={numberOfLabelLines}
              label={label}
              customLabel={customLabel}
            />
          ) : null}

          {checkedComponent && uncheckedComponent ? (
            checked ? (
              checkedComponent
            ) : (
              uncheckedComponent
            )
          ) : (
            <ResponsiveImage
              initHeight={22}
              initWidth={22}
              style={[checkboxStyle]}
              source={checked ? checkedImage : uncheckedImage}
            />
          )}

          {!labelBefore && (
            <Label
              labelStyle={labelStyle}
              numberOfLabelLines={numberOfLabelLines}
              label={label}
              customLabel={customLabel}
            />
          )}
        </View>
      </Container>
    );
  }

  handleToggleChecked = () => {
    const {label} = this.props;
    const checked = !this.state.checked;

    this.setState({checked});
    this.props.onChange && this.props.onChange({label, checked});
  };
}

const Label = ({labelStyle, numberOfLabelLines, label, customLabel}) => {
  return !customLabel ? (
    <View style={styles.labelContainer}>
      <Text
        style={[styles.label, labelStyle]}
        numberOfLines={numberOfLabelLines}>
        {label}
      </Text>
    </View>
  ) : (
    customLabel
  );
};

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 23,
    height: 23,
  },
  labelContainer: {
    marginLeft: 10,
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    color: '#000',
  },
});

export default Checkbox;
