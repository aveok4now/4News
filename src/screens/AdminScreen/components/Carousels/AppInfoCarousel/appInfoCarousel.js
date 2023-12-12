import React from 'react';
import Carousel from 'react-native-snap-carousel';
import {width} from '../../../../../utils/getDimensions';
import AppInfo from './AppInfo';

export default function AppInfoCarousel({activeSlide, data, setActiveSlide}) {
  return (
    <Carousel
      autoplay={true}
      autoplayDelay={2000}
      autoplayInterval={3000}
      data={data}
      renderItem={({item, index}) => (
        <AppInfo item={item} activeSlide={activeSlide} />
      )}
      firstItem={2}
      inactiveSlideOpacity={0.6}
      sliderWidth={width}
      sliderHeight={width}
      itemWidth={width * 0.62}
      slideStyle={{display: 'flex', alignItems: 'center'}}
      onSnapToItem={index => setActiveSlide(index)}
      layout={'stack'}
      layoutCardOffset={'18'}
    />
  );
}
