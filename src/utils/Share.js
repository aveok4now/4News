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

export const handleUsersNewsShare = async ({ newsTitle, author, postTime }) => {
    const options = {
        title: 'Поделиться новостью',
        message: `📰 Новость с приложения 4News 📰\n👨‍💻 Автор: ${author} 👨‍💻\n\n${newsTitle}\n\nПост был выложен ${postTime} 🕒`,
    };
    Share.open(options)
        .then(res => console.log(res))
        .catch(err => console.log(err));
};
