import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import { theme } from '../../../../MovieNewsScreen/theme';
import { width } from '../../../../../utils/getDimensions';
import Modal from './Modal';
import SQLite from 'react-native-sqlite-storage';
import { tableIdMap } from './tablesMap';
import { Icons } from '../../../../../components/Icons';
import CustomButton from '../../../../../components/customs/CustomButton';

export default function DataTable({ data, tables, selectedTable }) {
    const [tableData, setTableData] = useState(data);
    const [showModal, setShowModal] = useState(false);

    const [selectedRow, setSelectedRow] = useState(null);
    const [deletedRow, setDeletedRow] = useState(null);

    const [editMode, setEditMode] = useState(false);
    const [updatedRows, setUpdatedRows] = useState({});

    const [visibleRows, setVisibleRows] = useState(10);

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
        if (sortColumn.column) {
            setTableData(prevData => {
                return [...prevData].sort((a, b) =>
                    sortColumn.isAscending
                        ? a[sortColumn.column] > b[sortColumn.column]
                            ? 1
                            : -1
                        : b[sortColumn.column] > a[sortColumn.column]
                            ? 1
                            : -1,
                );
            });
        }
    }, [sortColumn]);

    const handleDelete = async () => {
        if (selectedRow === null) return;

        try {
            const db = await SQLite.openDatabase({ name: 'news.db', location: 1 });

            const query1 = `SELECT rowid, ${tableIdMap[selectedTable]} AS id FROM ${selectedTable} LIMIT 1 OFFSET ${selectedRow}`;
            const result = await db.executeSql(query1);
            const row = result[0].rows.item(0);

            if (row !== undefined) {
                const { rowid, id } = row;

                const query =
                    rowid !== undefined
                        ? `DELETE FROM ${selectedTable} WHERE rowid = ?`
                        : `DELETE FROM ${selectedTable} WHERE ${tableIdMap[selectedTable]} = ?`;

                const queryArgs = [rowid !== undefined ? rowid : id];
                await db.executeSql(query, queryArgs);

                console.log('success');
                setDeletedRow(selectedRow);
                setSelectedRow(null);
            } else {
                console.log('row is undefined');
            }
        } catch (err) {
            console.log(err);
        }

        setShowModal(false);
        setTableData(prev => prev.filter((row, i) => i !== selectedRow));
    };

    const handleLongPress = rowIndex => {
        setSelectedRow(rowIndex);
        setShowModal(true);
    };

    const handleShowMore = () => {
        setVisibleRows(prevVisibleRows => prevVisibleRows + 10);
    };

    const handleUpdate = () => {
        setShowModal(false);
        setEditMode(true);
        setUpdatedRows(prev => ({
            ...prev,
            [selectedRow]: { ...tableData[selectedRow] },
        }));
    };

    const handleInputChange = (rowIndex, key, value) => {
        setUpdatedRows(prev => ({
            ...prev,
            [rowIndex]: {
                ...(prev[rowIndex] || {}),
                [key]: value,
            },
        }));
    };

    const handleSave = async () => {
        try {
            const db = await SQLite.openDatabase({ name: 'news.db', location: 1 });

            const updatedData = await Promise.all(
                tableData.map(async (row, rowIndex) => {
                    if (updatedRows[rowIndex]) {
                        const updatedRow = { ...row, ...updatedRows[rowIndex] };

                        const modifiedFields = Object.keys(updatedRows[rowIndex]).filter(
                            key => updatedRows[rowIndex][key] !== row[key],
                        );

                        console.log('Modified fields:', modifiedFields);

                        if (modifiedFields.length > 0) {
                            const setStatements = modifiedFields
                                .map(field => `${field} = ?`)
                                .join(', ');
                            const idField = tableIdMap[selectedTable];
                            const query = `UPDATE ${selectedTable} SET ${setStatements} WHERE ${idField} = ?`;
                            const queryArgs = [
                                ...modifiedFields.map(field => updatedRow[field]),
                                row[idField],
                            ];

                            await db.executeSql(query, queryArgs);
                        }

                        return updatedRow;
                    }
                    return row;
                }),
            );

            setTableData(updatedData);
        } catch (err) {
            console.error(err);
        }

        setEditMode(false);
        setUpdatedRows({});
    };

    return (
        <View style={styles.container}>
            <ScrollView horizontal={true}>
                {showModal && (
                    <Modal
                        showModal={showModal}
                        onPress={() => setShowModal(false)}
                        onDelete={handleDelete}
                        onUpdate={handleUpdate}
                        onSave={handleSave}
                    />
                )}
                <View style={styles.table}>
                    <View style={styles.headerRow}>
                        {Object.keys(tableData[0]).map(key => {
                            if (blockList.includes(key)) {
                                return null;
                            }
                            return (
                                <TouchableOpacity key={key} onPress={() => handleSort(key)}>
                                    <Text style={styles.headerText}>
                                        {key}
                                        {sortColumn.column === key && (
                                            <SortIndicator isAscending={sortColumn.isAscending} />
                                        )}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                    {tableData.map((row, rowIndex) => {
                        if (rowIndex === deletedRow) {
                            return null;
                        } else if (rowIndex >= visibleRows) return null;
                        return (
                            <TouchableOpacity
                                key={rowIndex}
                                onLongPress={() => handleLongPress(rowIndex)}>
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
                                    ]}>
                                    {Object.entries(row).map(([key, value], columnIndex) => {
                                        if (blockList.includes(key)) {
                                            return null;
                                        }
                                        return (
                                            <View key={columnIndex} style={{ flex: 1 }}>
                                                {editMode ? (
                                                    <View>
                                                        {rowIndex === selectedRow ? (
                                                            <TextInput
                                                                style={styles.cell}
                                                                value={
                                                                    String(updatedRows[rowIndex]?.[key]) || ''
                                                                }
                                                                onChangeText={text =>
                                                                    handleInputChange(rowIndex, key, text)
                                                                }
                                                            />
                                                        ) : (
                                                            value !== null &&
                                                            value !== '' && (
                                                                <Text style={styles.cell}>
                                                                    {String(value).length > 14
                                                                        ? String(value).slice(0, 14) + '...'
                                                                        : String(value)}
                                                                </Text>
                                                            )
                                                        )}
                                                    </View>
                                                ) : (
                                                    value !== null &&
                                                    value !== '' && (
                                                        <Text style={styles.cell}>
                                                            {String(value).length > 14
                                                                ? String(value).slice(0, 14) + '...'
                                                                : String(value)}
                                                        </Text>
                                                    )
                                                )}
                                            </View>
                                        );
                                    })}
                                    {editMode && rowIndex === selectedRow && (
                                        <TouchableOpacity
                                            onPress={handleSave}
                                            style={{
                                                flex: 1,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}>
                                            <Text style={{ fontSize: 24 }}>✅</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ScrollView>
            {tableData.length > visibleRows && (
                <TouchableOpacity
                    onPress={handleShowMore}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginVertical: 8,
                    }}>
                    <Icons.EvilIcons name="arrow-down" size={40} color="white" />
                    <Text style={{ fontFamily: 'Inter-Light', opacity: 0.6 }}>
                        Показать ещё
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const SortIndicator = ({ isAscending }) => (
    <Text style={{ color: 'rgb(103 232 249)' }}>
        {isAscending ? ' ⬆️ ' : ' ⬇️ '}
    </Text>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 8,
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
