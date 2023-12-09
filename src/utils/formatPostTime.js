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
                return postTime;
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
                if (!postTime.includes('-')) return postTime;

            }
        } catch (error) {
            console.error('Ошибка при преобразовании даты:', error);
            return 'Некорректная дата';
        }
    }

    const currentTime = localTime ? new Date(localTime) : new Date();

    const timeDiffInSeconds = Math.floor(
        (currentTime.getTime() - postTimeObject.getTime()) / 1000,
    );

    const hours = Math.floor(timeDiffInSeconds / 3600);
    const minutes = Math.floor((timeDiffInSeconds % 3600) / 60);

    if (timeDiffInSeconds < 5) {
        return 'Только что';
    } else if (timeDiffInSeconds < 60) {
        return `${timeDiffInSeconds} секунд назад`;
    } else if (timeDiffInSeconds < 120) {
        return '1 минуту назад';
    } else if (timeDiffInSeconds < 3600) {
        return `${minutes} ${getMinutes(minutes)} назад`;
    } else if (timeDiffInSeconds < 7200) {
        return '1 час назад';
    } else if (timeDiffInSeconds < 86400) {
        return `${hours} ${getHours(hours)} назад`;
    } else if (timeDiffInSeconds < 172800) {
        return 'Вчера';
    } else if (timeDiffInSeconds < 259200) {
        return 'Позавчера';
    }

    const dateOptions = {
        day: 'numeric',
        month: 'long',
    };

    const timeOptions = {
        hour: 'numeric',
        minute: 'numeric',
    };

    const dateString = postTimeObject.toLocaleDateString('ru-RU', dateOptions);
    const timeString = postTimeObject.toLocaleTimeString('ru-RU', timeOptions);

    return `${dateString} в ${timeString}`;
};

const getHours = hours => {
    if (hours >= 11 && hours <= 19) {
        return 'часов';
    } else {
        const lastDigit = hours % 10;
        switch (lastDigit) {
            case 1:
                return 'час';
            case 2:
            case 3:
            case 4:
                return 'часа';
            default:
                return 'часов';
        }
    }
};

const getMinutes = minutes => {
    const lastDigit = minutes % 10;
    if (lastDigit === 1 && minutes !== 11) {
        return 'минута';
    } else if (
        lastDigit >= 2 &&
        lastDigit <= 4 &&
        (minutes < 10 || minutes > 20)
    ) {
        return 'минуты';
    } else {
        return 'минут';
    }
};
