import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import BottomTab from './BottomTab';

const Stack = createStackNavigator();


const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={BottomTab}
        options={{ title: "Bottom Tab" }}
      />
    </Stack.Navigator>
  )
}

export default StackNavigator;