import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useMemo } from 'react';
import Carousel from 'react-native-snap-carousel';
import { width, height } from '../../../../../utils/getDimensions';
import { theme } from '../../../../MovieNewsScreen/theme';
import DataTable from './DataTable';
import SQLite from 'react-native-sqlite-storage';
import { ActivityIndicator } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import AnimatedText from '../../../../../components/UsersNewsComponents/AnimatedText';

class TableItem extends React.PureComponent {
    render() {
        const { icon, onPress } = this.props;

        return (
            <View
                style={{
                    borderWidth: 1,
                    borderColor: theme.bgWhite(0.1),
                    width: width * 0.55,
                    height: height * 0.25,
                    backgroundColor: theme.bgWhite(0.2),
                    borderRadius: width * 0.3,
                    //marginTop: 8,
                }}>
                <TouchableOpacity
                    onPress={onPress}
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    {icon}
                </TouchableOpacity>
            </View>
        );
    }
}

export default function TablesCarousel({ data, setActiveSlide, navigation }) {
    const [showTable, setShowTable] = useState(false);

    const [selectedTable, setSelectedTable] = useState('Users');
    const [tableData, setTableData] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const fetchDataForTable = async tableName => {
        try {
            setIsLoading(true);
            const query = `SELECT * FROM ${tableName}`;
            const db = await SQLite.openDatabase({ name: 'news.db', location: 1 });
            const result = await db.executeSql(query);
            const rows = result[0].rows;
            const tableRows = [];

            for (let i = 0; i < rows.length; i++) {
                tableRows.push(rows.item(i));
            }

            setTableData(tableRows);
            setIsLoading(false);
        } catch (err) {
            console.log(err);
            setTableData([]);
        }
    };

    const handleIconPress = (tableName) => {
        if (tableName === selectedTable) {
            setShowTable(!showTable);
        } else {
            setSelectedTable(tableName);
            setShowTable(true);
        }
    };


    useEffect(() => {
        if (selectedTable) {
            fetchDataForTable(selectedTable);
            setShowTable(true);
        }
    }, [selectedTable]);

    const tableItems = useMemo(() => {
        return data.map((item, index) => (
            <TableItem
                key={index}
                icon={item.icon}
                onPress={() => handleIconPress(item.name)}
            />
        ));
    }, [data, handleIconPress]);

    return (
        <>
            <AnimatedText title={selectedTable} />
            <Carousel
                data={data}
                renderItem={({ item, index }) => tableItems[index]}
                firstItem={0}
                inactiveSlideOpacity={0.5}
                sliderWidth={width}
                sliderHeight={width}
                itemWidth={width * 0.62}
                slideStyle={{ display: 'flex', alignItems: 'center' }}
                onSnapToItem={index => {
                    setActiveSlide(index);
                    handleIconPress(data[index].name);
                }}
            />
            {isLoading && (
                <ActivityIndicator style={{ marginTop: 20 }} size={30} color="white" />
            )}
            {showTable && !isLoading && <DataTable data={tableData} tables={data} selectedTable={selectedTable} />}
        </>
    );
}
