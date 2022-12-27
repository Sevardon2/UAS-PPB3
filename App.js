import * as React from 'react';
import { View, Text, StyleSheet, Button, Image, FlatList } from 'react-native';
import { Card } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/Home';
import Isi from './src/Isi';
import Mhs from './src/Mhs';


const Stack = createNativeStackNavigator();

function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home}
        options={{
          title: "Data Kampus",
          headerStyle: { backgroundColor:'#006aff' },
          headerTintColor: '#fff'
        }}/>
        <Stack.Screen name="Isi" component={Isi}
        options={{
          title: "Tambah Data Dosen",
          headerStyle: { backgroundColor:'#006aff' },
          headerTintColor: '#fff'
        }}/>
        <Stack.Screen name="Mhs" component={Mhs}
        options={{
          title: "Tambah Data Mahasiswa",
          headerStyle: { backgroundColor:'#006aff' },
          headerTintColor: '#fff'
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;