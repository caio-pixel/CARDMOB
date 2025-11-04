import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  Button,
  Platform,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import Constants from 'expo-constants';

export const { apiUrl } = Constants.expoConfig?.extra || {};

export default function ProfileScreen({ navigation }: any) {
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        console.log('API URL:', apiUrl);
        console.log('Buscando usuário em:', `${apiUrl}/api/users/1`);

        const response = await fetch(`${apiUrl}/api/users/1`);

        console.log('Status:', response.status, response.statusText);

        if (!response.ok) {
          const text = await response.text();
          console.error('Erro body:', text);
          throw new Error('Erro ao buscar usuário');
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Erro ao carregar usuário:', error);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  if (loading) {
    return (
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={{ color: theme.colors.text, marginTop: 10 }}>
          Carregando perfil...
        </Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <Text style={{ color: theme.colors.text }}>
          Erro ao carregar usuário.
        </Text>
      </View>
    );
  }

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Image
        source={ user.image ? { uri: user.image } : require('../../../assets/avatar.png') }

        style={styles.avatar}
      />

      <Text style={[styles.name, { color: theme.colors.text }]}>
        {user.name}
      </Text>
      <Text style={[styles.email, { color: theme.colors.text }]}>
        {user.email}
      </Text>

      <View style={{ marginTop: 20 }}>
        <Button
          title="Alternar Tema"
          color={theme.colors.primary}
          onPress={toggleTheme}
        />
        <View style={{ marginTop: 10 }}>
          <Button
            title="Ir para Detalhes"
            onPress={() => navigation.navigate('Details')}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Button title="Sair" onPress={logout} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  avatar: { width: 120, height: 120, borderRadius: 10, marginBottom: 10 },
  name: { fontSize: 20, fontWeight: '600', marginBottom: 8, color: 'blue' },
  email: { fontSize: 14, color: 'yellow' },
});