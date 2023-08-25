import React from 'react';
import {
  Platform,
  View, Modal,
  ActivityIndicator,
  LayoutChangeEvent
} from 'react-native';



interface ContainerProps {
  loading?: boolean;
  processing?: boolean;
  onReload?: () => void;
  headerHeight?: number;
  backgroundColor?: string;
  children?: React.ReactNode;
  LoadingComponent?: React.ReactNode;
  onLayout?: (event: LayoutChangeEvent) => void;
};


const Container = ({
  loading,
  onReload,
  children,
  onLayout,
  processing = false,
  backgroundColor,
  LoadingComponent,
  headerHeight = 65
}: ContainerProps) => {
  if (loading) {
    return (
      <View style={{
        flex: 1,
        padding: 5,
        backgroundColor,
        alignItems: 'center',
        justifyContent: 'center'
      }} onLayout={onLayout}>
        {LoadingComponent ? LoadingComponent : (
          <ActivityIndicator color="blue" size="small" />
        )}
      </View>
    )
  } else {
    return (
      <View style={{
        flex: 1,
        backgroundColor,
        overflow: 'hidden',
        position: 'relative'
      }} onLayout={onLayout}>
        {children}
        {Platform.OS === "windows" && processing ? (
          <View style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            zIndex: 100,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.4)'
          }}>
            <ActivityIndicator color="blue" />
          </View>
        ) : (
          <Modal transparent visible={processing} statusBarTranslucent={true}>
            <View style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.4)',
              justifyContent: 'center', alignItems: 'center'
            }}>
              <ActivityIndicator color="blue" />
            </View>
          </Modal>
        )}
      </View>
    )
  }
};

export default Container;