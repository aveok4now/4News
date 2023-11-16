import Share from 'react-native-share'


export const handleShare = async ({ url, newsTitle }) => {
    console.log(url);
    const options = {
        title: 'Поделиться новостью',
        message: `📰 Новость с приложения 4News\n\n${newsTitle}\n\n`,
        url: url,
    };
    Share.open(options)
        .then(res => console.log(res))
        .catch(err => console.log(err));
};

