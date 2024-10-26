import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

const PerfilEditScreen = () => {
  const route = useRoute();
  const { userInfo } = route.params;
  const navigation = useNavigation();
  
  // Defina os estados para os inputs
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState(''); // Estado para confirmar senha
  const [telefone, setTelefone] = useState(''); // Exemplo de outro campo
  const [apartamento, setApartamento] = useState(''); // Exemplo de outro campo
  const [bloco, setBloco] = useState(''); // Exemplo de outro campo
  const [showPassword, setShowPassword] = useState(false); // Para alternar a visibilidade da senha
  const [focusedInput, setFocusedInput] = useState(null); // Para controlar o foco do input

  // Função para navegar para a Home
  async function irPerfil() { 
    navigation.navigate('Perfil', { userInfo: userInfo }); 
  }

  // Função para determinar a cor da borda com base no campo focado
  const getInputBorderColor = (inputName) => {
    return focusedInput === inputName ? '#0068ff' : '#F57201'; // Azul se focado, laranja se não
  };

  // Função chamada ao focar no campo
  const handleInputFocus = (inputName) => {
    setFocusedInput(inputName); // Atualiza o campo atualmente focado
  };

  // Função chamada ao perder o foco do campo
  const handleInputBlur = () => {
    setFocusedInput(null); // Limpa o campo focado
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Atualize suas informações</Text>
      <Text style={styles.infoText}>Edite o(a) usuário(a)</Text>

      <TextInput
        style={[styles.input, { borderColor: getInputBorderColor('nomeCompleto') }]}
        placeholder="Hellen Silva"
        onFocus={() => handleInputFocus('nomeCompleto')}
        onBlur={handleInputBlur}
        value={nomeCompleto}
        onChangeText={setNomeCompleto}
      />

      <TextInput
        style={[styles.input, { borderColor: getInputBorderColor('email') }]}
        placeholder="hellensilva@org.com.br"
        onFocus={() => handleInputFocus('email')}
        onBlur={handleInputBlur}
      />

      <TextInput
        style={[styles.input, { borderColor: getInputBorderColor('senha'), paddingRight: 50 }]}
        placeholder="Digite sua senha"
        secureTextEntry={!showPassword}
        onFocus={() => handleInputFocus('senha')}
        onBlur={handleInputBlur}
        value={senha}
        onChangeText={setSenha}
      />

      <TextInput
        style={[styles.input, { borderColor: getInputBorderColor('confirmarSenha') }]}
        placeholder="Confirme sua senha"
        secureTextEntry
        onFocus={() => handleInputFocus('confirmarSenha')}
        onBlur={handleInputBlur}
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
      />

      <TextInput
        style={[styles.input, { borderColor: getInputBorderColor('telefone') }]}
        placeholder="(00) 12345-6789"
        onFocus={() => handleInputFocus('telefone')}
        onBlur={handleInputBlur}
        value={telefone}
        onChangeText={setTelefone}
      />

      <TextInput
        style={[styles.input, { borderColor: getInputBorderColor('apartamento') }]}
        placeholder="A 1"
        onFocus={() => handleInputFocus('apartamento')}
        onBlur={handleInputBlur}
        value={apartamento}
        onChangeText={setApartamento}
      />

      <TextInput
        style={[styles.input, { borderColor: getInputBorderColor('bloco') }]}
        placeholder="94"
        onFocus={() => handleInputFocus('bloco')}
        onBlur={handleInputBlur}
        value={bloco}
        onChangeText={setBloco}
      />

      <TouchableOpacity style={styles.registerButton} onPress={irPerfil}>
        <Text style={styles.registerButtonText}>Editar</Text>
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
    marginTop: 10,
    marginBottom: 15,
    textAlign: 'center',
    color: '#000',
    fontSize: 25,
    fontWeight: '600',
    width: '100%', 
  },
  infoText: {
    fontSize: 17,
    marginBottom: 25,
  },
  input: {
    height: 55,
    borderWidth: 1,
    marginBottom: 17,
    paddingHorizontal: 10,
    width: 297,
    borderRadius: 15,
  },

  registerButton: {
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#F57201',
    width: 297,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  registerButtonText: {
    color: '#F57201',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PerfilEditScreen;
