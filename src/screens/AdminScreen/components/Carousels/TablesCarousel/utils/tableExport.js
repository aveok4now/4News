import RNFS from 'react-native-fs';
import Share from 'react-native-share';

export const handleExportCSV = async (tableData, selectedTable) => {
  try {
    const csvContent = tableData
      .map(row => Object.values(row).join(','))
      .join('\n');
    const fileName = `${selectedTable}.csv`;
    const filePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

    await RNFS.writeFile(filePath, csvContent, 'utf8');

    if (Platform.OS === 'android') {
      const shareOptions = {
        title: `Экспорт таблицы ${selectedTable}`,
        message: `Таблица ${selectedTable} базы данных приложения 4News `,
        url: `file://${filePath}`,
        type: 'text/csv',
      };

      await Share.open(shareOptions);
    } else {
      await Share.open({url: `file://${filePath}`});
    }
  } catch (error) {
    console.log('Error exporting CSV:', error);
  }
};
