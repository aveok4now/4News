import Share from 'react-native-share'


export const handleShare = async ({
    url,
    newsTitle,
    message = `📰 Новость с приложения 4News\n\n${newsTitle}\n\n`
}) => {
    console.log(url);
    const options = {
        title: 'Поделиться новостью',
        message: message,
        url: url,
    };
    Share.open(options)
        .then(res => console.log(res))
        .catch(err => console.log(err));
};

export const handleUsersNewsShare = async ({ newsTitle, author, postTime, messageType = 'Новость' }) => {
    const options = {
        title: 'Поделиться новостью',
        message: `📰 ${messageType} с приложения 4News 📰\n👨‍💻 Автор: ${author} 👨‍💻\n\n${newsTitle}\n\nПост был выложен ${postTime} 🕒`,
    };
    Share.open(options)
        .then(res => console.log(res))
        .catch(err => console.log(err));
};
