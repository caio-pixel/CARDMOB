import React, { useState } from "react";
import {View, Text, TextInput, Image, StyleSheet} from 'react-native';

import * as ImagePicker from 'expo-image-picker';

import { useShop } from "../../context/ShopContext";

function CatalogEdit({navigation}: any) {
    const [itemImage, setItemImage] = useState(null);
    const editingItem = useShop().editingItem as unknown as { image: string }; // Ensure editingItem has the correct type

    return (
        <View>
            <Text>Editando produto</Text>
            <Image source={{uri: editingItem.image}} />
        </View>
    );

}
export default CatalogEdit;

const styles = StyleSheet.create({
    container: {}
});