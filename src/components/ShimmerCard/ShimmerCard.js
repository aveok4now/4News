import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);


export default function ShimmerCard() {
    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            {[...Array(10)].map((_, index) => (
                <View key={index} style={styles.placeholder}>
                    <ShimmerPlaceholder
                        shimmerColors={['#F3F3F391', '#707070', '#F3F3F36C']}
                        style={{
                            width: 'inherit',
                            height: 200,
                            borderRadius: 9,
                        }}
                        autoRun={true}
                    />
                    <ShimmerPlaceholder
                        shimmerColors={['#F3F3F391', '#707070', '#F3F3F36C']}
                        style={{
                            width: 'inherit',
                            height: 52,
                            marginTop: 4,
                        }}
                        autoRun={true}
                    />
                    <ShimmerPlaceholder
                        shimmerColors={['#F3F3F391', '#707070', '#F3F3F36C']}
                        style={{
                            width: 'inherit',
                            height: 30,
                            marginTop: 4,
                        }}
                        autoRun={true}
                    />
                    <ShimmerPlaceholder
                        shimmerColors={['#F3F3F391', '#707070', '#F3F3F36C']}
                        style={{
                            width: 80,
                            height: 25,
                            marginTop: 4,
                            alignSelf: 'flex-end',
                            borderRadius: 10,
                        }}
                        autoRun={true}
                    />
                    <View
                        style={{
                            flexDirection: 'row',
                            marginTop: 10,
                            justifyContent: 'space-between',
                        }}>
                        <ShimmerPlaceholder
                            shimmerColors={['#F3F3F391', '#707070', '#F3F3F36C']}
                            style={{
                                width: 125,
                                height: 30,
                                borderRadius: 10,
                            }}
                            autoRun={true}
                        />
                        <ShimmerPlaceholder
                            shimmerColors={['#F3F3F391', '#707070', '#F3F3F36C']}
                            style={{
                                width: 125,
                                height: 30,
                                borderRadius: 10,
                            }}
                            autoRun={true}
                        />
                    </View>
                </View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    placeholder: {
        width: '100%',
        paddingHorizontal: 4,
        paddingVertical: 14,
        marginBottom: 4,
        borderRadius: 9,
        borderWidth: 0.65,
        borderColor: 'rgb(156 163 175)',
    },
})