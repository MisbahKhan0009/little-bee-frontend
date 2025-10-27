module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Enable NativeWind Tailwind classes
      'nativewind/babel',
      // Reanimated plugin must be listed last
      'react-native-reanimated/plugin',
    ],
  };
};