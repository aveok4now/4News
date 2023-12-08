import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { theme } from '../../MovieNewsScreen/theme';

export default function UserTable({ users }) {
    return (
        <View style={styles.container}>
            <ScrollView horizontal={true}>
                <View style={styles.table}>
                    <View style={styles.headerRow}>
                        <Text style={styles.headerText}>User ID</Text>
                        <Text style={styles.headerText}>User Login</Text>
                        <Text style={styles.headerText}>User Password</Text>
                        <Text style={styles.headerText}>User Email</Text>
                        <Text style={styles.headerText}>User City</Text>
                    </View>
                    {users.map((user) => (
                        <View style={styles.row} key={user.userId}>
                            <Text style={styles.cell}>{user.userId}</Text>
                            <Text style={styles.cell}>{user.userLogin}</Text>
                            <Text style={styles.cell}>{user.userPassword}</Text>
                            <Text style={styles.cell}>{user.userEmail}</Text>
                            <Text style={styles.cell}>{user.userCity}</Text>
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