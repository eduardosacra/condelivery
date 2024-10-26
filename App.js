import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Register from './Register/index';
import RegisterForm from './RegisterForm/index'
import Login from './Login';
import Home from './Home/index';
import Perfil from './Perfil/index';
import RecoverPassword from './RecoverPassword/index'
import PerfilEdit from './PerfilEdit/index';
import Preferences from './Preferences/index';
import Support from './Support/index';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerTitle: '', headerShown: false }}
        />

        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerTitle: '', headerShown: false }}
        />
       

         <Stack.Screen
          name="RegisterForm"
          component={RegisterForm}
          options={{ headerTitle: '', headerShown: false }}
        />

        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerTitle: '', headerShown: false }}
        />

        <Stack.Screen
          name="Perfil"
          component={Perfil}
          options={{ headerTitle: '', headerShown: false }}
        />

         <Stack.Screen
          name="RecoverPassword"
          component={RecoverPassword}
          options={{ headerTitle: '', headerShown: false }}
        />

        <Stack.Screen
          name="PerfilEdit"
          component={PerfilEdit}
          options={{ headerTitle: '', headerShown: false }}
        />

        <Stack.Screen
          name="Preferences"
          component={Preferences}
          options={{ headerTitle: '', headerShown: false }}
        />

        <Stack.Screen
          name="Support"
          component={Support}
          options={{ headerTitle: '', headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
