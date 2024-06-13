import {View, Text, ViewStyle} from 'react-native';
import React from 'react';

const HomePage = () => {
  return (
    <View style={MAIN_STYLE}>
      <Text>HomePage</Text>
    </View>
  );
};

export default HomePage;

const MAIN_STYLE: ViewStyle = {
  flex: 1,
};
