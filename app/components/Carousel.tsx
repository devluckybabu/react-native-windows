import React from 'react';
import { View, FlatList, ListRenderItem, Platform, Text, Pressable } from 'react-native';
import Center from './Center';

//Props
interface CarouselProps {
  data?: any[];
  height?: number;
  autoPlay?: boolean;
  showArrows?: boolean;
  indicatorSize?: number;
  snapToInterval?: number;
  showIndicators?: boolean;
  autoPlayInterval?: number;
  initialScrollIndex?: number;
  renderItem: ListRenderItem<any>;
  onChangedIndex?: (index: number) => void;
};

const Carousel = ({
  height,
  data = [],
  renderItem,
  autoPlay = false,
  snapToInterval,
  autoPlayInterval = 5000,
  onChangedIndex,
  showArrows = false,
  initialScrollIndex,
  showIndicators, indicatorSize
}: CarouselProps) => {
  const ref = React.useRef<FlatList<any>>(null);
  const [activeIndex, setIndex] = React.useState(0);
  const [_contentWidth, setContentWidth] = React.useState(0);

  const size = 30;
  ///callback
  React.useEffect(() => {
    const stopTime = setTimeout(() => {
      if (ref?.current && autoPlay) {
        if (activeIndex < data?.length - 1) {
          const index = activeIndex + 1;
          setIndex(index);
          ref?.current?.scrollToIndex({ index });
          if (onChangedIndex) onChangedIndex(index);
        } else {
          setIndex(0);
          if (onChangedIndex) onChangedIndex(0);
          ref?.current?.scrollToIndex({ index: 0 })
        }
      }
      clearTimeout(stopTime);
    }, autoPlayInterval);
    return () => {
      clearTimeout(stopTime);
    }
  }, [activeIndex]);

  return (
    <View
      style={{ height, position: 'relative' }}
      onLayout={({ nativeEvent: { layout } }) => {
        setContentWidth(layout?.width);
      }}
    >
      <FlatList
        ref={ref}
        data={data}
        horizontal={true}
        pagingEnabled={true}
        initialScrollIndex={initialScrollIndex}
        getItemLayout={(_item, index) => ({
          index,
          length: _contentWidth,
          offset: index * _contentWidth
        })}
        renderItem={({ item, index, separators }) => (
          <View style={{ height, width: _contentWidth }}
            children={renderItem && renderItem({ item, index, separators })}
          />
        )}
        snapToInterval={snapToInterval}
        keyExtractor={(_, key) => String(key)}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={Platform.OS === "android"}
        onMomentumScrollEnd={({ nativeEvent: { layoutMeasurement, contentOffset } }) => {
          const cIndex = Math.ceil(contentOffset.x / layoutMeasurement.width);
          setIndex(cIndex);
          if (onChangedIndex) onChangedIndex(cIndex);
        }}
      />
      {showIndicators && <View style={{
        bottom: 0,
        zIndex: 10,
        width: '100%',
        padding: 5,
        alignItems: 'center',
        position: 'absolute',
        justifyContent: 'center'
      }}>
        <FlatList
          data={data}
          horizontal={true}
          snapToAlignment="center"
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, key) => String(key)}
          renderItem={({ index }) => {
            const focused = activeIndex == index;
            return (
              <Pressable
                key={String(index)}
                style={{ margin: 5 }}
                disabled={focused}
                onPress={() => {
                  setIndex(index);
                  ref.current?.scrollToIndex({ index });
                }}
              >
                <Center
                  height={size} width={size} borderRadius={size}
                  backgroundColor={focused ? "white" : "rgba(0,0,0,0.2)"}>
                  <Text style={{
                    fontWeight: 'bold',
                    color: focused ? "blue" : 'white'
                  }}>{index + 1}</Text>
                </Center>
              </Pressable>
            )
          }}
        />
      </View>}
    </View>
  )
}

export default Carousel;