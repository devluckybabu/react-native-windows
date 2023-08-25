import React from 'react';
import { View, LayoutChangeEvent, ViewStyle } from 'react-native';

interface SquareProps {
  style?: ViewStyle;
  children?: React.ReactNode;
  dimensity?: 'height' | 'width';
};


const Square = ({ dimensity = "width", children, style }: SquareProps) => {
  const [size, setSize] = React.useState<number | undefined>(undefined);


  const onLayout = ({ nativeEvent: { layout } }: LayoutChangeEvent) => {
    if (dimensity === "height") {
      setSize(layout?.height);
    } else setSize(layout?.width);
  };

  return (
    <View
      onLayout={onLayout}
      style={[style, { height: size, width: size, overflow: 'hidden' }]}
    >{children}</View>
  )
}

export default Square;