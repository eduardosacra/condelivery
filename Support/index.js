import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SupportScreen = ({ navigation }) => {
  const [mensagens, setMensagens] = useState([
    { id: '1', texto: 'Olá, como posso ajudar você?', enviadoPor: 'suporte', timestamp: new Date().toISOString() },
    { id: '2', texto: 'Estou com problemas no pagamento.', enviadoPor: 'usuario', timestamp: new Date().toISOString() },
  ]);

  const [novaMensagem, setNovaMensagem] = useState('');

  const enviarMensagem = () => {
    if (novaMensagem.trim()) {
      const timestamp = new Date().toISOString();
      setMensagens([...mensagens, { id: (mensagens.length + 1).toString(), texto: novaMensagem, enviadoPor: 'usuario', timestamp }]);
      setNovaMensagem('');

      // Simulando a resposta do suporte após um pequeno delay
      setTimeout(() => {
        responderSuporte();
      }, 1000); // Responde após 1 segundo
    }
  };

  const responderSuporte = () => {
    const resposta = "Entendi, vamos resolver isso para você!";
    const timestamp = new Date().toISOString();
    setMensagens(prevMensagens => [
      ...prevMensagens,
      { id: (prevMensagens.length + 1).toString(), texto: resposta, enviadoPor: 'suporte', timestamp },
    ]);
  };

  const formatarHora = (timestamp) => {
    const date = new Date(timestamp);
    const horas = date.getHours().toString().padStart(2, '0');
    const minutos = date.getMinutes().toString().padStart(2, '0');
    return `${horas}:${minutos}`;
  };

  const renderMensagem = ({ item }) => (
    <View
      style={[
        styles.mensagemItem,
        item.enviadoPor === 'usuario' ? styles.mensagemUsuario : styles.mensagemSuporte,
      ]}
    >
      <Text style={styles.mensagemTexto}>{item.texto}</Text>
      <Text style={styles.mensagemHora}>{formatarHora(item.timestamp)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Suporte</Text>
      </View>

      <FlatList
        data={mensagens}
        renderItem={renderMensagem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.mensagemList}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite sua mensagem..."
          value={novaMensagem}
          onChangeText={setNovaMensagem}
        />
        <TouchableOpacity style={styles.buttonEnviar} onPress={enviarMensagem}>
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 150,
    backgroundColor: '#0068ff',
    padding: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 30,
    marginTop: 10,
    fontWeight: 'bold',
  },
  mensagemList: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  mensagemItem: {
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  mensagemUsuario: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  mensagemSuporte: {
    backgroundColor: '#F1F1F1',
    alignSelf: 'flex-start',
  },
  mensagemTexto: {
    fontSize: 16,
  },
  mensagemHora: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#EEE',
  },
  input: {
    flex: 1,
    backgroundColor: '#F1F1F1',
    borderRadius: 25,
    padding: 10,
    fontSize: 16,
    marginRight: 10,
  },
  buttonEnviar: {
    backgroundColor: '#0068ff',
    borderRadius: 25,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SupportScreen;
