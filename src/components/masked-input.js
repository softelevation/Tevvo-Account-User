// import _ from 'lodash';
// import PropTypes from 'prop-types';
// import React from 'react';
// import {
//   StyleSheet,
//   ViewPropTypes,
//   Keyboard,
//   TouchableOpacity,
// } from 'react-native';
// import {TextInput} from 'react-native-paper';
// import View from './Block';
// import Text from './Text';

// /**
//  * @description: Mask Input to create custom looking inputs with custom formats
//  * @gif: https://camo.githubusercontent.com/61eedb65e968845d5eac713dcd21a69691571fb1/68747470733a2f2f6d656469612e67697068792e636f6d2f6d656469612f4b5a5a7446666f486f454b334b2f67697068792e676966
//  * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/MaskedInputScreen.js
//  */
// const MaskedInput = () => {
//   // componentDidMount() {
//   //   this.keyboardDidHideListener = Keyboard.addListener(
//   //     'keyboardDidHide',
//   //     () => {
//   //       if (_.invoke(this, 'isFocused')) {
//   //         _.invoke(this, 'blur');
//   //       }
//   //     },
//   //   );
//   // }

//   // componentWillUnmount() {
//   //   this.keyboardDidHideListener.remove();
//   // }

//   // clear() {
//   //   this.setState({value: ''});
//   //   this.input.clear();
//   // }

//   const renderMaskedText = () => {
//     // const {renderMaskedText} = this.props;
//     const {value} = this.state;

//     if (_.isFunction(renderMaskedText)) {
//       // return renderMaskedText(value);
//     }
//     return <Text>{value}</Text>;
//   };

//   // const {containerStyle} = this.props;
//   // const TextInputProps = TextInput.extractOwnProps(this.props, [
//   //   'containerStyle',
//   //   'style',
//   // ]);

//   return (
//     <TouchableOpacity
//       // style={containerStyle}
//       activeOpacity={1}
//       onPress={() => this.input.focus()}>
//       <TextInput
//         {...this.props}
//         ref={(r) => (this.input = r)}
//         containerStyle={styles.hiddenInputContainer}
//         style={styles.hiddenInput}
//         enableErrors={false}
//         hideUnderline
//         placeholder=""
//         // {...TextInputProps}
//         caretHidden
//         multiline={false}
//         onChangeText={this.onChangeText}
//       />
//       <View style={styles.maskedInputWrapper}>{this.renderMaskedText()}</View>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   hiddenInputContainer: {
//     ...StyleSheet.absoluteFillObject,
//     zIndex: 1,
//   },
//   hiddenInput: {
//     color: 'transparent',
//     backgroundColor: 'transparent',
//     height: undefined,
//   },
//   maskedInputWrapper: {
//     zIndex: 0,
//   },
// });
// export default MaskedInput;
