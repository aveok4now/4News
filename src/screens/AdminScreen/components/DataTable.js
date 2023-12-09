import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { theme } from '../../MovieNewsScreen/theme';
import { width } from '../../../utils/getDimensions';

export default function DataTable({ data }) {
    const [tableData, setTableData] = useState(data);

    const blockList = ['Likes', 'liked', 'isLiked', 'isLied'];

    const [sortColumn, setSortColumn] = useState({
        column: null,
        isAscending: true,
    });

    const handleSort = column => {
        if (sortColumn.column === column) {
            setSortColumn({ column, isAscending: !sortColumn.isAscending });
        } else {
            setSortColumn({ column, isAscending: true });
        }
    };

    useEffect(() => {
        let sorted;
        if (sortColumn.column) {
            sorted = [...data].sort((a, b) =>
                sortColumn.isAscending
                    ? a[sortColumn.column] > b[sortColumn.column]
                        ? 1
                        : -1
                    : b[sortColumn.column] > a[sortColumn.column]
                        ? 1
                        : -1,
            );
            setTableData(sorted);
        } else {
            sorted = [...data];
        }
    }, [sortColumn]);

    return (
        <View style={styles.container}>
            <ScrollView horizontal={true}>
                <View style={styles.table}>
                    <View style={styles.headerRow}>
                        {Object.keys(tableData[0]).map(key => {
                            if (blockList.includes(key)) {
                                return null;
                            }
                            return (
                                <Text
                                    style={styles.headerText}
                                    onPress={() => handleSort(key)}
                                    key={key}>
                                    {key}
                                    {sortColumn.column === key && (
                                        <SortIndicator isAscending={sortColumn.isAscending} />
                                    )}
                                </Text>
                            );
                        })}
                    </View>
                    {tableData.map((row, rowIndex) => (
                        <View
                            style={[
                                styles.row,
                                rowIndex === tableData.length - 1 && { borderBottomWidth: 0 },
                                {
                                    backgroundColor:
                                        rowIndex % 2 === 0
                                            ? theme.bgWhite(0.05)
                                            : theme.bgWhite(0.25),
                                },
                            ]}
                            key={rowIndex}>
                            {Object.entries(row).map(([key, value], columnIndex) => {
                                if (blockList.includes(key)) {
                                    return null;
                                }
                                return (
                                    <Text style={styles.cell} key={columnIndex}>
                                        {value && value.length > 20
                                            ? value.slice(0, 20) + '...'
                                            : value}
                                    </Text>
                                );
                            })}
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const SortIndicator = ({ isAscending }) => (
    <Text style={{ color: 'rgb(103 232 249)' }}>{isAscending ? '⬆️' : '⬇️'}</Text>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 16,
    },
    table: {
        backgroundColor: theme.bgWhite(0.1),
        //width: width
    },
    headerRow: {
        flexDirection: 'row',
        backgroundColor: theme.bgWhite(0.2),
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    headerText: {
        fontFamily: 'Inter-ExtraBold',
        flex: 1,
        marginRight: 16,
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    cell: {
        flex: 1,
        marginRight: 16,
        fontFamily: 'Inter-Light',
        textAlign: 'center',
    },
});
