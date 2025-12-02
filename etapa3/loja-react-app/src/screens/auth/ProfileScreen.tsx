import React, { useEffect, useState } from "react"; // modificado
import { View, Text, Button, StyleSheet, Image } from "react-native"; // modificado

import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

import { requestProfileById } from "../../services/profileService"; // novo 

function ProfileScreen({ navigation }: any) {
    const { theme, toggleTheme } = useTheme();
    const { logout, userData } = useAuth();
    interface User {
        image: string;
        name: string;
        email: string;
    }

    const [user, setUser] = useState<User | null>(null); // novo

    // novo
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                console.log(userData); // novo
                const userResponse = await requestProfileById(userData?.id); // correção
                if (
                    userResponse &&
                    typeof userResponse === 'object' &&
                    'name' in userResponse &&
                    'email' in userResponse &&
                    'image' in userResponse
                ) {
                    setUser(userResponse as User);
                } else {
                    console.error('Invalid user data received:', userResponse);
                }
                console.log(user);
                setUser(user);
                console.log('Carregou o usuário!');
            }
            catch (error) {
                console.error('Erro ao carregar o perfil do usuário:', error);
            }
        }
        fetchProfile();
    }, []);

        return (
            <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
                {user && <Image source={{ uri: user.image }} style={styles.image}/>}
            <Text style={{ color: theme.colors.text, marginBottom: theme.spacing(1) }}>
                Profile Screen
            </Text>
            <View>
                {user && <Image source={{ uri: user.image }} style={styles.image}/>}
            </View>
            {user && <Text style={styles.text}>{user.name}</Text>}
            {user && <Text style={styles.text}>{user.email}</Text>}

            <Button title="Alternar Tema" color={theme.colors.primary} onPress={toggleTheme}/>
            <Button title="Ir para Detalhes" onPress={ () => navigation.navigate('Details')} />
            <Button title="Sair" onPress={logout}/>
        </View>
    );
}
export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: { // novo
        height: 100,
        width: 100,
    },
    text: { fontSize: 14} // novo
});