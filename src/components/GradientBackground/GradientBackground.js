import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const GradientBackground = ({
  children,
  colors = ['#57e0f3', '#357ae0'],
  start,
  end,
  ...props
}) => {
  return (
    <LinearGradient
      colors={colors}
      start={start}
      end={end}
      style={{flex: 1}}
      {...props}>
      {children}
    </LinearGradient>
  );
};

export default GradientBackground;
