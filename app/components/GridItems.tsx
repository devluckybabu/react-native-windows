import React from 'react';
import { View, ViewStyle } from 'react-native';

//props
interface GridItemsProps {
  children?: any[];
  gridGap?: number;
  itemWidth: number;
  style?: ViewStyle;
  itemStyle?: ViewStyle;
};

const GridItems = ({ gridGap = 0, children = [], itemStyle, style, itemWidth }: GridItemsProps) => {
  if (children && children?.length >= 1) {
    return (
      <View style={[style, { flexDirection: 'row', flexWrap: 'wrap' }]}>
        {children?.map((child, index) => (
          <View
            key={String(index)}
            style={[itemStyle, {
              flex: 1,
              minWidth: itemWidth,
              margin: gridGap
            }]} children={child} />
        ))}
      </View>
    )
  } else return children;
}

export default GridItems;