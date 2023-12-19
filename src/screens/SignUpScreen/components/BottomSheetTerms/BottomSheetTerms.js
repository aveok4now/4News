import React, {useRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import BottomSheet from 'react-native-simple-bottom-sheet';
import {fallbackText} from './Texts';
import {width, height} from '../../../../utils/global/getDimensions';
import LottieView from 'lottie-react-native';
import meditatingAnimation from '../../../../../assets/animations/meditating.json';

const BottomSheetTerms = React.forwardRef((props, ref) => {
  const innerRef = useRef(null);

  return (
    <BottomSheet
      onClose={props.onClose}
      sliderMaxHeight={height}
      wrapperStyle={{backgroundColor: '#7da9f2'}}
      ref={innerRef}>
      <View style={{height: 500}}>
        <Text style={styles.terms}>
          {props.title || 'Условия использования'}
        </Text>
        <Text
          style={{
            marginVertical: 15,
            textAlign: 'justify',
            fontFamily: 'Inter-Light',
          }}>
          {props.text || fallbackText}
        </Text>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <LottieView
            style={styles.lottie}
            source={meditatingAnimation}
            autoPlay={true}
            loop={true}
          />
        </View>
      </View>
    </BottomSheet>
  );
});

export default function BottomSheetTermsComponent({
  panelRef,
  onClose,
  title,
  text,
}) {
  return (
    <BottomSheetTerms
      ref={panelRef}
      onClose={onClose}
      title={title}
      text={text}
    />
  );
}

const styles = StyleSheet.create({
  terms: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Inter-ExtraBold',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 4,
  },
  lottie: {
    width: width * 0.6,
    height: width,
    marginBottom: 8,
  },
});
