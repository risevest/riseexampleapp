const path = require('path');
const {getSentryExpoConfig} = require('@sentry/react-native/metro');

module.exports = (() => {
  const config = getSentryExpoConfig(__dirname);

  config.resolver = {
    ...config.resolver,
    assetExts: config.resolver.assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...config.resolver.sourceExts, 'svg'],
    resolverMainFields: ['sbmodern', 'react-native', 'browser', 'main'],
  };

  config.transformer = {
    ...config.transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
    assetPlugins: ['expo-asset/tools/hashAssetFiles'],
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  };

  config.watchFolders = [
    ...config.watchFolders,
    path.resolve(__dirname, '../'),
  ];

  return config;
})();
