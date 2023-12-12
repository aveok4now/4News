import {Dimensions} from 'react-native';
import {Platform} from 'react-native';

export const {width, height} = Dimensions.get('window');

export const ios = Platform.OS == 'ios';
