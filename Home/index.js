import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView, Dimensions } from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import api from '../Services/api';

const { width, height } = Dimensions.get('window'); 

const HomeScreen = ({ navigation }) => {
  const route = useRoute();
  const { userData } = route.params;
  const [userInfo, setUserInfo] = useState(null);
  const [deliveries, setDeliveries] = useState([
    { id: '1', status: 'A caminho', code: '#0A8445', authorized: false },
    { id: '2', status: 'Pendente', code: '#03D0DA', authorized: false },
  ]);

  useFocusEffect(
    useCallback(() => {
      const fetchUserInfo = async () => {
        try {
          const response = await api.get(`/user/${userData.data.id}`, {
            headers: {
              token: userData.data.token,
            },
          });
          setUserInfo(response.data);
        } catch (error) {
          console.error('Erro ao buscar informações do usuário:', error);
        }
      };

      fetchUserInfo();
    }, [userData.data.id, userData.data.token])
  );

  const renderItem = ({ item }) => (
    <View style={styles.deliveryItem}>
      <Text style={styles.deliveryText}><Text style={styles.boldText}>Entrega:</Text> #{item.code}</Text>
      <Text style={styles.deliveryText}><Text style={styles.boldText}>Status:</Text> {item.status}</Text>
      <Text style={styles.deliveryText}><Text style={styles.boldText}>Código de recebimento:</Text> 1234</Text>
      <View style={styles.starContainer}>
        <FontAwesome5 name="star" size={20} color="#1a1a1a" />
        <FontAwesome5 name="star" size={20} color="#1a1a1a" />
        <FontAwesome5 name="star" size={20} color="#1a1a1a" />
        <FontAwesome5 name="star" size={20} color="#1a1a1a" />
        <FontAwesome5 name="star" size={20} color="#ccc" />
      </View>
      <Text style={styles.reviewText}>Avaliar Entrega</Text>
    </View>
  );

  const irPerfil = () => {
    navigation.navigate('Perfil', {userData: userData.data, userInfo: userInfo });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.header}>
          <View style={styles.headerTopRow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.headerContent}>
            <Text style={styles.headerText}>{userInfo ? userInfo.name : 'Carregando...'}</Text>
            <TouchableOpacity onPress={irPerfil} />
          </View>
          <Text style={styles.subHeaderText}>Morador(a)</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Colaboradores Ativos</Text>
          <View style={styles.iconsContainer}>
            {[...Array(6)].map((_, index) => (
              <FontAwesome5 key={index} name="user-circle" size={20} color="black" />
            ))}
            <TouchableOpacity onPress={() => navigation.navigate('Collaborators')}>
              <Text style={styles.viewAllText}>Ver todos</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Entregas Ativas</Text>
          <FlatList
            data={deliveries}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.deliveryList}
          />
        </View>
      </ScrollView>

      <View style={styles.bottomNavigation}>
        <TouchableOpacity onPress={() => navigation.navigate('Preferences', {userData: userData.data, userInfo: userInfo })}>
          <FontAwesome5 name="cog" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Support')}>
          <FontAwesome5 name="headphones" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={irPerfil}>
          <FontAwesome5 name="user-circle" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Ionicons name="exit-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 60, // Espaço para o BottomNavigation
  },
  header: {
    height: height * 0.2,
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
    marginTop: 15,
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  subHeaderText: {
    color: '#F5F5F5',
    fontSize: 14,
    marginTop: 5,
  },
  deliveryList: {
    paddingBottom: 10,
  },
  section: {
    backgroundColor: '#fff',
    marginVertical: 10,
    padding: 8,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
    marginLeft: 15,
    fontWeight: '600',
  },
  viewAllText: {
    fontSize: 14,
    color: '#f57201',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingHorizontal: 20,
    gap: 20,
  },
  deliveryItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  deliveryText: {
    fontSize: 16,
    marginBottom: 5,
  },
  boldText: {
    fontWeight: 'bold',
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  reviewText: {
    fontSize: 16,
    marginTop: 15,
    color: '#f57201',
    textAlign: 'left',
    fontWeight: '600',
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#0068ff',
    paddingVertical: 20,
  },
});

export default HomeScreen;
