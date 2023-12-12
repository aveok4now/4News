import {Linking} from 'react-native';

export const webPages = [
  'https://www.sevsu.ru/',
  'https://www.github.com/dtb4life/4News/commits/',
  'https://drive.google.com/file/d/1BI5ZG27azsyxB6q7X3-ONQC2_tR10GKq/view?usp=drive_link',
  'https://www.github.com/dtb4life/4News',
];

export const openLinkInBrowserHandler = index => {
  Linking.canOpenURL(webPages[index]).then(supported => {
    Linking.openURL(webPages[index]).catch(err => {
      console.error('Ошибка при открытии URL: ' + err);
    });
  });
};
