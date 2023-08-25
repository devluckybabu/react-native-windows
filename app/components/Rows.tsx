import React from 'react';
import { View, ViewStyle, LayoutChangeEvent } from 'react-native';

//props
interface RowsProps extends React.PropsWithChildren<ViewStyle> {
  onLayout?: (event: LayoutChangeEvent) => void;
}

const Rows = ({ children, onLayout, ...style }: RowsProps) => (
  <View
    onLayout={onLayout}
    style={[style, { flexDirection: 'row' }]}
  >{children}</View>
);

export default Rows;