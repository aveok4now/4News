import { openLinkInBrowserHandler } from "../../../components/customs/CustomDrawer/utils/openLink";

export const downloadFile = async () => {
    // const url =
    //     'https://drive.google.com/file/d/1BI5ZG27azsyxB6q7X3-ONQC2_tR10GKq/view?usp=sharing';
    // const filePath = '/data/user/0/com.mynewapp/files/news.db';

    // RNFS.downloadFile({
    //     fromUrl: url,
    //     toFile: filePath,
    //     progress: res => {
    //         const progress = (res.bytesWritten / res.contentLength) * 100;
    //         console.log(`Progress: ${progress.toFixed(2)}%`);
    //         console.log('bites written', res.bytesWritten);
    //     },
    // })
    //     .promise.then(response => {
    //         console.log('File downloaded!', response);
    //         console.log('file saved at: ', filePath);
    //     })
    //     .catch(err => {
    //         console.log('Download error:', err);
    //     });
    openLinkInBrowserHandler(2);
};