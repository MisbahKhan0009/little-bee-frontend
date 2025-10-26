module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Keep expo-router/babel before reanimated plugin
      'expo-router/babel',
      // Reanimated plugin must be listed last
      'react-native-reanimated/plugin',
    ],
  };
};