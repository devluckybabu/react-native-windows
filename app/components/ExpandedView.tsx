import React from 'react';
import { View, ViewStyle } from 'react-native';

type ExpandedViewProps = React.PropsWithChildren<ViewStyle>;


const ExpandedView = ({ children, flex = 1, ...style }: ExpandedViewProps) => (
  <View style={{ flex, ...style }}>{children}</View>
);

export default ExpandedView;