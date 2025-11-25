import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, FlatList, SafeAreaView } from "react-native";

import { useAuth } from "../../context/AuthContext";
import { getOrders, updateOrderStatus } from "../../services/orderService";

function ManagerOrdersScreen({ navigation }: any) {
    const { user, userData } = useAuth();
    const [ordersList, setOrdersList] = useState([]);

    const loadOrders = async () => {
        const data = await getOrders(user);
        setOrdersList(data.orders); // agora FUNCIONA
    };

    useEffect(() => {
        if (!userData?.is_admin) {
            navigation.navigate("OrderInfo");
            return;
        }
        loadOrders();
    }, [userData]);

    const renderItem = ({ item }: any) => (
        <View style={styles.card}>
            <Text style={styles.title}>{item.customerName}</Text>
            <Text style={styles.statusValue}>{item.status}</Text>

            <Text style={styles.label}>Endereço: {item.customerAddress}</Text>
            <Text style={styles.label}>Telefone: {item.customerPhone}</Text>
            <Text style={styles.label}>Total: R$ {item.totalPrice.toFixed(2)}</Text>

            <Text style={styles.itemHeader}>Produtos:</Text>
            {item.orderOffering.map((orderItem: any, index: number) => (
                <Text key={index} style={styles.itemDetails}>
                    {orderItem.offering.name} - x{orderItem.quantity} - R$ {orderItem.subtotal.toFixed(2)}
                </Text>
            ))}

            <View style={styles.buttonContainer}>
                {["Em Preparação", "A Caminho", "Entregue", "Cancelado"].map((status, index) => (
                    <View key={index} style={styles.buttonWrapper}>
                        <Button
                            title={status}
                            color="grey"
                            onPress={async () => {
                                await updateOrderStatus(item.id, status, user);
                                loadOrders();
                            }}
                        />
                    </View>
                ))}
            </View>
        </View>
    );

    if (!userData?.is_admin) return null;

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={ordersList}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ padding: 10 }}
            />
        </SafeAreaView>
    );
}

export default ManagerOrdersScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: "#fff",
    },
    card: {
        padding: 15,
        marginBottom: 10,
        backgroundColor: "#fff",
        borderRadius: 8,
        elevation: 2,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
    },
    label: {
        fontSize: 16,
        marginVertical: 2,
    },
    itemHeader: {
        fontWeight: "bold",
        marginTop: 10,
    },
    itemDetails: {
        fontSize: 15,
        marginVertical: 2,
    },
    statusValue: {
        fontWeight: "bold",
        color: "orange",
        padding: 4,
        borderRadius: 5,
        marginTop: 5,
    },
    buttonContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginTop: 15,
    },
    buttonWrapper: {
        width: "48%",
        marginBottom: 10,
    },
});
