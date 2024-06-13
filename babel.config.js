module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['inline-dotenv'],
    [
      'module-resolver',
      {
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.android.js',
          '.android.tsx',
          '.ios.js',
          '.ios.tsx',
        ],
        alias: {
          'app/*': './app/*',
          '@env': './env.config.js',
        },
        root: ['./'],
      },
    ],
  ],
};
