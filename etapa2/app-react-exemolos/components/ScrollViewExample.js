import React, { Component } from "react";
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

class ScrollViewExample extends Component {
    state = {
        names: [
            { 'name': 'ben', 'id': 1 },
            { 'name': 'laura', 'id': 2 },
            { 'name': 'luana', 'id': 3 },
            { 'name': 'kleti', 'id': 4 },
            { 'name': 'mikaeli', 'id': 5 },
            { 'name': 'caio', 'id': 6 },
            { 'name': 'felipe', 'id': 7 },
            { 'name': 'lucas', 'id': 8 },
            { 'name': 'pedro', 'id': 9 },
        ]
    }

    render() {
        return (
            <View>
                <ScrollView>
                    {
                        this.state.names.map((item, index) => (
                            <View
                                key={item.id}
                                style={styles.item}
                            >
                                <Image source={require('../assets/favicon.png')} />
                                <Text>{item.name}</Text>

                            </View>
                        ))
                    }
                </ScrollView>
            </View>
        )
    }
}

export default ScrollViewExample;

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 30,
        margin: 2,
        borderColor: '#2a4944',
        borderWidth: 1,
        backgroundColor: '#d2f7f1'
    }
});