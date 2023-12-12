import React from 'react';
import {TouchableWithoutFeedback, Animated, Easing} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const RateUs = ({index, filled, onPress, animatedValue, rating}) => {
  const handlePress = () => {
    Animated.timing(animatedValue, {
      toValue: 2,
      duration: 400,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      animatedValue.setValue(1);
      onPress();
    });
  };

  const animateOpacity = animatedValue.interpolate({
    inputRange: [1, 1.2, 2],
    outputRange: [1, 0.5, 1],
  });

  const animateWobble = animatedValue.interpolate({
    inputRange: [1, 1.25, 1.75, 2],
    outputRange: ['0deg', '-3deg', '3deg', '0deg'],
  });

  const animateScale = animatedValue.interpolate({
    inputRange: [1, 1.5, 2],
    outputRange: [1, 1.4, 1],
  });

  const animationStyle = {
    transform: [
      {
        scale: animateScale,
      },
      {
        rotate: animateWobble,
      },
    ],
    opacity: animateOpacity,
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        handlePress();
      }}>
      <Animated.View style={animationStyle}>
        <Icon
          name={filled ? 'star' : 'star-o'}
          color={filled ? 'yellow' : 'blue'}
          size={32}
          style={{marginHorizontal: 6}}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default RateUs;
