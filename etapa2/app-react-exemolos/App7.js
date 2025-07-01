import React, { useState, useEffect } from "react";
import {StyleSheet,Text,View,TextInput,Button,FlatList,Alert,Image,} from "react-native";

const BASE_URL = "http://10.0.2.2:5000";

export default function App() {
  const [catalog, setCatalog] = useState([]);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [descricao, setDescricao] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [editNome, setEditNome] = useState("");
  const [editPreco, setEditPreco] = useState("");
  const [editDescricao, setEditDescricao] = useState("");

  const fetchCatalog = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/catalog?page=1`);
      const data = await res.json();

      // Se o backend retornar apenas um array
      setCatalog(Array.isArray(data) ? data : data.catalog);
    } catch (error) {
      console.error("Erro ao encontra catálogo:", error);
    }
  };

  useEffect(() => {
    fetchCatalog();
  }, []);

  const adicionarItem = async () => {
    if (!nome.trim() || !preco.trim() || !descricao.trim()) {
      Alert.alert("Atenção", "Preencha todos os campos.");
      return;
    }

    try {
      await fetch(`${BASE_URL}/api/catalog`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nome.trim(),
          price: parseFloat(preco),
          description: descricao.trim(),
        }),
      });
      setNome("");
      setPreco("");
      setDescricao("");
      fetchCatalog();
    } catch (error) {
      console.error("Erro ao adicionar item:", error);
    }
  };

  const atualizarItem = async (id) => {
    if (!editNome.trim() || !editPreco.trim() || !editDescricao.trim()) {
      Alert.alert("Atenção", "Preencha todos os campos.");
      return;
    }

    try {
      await fetch(`${BASE_URL}/api/catalog/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editNome.trim(),
          price: parseFloat(editPreco),
          description: editDescricao.trim(),
        }),
      });
      setEditandoId(null);
      setEditNome("");
      setEditPreco("");
      setEditDescricao("");
      fetchCatalog();
    } catch (error) {
      console.error("Erro ao atualizar item:", error);
    }
  };

  const deletarItem = (id) => {
    Alert.alert("Confirmar", "Deseja apagar este item?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Apagar",
        style: "destructive",
        onPress: async () => {
          try {
            await fetch(`${BASE_URL}/api/catalog/${id}`, {
              method: "DELETE",
            });
            fetchCatalog();
          } catch (error) {
            console.error("Erro ao deletar item:", error);
          }
        },
      },
    ]);
  };

  const renderItem = ({ item }) => {
    if (item.id === editandoId) {
      return (
        <View style={styles.itemEditando}>
          <TextInput
            style={styles.input}
            value={editNome}
            onChangeText={setEditNome}
            placeholder="Nome"
          />
          <TextInput
            style={styles.input}
            value={editPreco}
            onChangeText={setEditPreco}
            placeholder="Preço"
            keyboardType="decimal-pad"
          />
          <TextInput
            style={styles.input}
            value={editDescricao}
            onChangeText={setEditDescricao}
            placeholder="Descrição"
          />
          <Button title="Salvar" onPress={() => atualizarItem(item.id)} />
        </View>
      );
    }

    return (
      <View style={styles.item}>
        {item.image ? (
          <Image source={{ uri: item.image }} style={styles.image} />
        ) : null}
        <View style={{ flex: 1 }}>
          <Text style={styles.itemText}>{item.name}</Text>
          <Text style={styles.itemText}>R$ {item.price.toFixed(2)}</Text>
          <Text style={styles.itemDescricao}>{item.description}</Text>
        </View>
        <View style={styles.buttonsVertical}>
          <View style={styles.buttonSpacing}>
            <Button
              title="Editar"
              color="#007bff"
              onPress={() => {
                setEditandoId(item.id);
                setEditNome(item.name);
                setEditPreco(item.price.toString());
                setEditDescricao(item.description);
              }}
            />
          </View>
          <Button
            title="Excluir"
            color="#dc3545"
            onPress={() => deletarItem(item.id)}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Catálogo de Produtos</Text>

      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Nome do produto"
      />
      <TextInput
        style={styles.input}
        value={preco}
        onChangeText={setPreco}
        placeholder="Preço"
        keyboardType="decimal-pad"
      />
      <TextInput
        style={styles.input}
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Descrição"
      />
      <View style={styles.buttonSpacing}>
        <Button title="Adicionar Produto" onPress={adicionarItem} />
      </View>

      <FlatList
        data={catalog}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        style={{ marginTop: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 45,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
  },
  buttonSpacing: {
    marginVertical: 10,
  },
  addButton: {
    backgroundColor: '#2196f3',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  item: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 2,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 140,
    borderRadius: 10,
    marginBottom: 12,
    resizeMode: 'cover',
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  itemDescricao: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginTop: 4,
  },
  buttonsVertical: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
    width: '100%',
  },
  editarBtn: {
    backgroundColor: '#1976d2',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  excluirBtn: {
    backgroundColor: '#d32f2f',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  itemEditando: {
    backgroundColor: '#fff9c4',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 2,
  },
});


