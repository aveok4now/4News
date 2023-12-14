import {View, TouchableOpacity, Animated} from 'react-native';
import React from 'react';
import ModalPopup from '../../../CustomModal/CustomModal';
import {Icons} from '../../../../../constants/Icons';
import RateUs from '../../../../RateUs';

export default function RateUSModal({
  navigation,
  showRateUSModal,
  setShowRateUSModal,
  animatedValue,
  rating,
  rate,
}) {
  return (
    <ModalPopup
      navigation={navigation}
      visible={showRateUSModal}
      backgroundColor="#7692FF">
      <TouchableOpacity
        style={{position: 'absolute', top: 10, right: 10}}
        onPress={() => {
          setShowRateUSModal(!showRateUSModal);
        }}>
        <Icons.EvilIcons name="close" color="white" size={24} />
      </TouchableOpacity>
      <View
        style={[
          {
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            marginTop: 5,
          },
        ]}>
        {[1, 2, 3, 4, 5].map(index => (
          <Animated.View key={index}>
            <RateUs
              key={index}
              index={index}
              filled={index <= rating ? true : false}
              animatedValue={animatedValue}
              rating={rating}
              onPress={() => {
                rate(index);
              }}
            />
          </Animated.View>
        ))}
      </View>
    </ModalPopup>
  );
}
