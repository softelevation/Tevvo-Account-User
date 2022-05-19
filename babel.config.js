module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',

      {
        root: ['./'],
        alias: {
          _screens: './src/screens/index.js',
          _elements: './src/components/index.js',
          _routeName: './src/routes/route-names.js',
          _constants: './src/utils/constants.js',
        },
        extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js'],
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
