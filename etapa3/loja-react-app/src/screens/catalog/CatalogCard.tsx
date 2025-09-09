import React, {useContext} from "react";
import {View, Text, Image, StyleSheet, Button} from 'react-native'

const CatalogCard = ({ product, onBuyPress }:any) => {
    return (
        <View style={style.card}>
            <Image
                source={{ uri: product.image }}
                style={style.image}
            />
            <View style={style.Details}>
                  <Text style={style.name}>{product.name}</Text>
                  <Text style={style.description}>{product.description}</Text>
                  <Text style={style.price}>R${product.price.toFixed(2)}</Text>
                  <View style={style.buttonsContainer}>
                    <Button 
                    title="comprar" 
                    color="#28A745"
                    onPress={onBuyPress}
                    />

                </View>
            </View>
          
        </View>
    )
}
export default CatalogCard;

const style = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 15,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2,
    },
    image: { 
        width: '100%',
        height: 150,
        borderRadius: 8,
        marginBottom: 8,
    },
Details:{
        marginBottom: 8,
},
name:{

},
description:{

},
price:{

},
buttonsContainer:{

}
});