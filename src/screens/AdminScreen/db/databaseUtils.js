import SQLite from 'react-native-sqlite-storage';
import RNFS from 'react-native-fs';

export const fetchData = async (query, queryArgs) => {
    try {
        const db = await SQLite.openDatabase({ name: 'news.db', location: 1 });
        const result = await db.executeSql(query, queryArgs);
        return result[0].rows.item(0);
    } catch (err) {
        console.log(err);
        return null;
    }
};

export const fetchAllUsers = async () => {
    const query = 'SELECT * FROM Users';

    try {
        const db = await SQLite.openDatabase({ name: 'news.db', location: 1 });
        const result = await db.executeSql(query);

        const rows = result[0].rows;
        const users = [];

        for (let i = 0; i < rows.length; i++) {
            users.push(rows.item(i));
        }

        return users;
    } catch (err) {
        console.log(err);
        return null;
    }
};



export const downloadFile = () => {
    const url =
        'https://drive.google.com/file/d/1BI5ZG27azsyxB6q7X3-ONQC2_tR10GKq/view?usp=sharing';
    const filePath = RNFS.DocumentDirectoryPath + '/news.db';

    RNFS.downloadFile({
        fromUrl: url,
        toFile: filePath,
        //background: true,
        //discretionary: true,
        progress: res => {
            const progress = (res.bytesWritten / res.contentLength) * 100;
            console.log(`Progress: ${progress.toFixed(2)}%`);
            console.log('bites written', res.bytesWritten);
        },
    })
        .promise.then(response => {
            console.log('File downloaded!', response);
            console.log('file saved at: ', filePath);
        })
        .catch(err => {
            console.log('Download error:', err);
        });
};