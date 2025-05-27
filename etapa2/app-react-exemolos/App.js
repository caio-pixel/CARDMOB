import React, { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, TextInput, FlatList, Alert } from 'react-native';

const base_Url = 'http://10.81.205.16:3000';

export default function App() {


  //CRUD em memória
  const [items, setItems] = useState([]);
  const [text, setText] = useState('');
  const [editItemId, setEditItemId] = useState(null);
  const [editItemText, setEditItemText] = useState('');
  // loading... efeito de carregando...
  const [loading, setloading] = useState(false);

  // buscar tudo
  const fetchItems = async () => {
    setloading(true);
    try {
      // executa oque precisa, se der erro entra no cath
      const response = await fetch(`${base_Url}/items`);
      const data = await response.json();
      console.log(JSON.stringify(data));
      setItems(data);
    } catch {
      // quando ocorre algun erro.
      console.error("Error fetching items:", error);
    } finally {
      setloading(false);
    }
  }

  useEffect(() => {
    fetchItems();
  }, [])

  // CREATE
  const addItem = async () => {
    if (text.trim() === '') {
      return;
    }
    try {
      const response = await fetch(`${base_Url}/items`, {
        method: 'POST', 
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({text: text.trim()})
      });
      if (response.ok) {
        await fetchItems();
        setText('');
      }
      else {
        console.error('failed to add item:', response.status);
      }
    } catch (error) {
      console.error('Error adding item:', error);
    }
  }

  //UPDATE
  const updateItem = async (id) => {
    try {
      const response = await fetch(`${base_Url}/items/${id}`,{
        method: 'PUT',
        headers: {
          'content-Type': 'application/json',
        },
        body: JSON.stringify({text: editItemText}),
      });
      if (response.ok){ 
        await fetchItems();
    setEditItemId(null);
    setEditItemText('');
  }
  else {
    console.error('failed to update item', response.status);
  }
}
  catch (error) {
    console.error('Error updating item:', error)
  }
  }

  // DELETE
  const deleteItem = async (id) => {
    Alert.alert(
      'confirm delete',
      'Are you sure you want to delete this item ?',
      [
        { text: 'cancel', style: 'cancel' },
        {text: 'delete',
          onPress: async () => {
            try {
              const response = await fetch(`${base_Url}/items/${id}`, {
                method: 'DELETE'
              });
              if (response.ok) {
                await fetchItems();
              }
              else {
                console.error('failed to delete item', response.status);
              }
            }
             catch (Error) {
              console.error('Error deleting item:', Error);
            }
          },
        }
      ],
      { cancelable: true }
    );
  };

  // READ -> um único item e/ou lista de itens
  const renderItem = ({ item }) => {
    if (item.id != editItemId) {
      return (
        <View style={styles.item}>
          <Text style={styles.itemText}>{item.text}</Text>
          <View style={styles.buttons}>
            <Button title='Edit' onPress={() => { setEditItemId(item.id) }}></Button>
            <Button title='Delete' onPress={() => { deleteItem(item.id) }}></Button>
          </View>
        </View>
      );
    } else {
      // Um item esta sendo editado
      return (
        <View style={styles.item}>
          <TextInput
            style={styles.editInput}
            onChangeText={setEditItemText}
            value={editItemText}
            autoFocus
          />
          <Button title='Update' onPress={() => updateItem(item.id)}></Button>
        </View>
      )
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder='Enter text item'
      />
      <Button
        title='add Item'
        onPress={addItem}
      />
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.list}
      />
      <Text>Olá App React Native - Atualiza!</Text>
      <Image
        source={{ uri: "https://picsum.photos/200" }}
        style={{ width: 200, height: 200 }}
      />
      <StatusBar style="auto" />
      {/* <Text style={styles.text}>Counter: {counter}</Text>

      <View style={styles.buttonContainer}>
        <Button title="increment" onPress={incrementCounter} />
        <Button title="decrement" onPress={decrementCounter} /> */}

      {/* </View> */}
    </View>


  )};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  text: {
    fontSize: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  list: {
    marginTop: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  itemText: {
    flex: 1,
    marginRight: 10,
  },
  buttons: {
    flexDirection: 'row',
  },
  editInput: {
    flex: 1,
    marginRight: 10,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  }
});
