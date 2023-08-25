import { View, Text } from 'react-native'
import React from 'react'

const ProfileScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>I am your  <Text style={{ fontWeight: 'bold', color: 'blue' }}>Profile</Text> from <Text style={{ fontWeight: 'bold' }}>app/screens/ProfileScreen</Text></Text>
    </View>
  )
}

export default ProfileScreen