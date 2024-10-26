import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';

const ConfigScreen = ({ navigation }) => {
  const [selectedApp, setSelectedApp] = useState('ifood'); // Estado para o aplicativo selecionado
  const route = useRoute();
  const { userInfo } = route.params;



  const toggleSwitch = (app) => {
    // Atualiza o estado para o aplicativo selecionado
    setSelectedApp(app);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTopRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.headerContent}>
          <Text style={styles.headerText}>{userInfo ? userInfo.name : 'Carregando...'}</Text>
        </View>
        <Text style={styles.subHeaderText}>Morador(a)</Text>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.sectionTitle}>Gerenciar preferências</Text>
      </View>

      <Text style={styles.permissionText}>Permitir aplicativos</Text>

      <View style={styles.preferenceContainer}>
        <View style={styles.switchContainer}>
          <Text style={styles.label}>IFood</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#ff6200" }}
            thumbColor={selectedApp === 'ifood' ? "#ff6200" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => toggleSwitch('ifood')}
            value={selectedApp === 'ifood'}
          />
        </View>

        <View style={styles.switchContainer}>
          <Text style={styles.label}>Rappi</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#ff6200" }}
            thumbColor={selectedApp === 'rappi' ? "#ff6200" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => toggleSwitch('rappi')}
            value={selectedApp === 'rappi'}
          />
        </View>

        <View style={styles.switchContainer}>
          <Text style={styles.label}>Zé Delivery</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#ff6200" }}
            thumbColor={selectedApp === 'zeDelivery' ? "#ff6200" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => toggleSwitch('zeDelivery')}
            value={selectedApp === 'zeDelivery'}
          />
        </View>

        <View style={styles.switchContainer}>
          <Text style={styles.label}>Food to Save</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#ff6200" }}
            thumbColor={selectedApp === 'foodToSave' ? "#ff6200" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => toggleSwitch('foodToSave')}
            value={selectedApp === 'foodToSave'}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 150,
    backgroundColor: '#0068ff',
    padding: 20,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  headerText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  subHeaderText: {
    color: 'white',
    fontSize: 15,
    marginTop: 5,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    marginTop: 15,
    paddingHorizontal: 35,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginTop: 20,
  },
  permissionText: {
    fontSize: 16,
    color: '#1A1A1A',
    marginBottom: 20,
    marginTop: 10,
    paddingHorizontal: 35,
    fontWeight: '500',
  },
  preferenceContainer: {
    backgroundColor: '#f9f9f9',
    padding: 30,
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    alignSelf: 'center',
    width: '85%',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#1A1A1A',
    fontWeight: '600',
  },
});

export default ConfigScreen;
