import React from 'react';
import { View, Modal, Pressable, Platform, ViewStyle, Animated } from 'react-native';

//SiderBar props
interface SideBarProps {
  width?: number;
  style?: ViewStyle;
  visible?: boolean;
  backgroundColor?: string;
  onVisible?: () => void;
  onDismiss?: () => void;
  children?: React.ReactNode;
  position?: 'left' | 'right';
  animationDuration?: number;
};

//SiderBar component
const SideBar = ({
  style, children,
  visible = false,
  onDismiss, onVisible,
  animationDuration = 500,
  backgroundColor = "white",
  position = "left", width = 250,
}: SideBarProps) => {
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const startAnimation = React.useCallback((toValue = 0, callback?: () => void) => {
    Animated.timing(animatedValue, {
      toValue,
      duration: animationDuration,
      useNativeDriver: Platform.OS !== "web"
    }).start(callback);
  }, []);

  React.useEffect(() => {
    if (visible) startAnimation(width, onVisible);
    else animatedValue.setValue(0);
  }, [visible]);
  const translateX = animatedValue.interpolate({
    extrapolate: 'clamp',
    inputRange: [0, width],
    outputRange: [position === "right" ? width : -width, 0]
  });
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View
        style={{
          flex: 1,
          alignItems: 'stretch', backgroundColor: 'rgba(0, 0, 0, 0.5)',
          flexDirection: position === "right" ? "row" : "row-reverse"
        }}>
        <Pressable
          style={{ flex: 1, borderWidth: 0 }}
          onPress={() => startAnimation(0, onDismiss)}
        />
        <Animated.View
          style={[style, {
            backgroundColor,
            width, height: '100%',
            transform: [{ translateX }]
          }]}
          children={children} />
      </View>
    </Modal>
  )
};

export default SideBar;