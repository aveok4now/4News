import {View, Text, Image} from 'react-native';
import React from 'react';
import CustomButton from '../../../../components/customs/CustomButton';
import CustomDrawer from '../../../../components/customs/CustomDrawer';
import newsOverViewImage from '../../../../../assets/images/search-bg.jpg';

export default function GuestInfo({navigation}) {
  return (
    <View style={{flex: 1}}>
      <Image
        blurRadius={50}
        style={{position: 'absolute', width: '100%', height: '100%'}}
        source={newsOverViewImage}
      />
      <CustomDrawer navigation={navigation} showBorder={true}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 2,
            zIndex: 100,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: 'Inter-ExtraBold',
              fontSize: 24,
            }}>
            Упс...
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: 'Inter-Light',
            }}>
            Чтобы просматривать сохранённые новости, необходимо войти в аккаунт
          </Text>

          <View style={{width: '60%', marginVertical: 15}}>
            <CustomButton
              bgColor="white"
              fgColor="blue"
              text="Войти"
              onPress={() =>
                navigation.navigate('Добро пожаловать !', {status: 'logout'})
              }
            />
          </View>
        </View>
      </CustomDrawer>
    </View>
  );
}
