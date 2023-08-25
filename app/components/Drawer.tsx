import React from 'react';
import {
  View,
  ViewStyle,
  Animated,
  LayoutChangeEvent, Easing
} from 'react-native';
import SideBar from './SideBar';

interface DrawerProps {
  drawerWidth?: number;
  drawerStyle?: ViewStyle;
  backgroundColor?: string;
  children?: React.ReactNode;
  drawerPostion?: 'left' | 'right';
  DrawerContent?: React.ReactNode;
  onLayout?: (event: LayoutChangeEvent) => void;
  drawerMode?: "slide" | "permanent" | "front";
  onDrawerStatusChange?: (status: boolean) => void;
};

interface State {
  visible?: boolean;
}


export class Drawer extends React.PureComponent<DrawerProps, State> {
  animatedValue: Animated.Value;
  constructor(props: DrawerProps) {
    super(props);
    this.state = {
      visible: props.drawerMode === "permanent",
    }
    this.animatedValue = new Animated.Value(props?.drawerMode === "permanent" ? 1 : 0);
  }

  private startAnimation = (toValue = 0) => {
    return Animated.timing(this.animatedValue, {
      toValue,
      duration: 500,
      useNativeDriver: false,
      easing: Easing.linear
    });
  };

  openDrawer = () => {
    const { visible } = this.state;
    const { onDrawerStatusChange } = this.props;
    this.setState({ visible: !visible });
    if (onDrawerStatusChange) onDrawerStatusChange(true);
    this.startAnimation(visible ? 0 : 1).start();
  }

  closeDrawer = () => {
    const { visible } = this.state;
    const { onDrawerStatusChange } = this.props;
    this.setState({ visible: !visible });
    if (onDrawerStatusChange) onDrawerStatusChange(true);
    this.startAnimation(visible ? 0 : 1).start();
  };





  // render components
  render() {
    const {
      children,
      onLayout,
      drawerStyle,
      DrawerContent,
      drawerWidth = 0,
      drawerMode = "slide",
      drawerPostion = "left",
      backgroundColor = "white"
    } = this.props;
    const { visible } = this.state;


    const margin = drawerPostion == "right" ? ({
      marginRight: this.animatedValue.interpolate({
        inputRange: [0, 1],
        extrapolate: 'clamp',
        outputRange: [-drawerWidth, 0],
      })
    }) : ({
      marginLeft: this.animatedValue.interpolate({
        inputRange: [0, 1],
        extrapolate: 'clamp',
        outputRange: [-drawerWidth, 0],
      })
    });


    const style: any = drawerMode === "slide" ? ({ height: '100%', width: '100%' }) : ({ flex: 1 });
    const flexDirection = drawerPostion === "right" ? "row-reverse" : "row";
    return (
      <View onLayout={onLayout}
        style={{
          flex: 1,
          flexDirection,
          position: 'relative'
        }}>
        {drawerMode == "permanent" ? (
          <Animated.View
            style={[drawerStyle, {
              margin: 0,
              height: '100%',
              backgroundColor,
              overflow: 'hidden',
              width: drawerWidth, ...margin
            }]}>
            {DrawerContent}
          </Animated.View>
        ) : drawerMode == "slide" ? (
          <Animated.View
            style={[drawerStyle, {
              margin: 0,
              height: '100%',
              backgroundColor,
              overflow: 'hidden',
              width: drawerWidth, ...margin
            }]}>
            {DrawerContent}
          </Animated.View>
        ) : (
          <SideBar
            visible={visible}
            children={children}
            position={drawerPostion}
            onDismiss={this.closeDrawer}
          />
        )}
        <View style={[style, { position: 'relative' }]}>
          <View style={{ flex: 1, overflow: 'hidden' }}>
            {children}
          </View>
        </View>
      </View>
    )
  }
}

export default Drawer;