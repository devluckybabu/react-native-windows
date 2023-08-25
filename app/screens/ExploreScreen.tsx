import { View, Text } from 'react-native'
import React from 'react'

const ExploreScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>I am your  <Text style={{ fontWeight: 'bold', color: 'blue' }}>Explore</Text> from <Text style={{ fontWeight: 'bold' }}>app/screens/ExploreScreen</Text></Text>
    </View>
  )
}

export default ExploreScreen