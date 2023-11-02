import { StatusBar } from 'react-native';

let statusBarColor = '#36d1dc';

export function setStatusBarColor(color) {
    statusBarColor = color;
    StatusBar.setBackgroundColor(color);
}

export function resetStatusBarColor() {
    StatusBar.setBackgroundColor(statusBarColor);
}