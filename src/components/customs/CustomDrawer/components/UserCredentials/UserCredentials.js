import { View, Text } from 'react-native'
import React from 'react'
import useUserEmail from '../../../../../utils/hooks/useUserEmail'
import useUserCredentials from '../../../../../utils/hooks/useUserCredentials';

export default function UserCredentials() {

    const identify = useUserCredentials();
    const userEmail = useUserEmail();

    return (
        <View style={{ marginLeft: 15 }}>
            <Text style={{ fontSize: 22, fontFamily: 'Inter-Bold' }}>
                {identify} {identify === 'Гость' ? '👾' : '💫'}
            </Text>
            {userEmail && (
                <Text style={{ fontSize: 14, fontFamily: 'Inter-Light' }}>
                    {userEmail}
                </Text>
            )}
        </View>
    )
}