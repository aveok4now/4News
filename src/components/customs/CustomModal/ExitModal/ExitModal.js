import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import CustomButton from '../../CustomButton';
import LottieView from 'lottie-react-native';
import {width} from '../../../../utils/global/getDimensions';
import ModalPopup from '../CustomModal';
import closeButton from '../../../../../assets/animations/close.json';
import exitAnimation from '../../../../../assets/animations/exit.json';

export default function ExitModal({visible, onYes, setVisible}) {
  return (
    <ModalPopup visible={visible}>
      <View style={{alignItems: 'center'}}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setVisible(false)}>
            <LottieView
              style={styles.lottieClose}
              source={closeButton}
              autoPlay={true}
              loop={false}
            />
          </TouchableOpacity>
        </View>
      </View>
      <LottieView
        style={styles.lottie}
        source={exitAnimation}
        autoPlay={true}
        loop={false}
      />
      <Text
        style={{
          marginBottom: 20,
          fontSize: 22,
          textAlign: 'center',
          textDecorationColor: 'white',
          fontFamily: 'Inter-Black',
          textShadowColor: 'rgba(226, 232, 240, 0.25)',
          textShadowOffset: {width: 0, height: 3},
          textShadowRadius: 4,
        }}>
        Уже уходите ? 🥺
      </Text>
      <Text
        style={{
          marginBottom: 20,
          fontSize: 16,
          textAlign: 'center',
          textDecorationColor: 'white',
          fontFamily: 'Inter-Light',
          textShadowColor: 'rgba(226, 232, 240, 0.25)',
          textShadowOffset: {width: 0, height: 3},
          textShadowRadius: 4,
        }}>
        Будем рады увидеть Вас снова!
      </Text>
      <View style={{flexDirection: 'column', justifyContent: 'center'}}>
        <CustomButton text="Да" onPress={() => onYes()} />
        <CustomButton
          type="Tertiary"
          text="Отмена"
          onPress={() => setVisible(false)}
        />
      </View>
    </ModalPopup>
  );
}

const styles = StyleSheet.create({
  lottie: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: width,
    height: width * 0.5,
  },
  lottieClose: {
    width: 90,
    height: 90,
    marginLeft: 55,
  },

  header: {
    width: '120%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
