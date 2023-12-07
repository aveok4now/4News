import { Linking } from 'react-native'

export const webPages = [
    'https://www.sevsu.ru/',
    'https://www.github.com/dtb4life/4News/commits/',
];

export const openLinkInBrowserHandler = index => {
    Linking.canOpenURL(webPages[index]).then(supported => {
        if (supported) {
            Linking.openURL(webPages[index]).catch(err => {
                console.error('Ошибка при открытии URL: ' + err);
            });
        } else {
            console.error('Ссылка не поддерживается');
        }
    });
};