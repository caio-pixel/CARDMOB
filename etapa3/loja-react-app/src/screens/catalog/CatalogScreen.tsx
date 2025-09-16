import React, { use, useContext, useEffect } from 'react';
import { useState } from 'react';
import { View, FlatList, StyleSheet, Text, Button } from 'react-native';

import CatalogCard from './CatalogCard';
import { getCatalog } from '../../services/CatalogServices';

const CatalogScreen = ({ navigation }: any) => {
  const [catalog, setCatalog] = useState<any[]>([]);
  
  useEffect(() => {
    const fetchCatalog = async () => {
     try {
       const data = await getCatalog();
       setCatalog(data);
     } catch (error) {
       console.error('Não encontrado:', error);
     }
    }
    fetchCatalog();
    console.log(catalog);
    
  }, []);

  const loadCatalog = async () => {
    let catalogItems = await getCatalog();
    setCatalog(catalogItems);
  };

  // useEffect(() => {
  //     const catalogItems = async() => {
  //     let catalogItems = await getCatalog();
  //     console.log('catalog');
  //     console.log('catalogItems');
  //     setCatalog(catalogItems);
  //     }
  //     catalogItems();
  //     console.log(catalog);
  // }, [])

  const handleBuyPress = (product: any) => {
    console.log(product);
  };

  const renderItem = ({ item }: any) => (
    <CatalogCard product={item} onBuyPress={() => handleBuyPress(item)} />
  );

  return (
    <View style={styles.container}>
      <Text>Menu</Text>
      <FlatList
        data={catalog}
        renderItem={renderItem}
        keyExtractor={(item: any) => item.id.toString()}
      />
      <Button title="Load Catalog" onPress={loadCatalog} />
    </View>
  );
};

export default CatalogScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: 'f8f8f8',
  },
});