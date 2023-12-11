export const formatDate = (date) => {
    const options = { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return date.toLocaleDateString('ru-RU', options);
};