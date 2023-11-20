export const formatPostTime = (postTime, localTime) => {
    if (!postTime) {
        return 'Некорректная дата';
    }

    let postTimeObject;
    if (postTime instanceof Date) {
        postTimeObject = postTime;
    } else {
        try {
            if (postTime.toLowerCase().includes('только что')) {
                postTimeObject = new Date();
            } else if (postTime.toLowerCase().includes('секунд')) {
                const secondsAgo = parseInt(postTime);
                postTimeObject = new Date(new Date().getTime() - secondsAgo * 1000);
            } else if (postTime.toLowerCase().includes('минут')) {
                const minutesAgo = parseInt(postTime);
                postTimeObject = new Date(new Date().getTime() - minutesAgo * 60000);
            } else if (postTime.toLowerCase().includes('час')) {
                const hoursAgo = parseInt(postTime);
                postTimeObject = new Date(new Date().getTime() - hoursAgo * 3600000);
            } else if (postTime.toLowerCase().includes('вчера')) {
                postTimeObject = new Date(new Date().getTime() - 86400000);
            } else if (postTime.toLowerCase().includes('позавчера')) {
                postTimeObject = new Date(new Date().getTime() - 172800000);
            } else {
                postTimeObject = new Date(postTime);
                if (isNaN(postTimeObject.getTime())) {
                    console.error('Некорректная дата после преобразования:', postTime);
                    return 'Некорректная дата';
                }
            }
        } catch (error) {
            console.error('Ошибка при преобразовании даты:', error);
            return 'Некорректная дата';
        }
    }

    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    };
    //console.log('posttime', postTimeObject.toLocaleDateString('ru-RU', options));

    const currentTime = localTime || new Date();
    const timeDiffInSeconds = Math.floor((currentTime - postTimeObject) / 1000);
    //console.log('timediff', timeDiffInSeconds);

    if (timeDiffInSeconds < 5) {
        return 'Только что';
    } else if (timeDiffInSeconds < 60) {
        return `${timeDiffInSeconds} секунд назад`;
    } else if (timeDiffInSeconds < 120) {
        return '1 минуту назад';
    } else if (timeDiffInSeconds < 3600) {
        const minutes = Math.floor(timeDiffInSeconds / 60);
        return `${minutes} минуты назад`;
    } else if (timeDiffInSeconds < 7200) {
        return '1 час назад';
    } else if (timeDiffInSeconds < 86400) {
        const hours = Math.floor(timeDiffInSeconds / 3600);
        return `${hours} часа назад`;
    } else if (timeDiffInSeconds < 172800) {
        return 'Вчера';
    } else if (timeDiffInSeconds < 259200) {
        return 'Позавчера';
    }

    return postTimeObject.toLocaleDateString('ru-RU', options);
};
