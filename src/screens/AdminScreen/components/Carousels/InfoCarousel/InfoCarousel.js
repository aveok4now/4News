import React from 'react';
import Carousel from 'react-native-snap-carousel';
import {width} from '../../../../../utils/getDimensions';
import DBInfo from './DBInfo';

export default function InfoCarousel({data, setActiveSlide}) {
  return (
    <Carousel
      autoplay={true}
      autoplayDelay={2000}
      autoplayInterval={3000}
      data={data}
      renderItem={({item, index}) => <DBInfo item={item} />}
      firstItem={0}
      inactiveSlideOpacity={0.5}
      sliderWidth={width}
      sliderHeight={width}
      itemWidth={width * 0.62}
      slideStyle={{display: 'flex', alignItems: 'center'}}
      onSnapToItem={index => setActiveSlide(index)}
    />
  );
}
