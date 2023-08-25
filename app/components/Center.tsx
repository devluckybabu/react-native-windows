import React from 'react';
import { View, ViewStyle } from 'react-native';


//props
interface CenterProps extends ViewStyle {
  children?: React.ReactNode;
};

const Center = ({ children, ...style }: CenterProps) => (
  <View
    style={[style, {
      alignItems: 'center',
      alignSelf: 'stretch',
      justifyContent: 'center'
    }]}
  >{children}</View>
);

export default Center