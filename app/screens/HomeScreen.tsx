import { Icons } from 'app/components';
import React from 'react';
import { View, Text } from 'react-native';

const HomeScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>I am your  <Text style={{ fontWeight: 'bold', color: 'blue' }}>Home</Text> from <Text style={{ fontWeight: 'bold' }}>app/screens/HomeScreen</Text></Text>
    </View>
  )
}

export default HomeScreen