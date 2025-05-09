import React, {FunctionComponent, useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

import useCurrentTimeStore from '../stores/useCurrentTimeStore';

type CountdownBarProps = {
  duration: number;
  endTime: number;
};

const CountdownBar: FunctionComponent<CountdownBarProps> = ({
  endTime,
  duration,
}) => {
  const {styles} = useStyles(stylesheet);
  const progress = useSharedValue(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const currentTime = useCurrentTimeStore(state => state.currentTime);
  const currentTimeRef = useRef<number>(currentTime);

  useEffect(() => {
    currentTimeRef.current = currentTime;
  }, [currentTime]);

  useEffect(() => {
    progress.value = withSequence(
      withTiming((endTime - currentTimeRef.current) / duration, {
        duration: 100,
      }),
      withTiming(0, {
        duration: endTime - currentTimeRef.current,
        easing: Easing.linear,
      }),
    );
  }, [endTime, progress, duration]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: progress.value * containerWidth,
    };
  });

  return (
    <View
      onLayout={event => {
        setContainerWidth(event.nativeEvent.layout.width);
      }}>
      <Animated.View style={[styles.bar, animatedStyle]} />
    </View>
  );
};

const stylesheet = createStyleSheet(theme => ({
  bar: {
    backgroundColor: theme.colors.countdownBar.background,
    borderRadius: 4,
    height: '100%',
  },
}));

export default CountdownBar;
