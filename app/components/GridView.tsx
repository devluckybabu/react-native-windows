import React from 'react';
import { View, FlatListProps, FlatList, StyleProp, ViewStyle } from 'react-native';

//method
const formatData = (data?: any | null, columns = 1, initialData?: any) => {
  if (data && columns) {
    const totalRows = Math.floor(data?.length / columns);
    let totalLastRows = data?.length - (totalRows * columns);
    while (totalLastRows !== 0 && totalLastRows !== columns) {
      data.push({ empty: true, key: 'blank' });
      totalLastRows++;
    };
    return data;
  } else return initialData;
};

///GridView Props
export interface GridViewProps extends FlatListProps<any> {
  itemWidth: number;
  itemSpacing?: number;
  itemStyle?: StyleProp<ViewStyle>;
};

const GridView = React.forwardRef(({
  itemStyle,
  itemWidth,
  numColumns,
  itemSpacing,
  data = [], renderItem, ...props
}: GridViewProps, ref: React.LegacyRef<FlatList<any>>) => {
  const [width, setWidth] = React.useState(0);
  if (!itemWidth) throw new Error('itemWidth is missing.itemWidth is required property');
  if (width) {
    const columns = Math.floor(width / itemWidth);
    const all_data = formatData(data, columns, []);
    return (
      <FlatList
        ref={ref}
        {...props}
        data={all_data}
        numColumns={columns}
        renderItem={({ item, index, separators }) => {
          if (item?.empty) return <View style={{ flex: 1, minWidth: itemWidth, margin: itemSpacing }} />;
          return (
            <View style={[itemStyle, { margin: itemSpacing, flex: 1, minWidth: itemWidth }]}>
              {renderItem && renderItem({ item, index, separators })}
            </View>
          )
        }}
      />
    )
  } else {
    return (
      <View onLayout={({ nativeEvent: { layout } }) => {
        if (layout?.width > 250) {
          setWidth(layout?.width);
        }
      }} />
    )
  };
});

export default GridView;