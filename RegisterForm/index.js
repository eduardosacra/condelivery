import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Checkbox } from 'react-native-paper'; 
import { useNavigation } from '@react-navigation/native';

const RegisterFormScreen = () => {
  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [isColaborador, setIsColaborador] = useState(false);

  const handleCadastro = () => {
    if (!nome || !email || !senha || !confirmarSenha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não conferem.');
      return;
    }

    const perfil = isColaborador ? 'colaborador' : 'morador';
    Alert.alert('Cadastro realizado!', `Bem-vindo(a), ${nome}. Seu perfil é: ${perfil}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastre-se</Text>
      <Text style={styles.subtitle}>Preencha informações do seu perfil aqui.</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome Completo"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar Senha"
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
        secureTextEntry
      />

      <View style={styles.checkboxContainer}>
        <Checkbox
          status={isColaborador ? 'checked' : 'unchecked'}
          onPress={() => setIsColaborador(!isColaborador)}
        />
        <Text style={styles.label}>Sou colaborador</Text>
      </View>

      <TouchableOpacity style={styles.registerButton} onPress={handleCadastro}>
        <Text style={styles.buttonCriarConta}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginRedirect} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>Já tem uma conta? Faça login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 10,
    marginTop: 10,
  },
  subtitle: {
    marginTop: 15,
    marginBottom: 15,
    textAlign: 'center',
    color: '#666',
    fontSize: 15,
    width: '100%', 
  },
  input: {
    width: 320,
    height: 50,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 15,
    fontSize: 16,
    color: '#000',
    backgroundColor: '#fff', 
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: 320,
  },
  label: {
    marginLeft: 8,
  },
  registerButton: {
    backgroundColor: '#F57201', 
    padding: 15,
    borderRadius: 15,
    width: 320,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonCriarConta: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
  loginRedirect: {
    marginTop: 10,
  },
  loginText: {
    color: '#F57201',
    fontSize: 16,
    fontWeight: '400',
  },
});

export default RegisterFormScreen;
