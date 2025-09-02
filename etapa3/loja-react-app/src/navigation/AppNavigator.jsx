import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootStackParamList, TabParamList } from '././types';
import FontAwesome from '@expo/vector-icons/FontAwesome';

// Tela pública.
import HomeScreen from '../screens/HomeScreen';
// importar depois que implementar: DetailsScreen, SettingsScreen
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';

const AppStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
 <Tab.Navigator screenOptions={({ route, navigation }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home";
          }
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabActiveTintColor: "red",
        tabBarInactiveTintColor: "grey",
        headerShown: false,
      })}>
      
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={HomeScreen} />
      <Tab.Screen name="Register" component={RegisterScreen} />
    </Tab.Navigator>
  );
}

function StackNavigator() {
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="Details"
        component={HomeScreen}
        options={{ title: 'Detalhes' }}
      />
      <AppStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: 'Acessar' }}
      />
    </AppStack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <StackNavigator/>
  );
}
