import React from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GradientBackground = ({
    children,
    colors = ['#57e0f3', '#357ae0'],
    ...props
}) => {
    return (
        <LinearGradient colors={colors} style={{ flex: 1 }} {...props}>
            {children}
        </LinearGradient>
    );
};

export default GradientBackground;
