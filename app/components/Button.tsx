import { Pressable, Text, ViewStyle, TextStyle, GestureResponderEvent } from 'react-native'
import React from 'react'
interface ButtonProps {
  children: string;
  style?: ViewStyle;
  textColor?: string;
  buttonColor?: string;
  textStyle?: TextStyle;
  onPress?: (event: GestureResponderEvent) => void | null;
  onLongPress?: (event: GestureResponderEvent) => void | null;
}


const Button = ({
  style,
  onPress,
  children,
  textStyle,
  buttonColor = "blue",
  textColor = "white",
  onLongPress
}: ButtonProps) => {
  return (
    <Pressable
      style={[{
        padding: 10,
        borderRadius: 4,
        backgroundColor: buttonColor
      }, style]}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <Text style={[{
        color: textColor,
        textAlign: 'center'
      }, textStyle]}>{children}</Text>
    </Pressable>
  )
}

export default Button;