import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function UserTable({ users }) {
    const renderItem = ({ item }) => (
        <View style={styles.row}>
            <Text>{item.userId}</Text>
            <Text>{item.userLogin}</Text>
            <Text>{item.userPassword}</Text>
            <Text>{item.userEmail}</Text>
            <Text>{item.userCity}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Text>User ID</Text>
                <Text>User Login</Text>
                <Text>User Password</Text>
                <Text>User Email</Text>
                <Text>User City</Text>
            </View>
            <FlatList
                data={users}
                renderItem={renderItem}
                keyExtractor={(item) => item.userId.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flexDirection: 'row'
    },
    headerRow: {
        flexDirection: 'row',
        marginHorizontal: 8
    }
})