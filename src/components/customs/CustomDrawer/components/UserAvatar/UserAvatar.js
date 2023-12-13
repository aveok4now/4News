import { View, Image } from 'react-native'
import React from 'react'
import useUserCredentials from '../../../../../utils/hooks/useUserCredentials'
import LinearGradient from 'react-native-linear-gradient';
import guestImage from '../../../../../../assets/images/guest.jpg'
import userImage from '../../../../../../assets/images/user.jpg'
import adminImage from '../../../../../../assets/images/admin.jpg'

export default function UserAvatar() {
    const identify = useUserCredentials();
    return (
        <LinearGradient
            colors={['#dd2dcf', '#f356b0']}
            style={{
                width: 80,
                height: 80,
                borderRadius: 45,
                marginLeft: 20,
            }}>
            <View
                style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 45,
                    borderWidth: 1.5,
                    borderColor: 'transparent',
                    alignSelf: 'center',
                    overflow: 'hidden',
                    shadowColor: 'rgba(245, 40, 145, 1)',
                    elevation: 1,
                }}>
                <Image
                    source={
                        identify === 'Гость'
                            ? guestImage
                            : identify.includes('admin')
                                ? adminImage
                                : userImage
                    }
                    style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                />
            </View>
        </LinearGradient>
    )
}