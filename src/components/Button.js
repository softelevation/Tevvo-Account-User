import React from 'react';
import {StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import Block from './Block';
import ImageComponent from './ImageComponent';
import {wp} from './responsive';
import Text from './Text';
import {light} from './theme/colors';
import {t1} from './theme/fontsize';

const componentStyles = () => {
  return StyleSheet.create({
    button: {
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: t1,
      borderWidth: 1,
    },
    shadow: {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 10,
    },
    disabledButton: {
      backgroundColor: '#00000052',
      borderWidth: 0,
    },
    circular: {
      borderRadius: 20,
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center',
      width: 40,
      height: 40,
    },
    accent: {
      backgroundColor: light.warning,
      borderColor: light.warning,
      paddingVertical: t1 * 1.5,
    },
    link: {
      backgroundColor: '#006CFF',
      borderColor: '#006CFF',
      paddingVertical: t1 * 1.5,
    },
    primary: {
      backgroundColor: light.secondary,
      paddingVertical: t1 * 1.7,
      borderColor: '#fff',
    },
    secondary: {
      backgroundColor: 'transparent',
      borderColor: light.secondary,
      paddingVertical: t1 * 1.5,
    },
    facebook: {
      backgroundColor: light.facebook,
      borderColor: light.facebook,
      paddingVertical: t1 * 1.5,
    },
  });
};

const Button = ({
  style,
  opacity,
  gradient,
  color,
  startColor,
  endColor,
  end,
  start,
  locations,
  shadow,
  children,
  icon,
  circular,
  size,
  isLoading,
  disabled,
  borderColor,
  textStyle,
  linear,
  iconWithText,
  iconHeight = 22,
  iconWidth = 22,
  iconStyle,
  iconColor,
  uppercase = false,
  ...rest
}) => {
  const styles = componentStyles();
  const renderTextColor = () => {
    if (color === 'secondary' || color === 'link') {
      return light.secondary;
    } else if (color === 'facebook') {
      return '#6F3AC8';
    } else if (disabled && color === 'primary') {
      return 'rgba(255,255,255,0.5)';
    } else if (color === 'primary' || color === 'accent') {
      return light.primary;
    }
    return light.secondary;
  };
  const buttonStyles = [
    styles.button,
    borderColor && {borderColor},
    disabled && shadow && styles.shadow,
    circular && styles.circular,
    color && styles[color], // predefined styles colors for backgroundColor
    color && !styles[color] && {backgroundColor: color}, // custom backgroundColor
    style,
  ];

  if (iconWithText) {
    return (
      <TouchableOpacity
        style={[
          buttonStyles,
          disabled && styles.disabledButton,
          {paddingVertical: t1},
        ]}
        disabled={!!disabled}
        activeOpacity={disabled ? opacity || 0.8 : 0.2}
        {...rest}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Block flex={false} center middle row>
            <Block flex={false} style={iconStyle}>
              <ImageComponent
                name={icon}
                height={iconHeight}
                width={iconWidth}
                color={iconColor}
              />
            </Block>
            <Text
              semibold
              style={textStyle}
              center
              h1
              uppercase={uppercase}
              size={size || 14}
              margin={[0, 0, 0, wp(3)]}
              color={renderTextColor()}>
              {children}
            </Text>
          </Block>
        )}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[buttonStyles, disabled && styles.disabledButton]}
      disabled={!!disabled}
      activeOpacity={disabled ? opacity || 0.8 : 0.2}
      {...rest}>
      {isLoading ? (
        <ActivityIndicator size="small" color={light.primary} />
      ) : (
        <Text
          semibold
          style={textStyle}
          center
          h1
          uppercase={uppercase}
          size={size || 14}
          color={renderTextColor()}>
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
};

Button.defaultProps = {
  start: {x: 0, y: 0},
  end: {x: 1, y: 1},
  locations: [0.1, 0.9],
  opacity: 0.8,
  color: '#FFF',
};

export default Button;
