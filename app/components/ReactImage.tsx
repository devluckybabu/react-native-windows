import React from 'react';
import { Image, ImageProps, View, ImageStyle } from 'react-native';
interface ReactImageProps extends ImageProps {
  imageStyle?: ImageStyle;
};

const ReactImage = ({
  style,
  onLoadEnd,
  imageStyle,
  defaultSource,
  ...props }: ReactImageProps) => {
  return (
    <View style={[{ flex: 1, position: 'relative', overflow: 'hidden' }, style]}>
      <Image
        {...props}
        style={[{
          flex: 1,
          width: '100%'
        }, imageStyle]}
      />
    </View>
  )
};

export default ReactImage;