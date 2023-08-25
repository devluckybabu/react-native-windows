import React from 'react';
import { View, LayoutChangeEvent } from 'react-native';

//stroke props
interface BorderProps {
  color?: string;
  width?: number;
  style?: 'dashed' | 'dotted' | "solid"
};


//props
interface CircleProps {
  size?: number;
  margin?: number;
  border?: BorderProps;
  backgroundColor?: string;
  children?: React.ReactNode;
};


//component
const Circle = ({ size, margin, children, border, backgroundColor }: CircleProps) => {
  const [width, setWidth] = React.useState(size);
  //layout change
  const onLayout = React.useCallback(({ nativeEvent: { layout } }: LayoutChangeEvent) => {
    if (layout.width) setWidth(layout.width);
  }, [width]);

  const box_size = size ? size : width;
  return (
    <View
      onLayout={onLayout}
      style={{
        margin,
        backgroundColor,
        width: box_size,
        height: box_size,
        position: 'relative',
        overflow: 'hidden',
        alignItems: 'center',
        borderRadius: box_size,
        justifyContent: 'center',
        borderWidth: border?.width,
        borderStyle: border?.style,
        borderColor: border?.color
      }}>{children}</View>
  )
};

export default Circle;