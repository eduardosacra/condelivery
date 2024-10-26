import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../Services/api';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [senhaFocused, setSenhaFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // Estado para a mensagem de erro
  const [modalVisible, setModalVisible] = useState(false); // Estado para controle do modal

  async function irHome() {
    try {
      var response = await api.post(
        `/login`,
        { email: email, password: senha },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      
      navigation.navigate('Home', { userData: response.data });
    } catch (error) {
      setErrorMessage('Usuário invalido. Verifique suas credenciais.'); // Atualiza a mensagem de erro
      setModalVisible(true); // Exibe o modal
    }
  }

  async function esqueciSenha() {
    navigation.navigate('RecoverPassword');
  }

  async function cadastrar() {
    navigation.navigate('RegisterForm');
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Text style={styles.title}>Bem-vindo</Text>

        <TextInput
          style={[styles.input, emailFocused && styles.inputFocused]}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder='E-mail'
          placeholderTextColor={'#BCBCBC'}
          selectionColor={'rgba(245, 114, 1, 0.2)'}
          onFocus={() => setEmailFocused(true)}
          onBlur={() => setEmailFocused(false)}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, senhaFocused && styles.inputFocused, { paddingRight: 50 }]}
            onChangeText={(text) => setSenha(text)}
            value={senha}
            placeholder="Digite sua senha"
            placeholderTextColor={'#BCBCBC'}
            selectionColor={'rgba(245, 114, 1, 0.2)'}
            secureTextEntry={!showPassword}
            onFocus={() => setSenhaFocused(true)}
            onBlur={() => setSenhaFocused(false)}
          />
        </View>

        <TouchableOpacity onPress={esqueciSenha} style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.newButton} onPress={irHome}>
          <Text style={styles.textoBotao}>Entrar na conta</Text>
        </TouchableOpacity>
        <Text style={styles.orText}>ou entrar com</Text>

        <View style={styles.socialButtonContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.buttonClicar}>G</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.buttonClicar}>F</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.noAccountText}>Não possui uma conta?</Text>
        <TouchableOpacity style={styles.registerButton} onPress={cadastrar}>
          <Text style={styles.registerButtonText}>Cadastre-se</Text>
        </TouchableOpacity>
        <Image
          source={require('../assets/Titulo.png')}
          style={styles.logoImage}
        />
      </View>

      {/* Modal de erro */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} // Fecha o modal ao clicar fora
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>{errorMessage}</Text>
            <TouchableOpacity 
              style={styles.modalButton} 
              onPress={() => setModalVisible(false)} // Fecha o modal
            >
              <Text style={styles.modalButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  imageContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  input: {
    height: 55,
    borderWidth: 1,
    marginBottom: 17,
    paddingHorizontal: 10,
    width: 297,
    borderRadius: 15,
  },
  inputFocused: {
    borderWidth: 2,
    borderColor: '#F57201',
  },
  passwordContainer: {
    position: 'relative',
    width: 297,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#F57201',
    textDecorationLine: 'underline',
  },
  newButton: {
    borderRadius: 15,
    backgroundColor: '#F57201',
    shadowColor: 'rgba(0, 0, 0, 0.12)',
    width: 297,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  textoBotao: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  orText: {
    marginVertical: 20,
    fontSize: 14,
    color: '#B1A1A1A',
  },
  socialButtonContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  socialButton: {
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginRight: 10,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonClicar: {
    color: '#0074D9',
    fontSize: 20,
    fontWeight: 'bold',
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
  logoImage: {
    width: 115,
    height: 23.94,
    marginTop: 27,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo escurecido
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    color: 'red', // Cor da mensagem
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#F57201',
    borderRadius: 10,
    padding: 10,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Login;
