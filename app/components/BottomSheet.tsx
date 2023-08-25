import React from 'react';
import {
  View, Modal,
  TouchableOpacity, Animated, ViewStyle,
  LayoutChangeEvent, useWindowDimensions
} from 'react-native';

//Bottom Sheet Props
interface BottomSheetProps {
  visible?: boolean;
  style?: ViewStyle;
  duration?: number
  animationDelay?: number
  onDismiss?: () => void;
  onVisible?: () => void;
  children?: React.ReactNode;
};

const BottomSheet = ({
  onDismiss, onVisible,
  visible = false, children, style,
  duration = 500, animationDelay = 0
}: BottomSheetProps) => {
  const { height, width } = useWindowDimensions();
  const [layout, setLayout] = React.useState({ height, width });
  const animatedValue = new Animated.Value(0);

  //layout event
  const onLayout = ({ nativeEvent: { layout: box } }: LayoutChangeEvent) => {
    setLayout({ width: box.width, height: box.height });
  }
  //animation config
  const startAnimation = (toValue = 0, callback?: () => void) => {
    Animated.timing(animatedValue, {
      toValue, duration,
      delay: animationDelay,
      useNativeDriver: true
    }).start(callback);
  };
  //Initial callback
  React.useEffect(() => {
    if (visible) startAnimation(1, onVisible);
    else startAnimation(0);
  }, [animatedValue]);


  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    extrapolate: 'clamp',
    outputRange: [layout?.height + 50, 0]
  });
  return (
    <Modal visible={visible} transparent={true} animationType="none">
      <View style={{ flex: 1, position: 'relative', backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{ flex: 1 }}
          onPress={() => startAnimation(0, onDismiss)}
        />
        <Animated.View
          children={children} onLayout={onLayout}
          style={[{ backgroundColor: 'white' }, style, { transform: [{ translateY }] }]}
        />
      </View>
    </Modal>
  )
}

export default BottomSheet;