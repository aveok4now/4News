import {StatusBar} from 'react-native';

export function setStatusBarColor(color) {
  StatusBar.setBackgroundColor(color);
}

export function resetStatusBarColor() {
  StatusBar.setBackgroundColor('#36d1dc');
}
