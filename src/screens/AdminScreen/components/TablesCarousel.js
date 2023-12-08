import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import Carousel from 'react-native-snap-carousel';
import { width, height } from '../../../utils/getDimensions';
import { theme } from '../../MovieNewsScreen/theme';
import DataTable from './DataTable';
import SQLite from 'react-native-sqlite-storage';

export default function TablesCarousel({ data, setActiveSlide, navigation }) {
    const [showTable, setShowTable] = useState(false);

    const [selectedTable, setSelectedTable] = useState(null);
    const [tableData, setTableData] = useState([]);

    const fetchDataForTable = async tableName => {
        try {
            const query = `SELECT * FROM ${tableName}`;
            const db = await SQLite.openDatabase({ name: 'news.db', location: 1 });
            const result = await db.executeSql(query);
            const rows = result[0].rows;
            const tableRows = [];

            for (let i = 0; i < rows.length; i++) {
                tableRows.push(rows.item(i));
            }

            setTableData(tableRows);
        } catch (err) {
            console.log(err);
            setTableData([]);
        }
    };

    const handleIconPress = tableName => {
        setSelectedTable(tableName === selectedTable ? null : tableName);
    };

    useEffect(() => {
        if (selectedTable) {
            fetchDataForTable(selectedTable);
            setShowTable(true);
        }
    }, [selectedTable]);

    return (
        <>
            <Carousel
                //autoplay={true}
                // autoplayDelay={2000}
                //autoplayInterval={3000}
                data={data}
                renderItem={({ item, index }) => (
                    <View
                        style={{
                            borderWidth: 1,
                            borderColor: theme.bgWhite(0.1),
                            width: width * 0.55,
                            height: height * 0.25,
                            backgroundColor: theme.bgWhite(0.2),
                            borderRadius: width * 0.3,
                            marginTop: 16,
                        }}>
                        <TouchableOpacity
                            onPress={() => handleIconPress(item.name)}
                            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            {item.icon}
                        </TouchableOpacity>
                    </View>
                )}
                firstItem={0}
                inactiveSlideOpacity={0.5}
                sliderWidth={width}
                sliderHeight={width}
                itemWidth={width * 0.62}
                slideStyle={{ display: 'flex', alignItems: 'center' }}
                onSnapToItem={index => {
                    setActiveSlide(index);
                    //handleIconPress(data[index].name);
                }}
            />
            {showTable && <DataTable data={tableData} />}
        </>
    );
}
