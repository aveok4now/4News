import { Text, StyleSheet } from 'react-native'
import React from 'react'

export default function TermsPolicyText({ onTermsOfUsePressed, onPrivacyPolicyPressed }) {
    return (
        <Text style={styles.text}>
            Регистрируясь, Вы подтверждаете, что принимаете наши {''}
            <Text style={styles.link} onPress={onTermsOfUsePressed}>
                Условия использования
            </Text>{' '}
            и{' '}
            <Text style={styles.link} onPress={onPrivacyPolicyPressed}>
                Политику конфиденциальности
            </Text>
        </Text>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 12,
        color: '#FCF7F8',
        marginVertical: 10,
        textAlign: 'center',
        fontFamily: 'Inter-ExtraLight',
    },
    link: {
        color: '#9FFFCB',
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
        fontFamily: 'Inter-Light',
    },
})