import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { theme } from '../../MovieNewsScreen/theme';
import { width } from '../../../utils/getDimensions';

export default function DataTable({ data }) {
    if (!data || data.length === 0) {
        return <Text style={styles.noDataText}>Данных пока нет.</Text>;
    }

    return (
        <View style={styles.container}>
            <ScrollView horizontal={true}>
                <View style={styles.table}>
                    <View style={styles.headerRow}>
                        {Object.keys(data[0]).map((key) => (
                            <Text style={styles.headerText} key={key}>
                                {key}
                            </Text>
                        ))}
                    </View>
                    {data.map((row, rowIndex) => (
                        <View style={styles.row} key={rowIndex}>
                            {Object.values(row).map((value, columnIndex) => (
                                <Text style={styles.cell} key={columnIndex}>
                                    {value && value.length > 20 ? value.slice(0, 20) + '...' : value}
                                </Text>
                            ))}
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,

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
        fontWeight: 'bold',
        flex: 1,
        marginRight: 16,
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
    },
});