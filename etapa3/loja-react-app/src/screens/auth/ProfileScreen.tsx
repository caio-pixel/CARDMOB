import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
// EXCLUIR: import { useNavigation } from "@react-navigation/native";
import { useTheme } from '../../context/ThemeContext'; // Nova
import { useAuth } from '../../context/AuthContext'

function ProfileScreen({ navigation }: any) { // INCLUIR {navigation}: any
    // EXCLUIR const navigation = useNavigation();
    const { theme, toggleTheme } = useTheme();
    const { logout } = useAuth();
    return (
        <View 
        style={[styles.container, {backgroundColor: theme.colors.background}]}>
            <Text style={{ color: theme.colors.text, marginBottom: theme.spacing(1) }}>
                Profile Screen
            </Text>
            <Button title="Alternar Tema" color={theme.colors.primary} onPress={toggleTheme}/>
            <Button title="Ir para Detalhes" onPress={ () => navigation.navigate('Details')} />
            <Button title="sair" onPress={ logout }/>
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
});