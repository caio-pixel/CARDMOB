import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';


class List extends Component {
    state = {
        names: [
            { id: 0, name: 'caio' },
            { id: 1, name: 'ben' },
            { id: 2, name: 'robert' },
            { id: 3, neme: 'christinr' }
        ]
    }

    alertItemName = (item) => {
        alert(item.name);
    }

    render() {
        return (
            <View>
                <Text style={styles.text}>
                    Lista de items "clicaveis"
                </Text>
            </View>
        );
    }
}
export default List;

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginTop: 3,
        backgroundColor: '#d9f9b1',
        alignItems: 'center',
    },
    text: {
        color: '#4f603c',
    }
});