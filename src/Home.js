import * as React from 'react';
// import { Component } from 'react';
import { View, Text, StyleSheet, Button, Image, FlatList } from 'react-native';
import { Title, Card } from 'react-native-paper';
// import { useNavigation } from '@react-navigation/native';
import add from "../icon/add.png";

// class Home extends Component {
    
// }

    
const Tambah = ({navigation}) => {

    

    return(
        <View style={{flex:1}}>
            {/* <View style={{flex:10}}>
    
            </View> */}
            <Text style={{ textAlign:'center', fontSize:20, fontWeight:'bold' }}>Data Dosen</Text>
            <Card style={{ margin: 3 }} onPress={()=>navigation.navigate('Isi')}>
                <View style={{padding:8, justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={add} style={{ width:40, height:40 }}/>
                </View>
            </Card>
            <Text style={{ textAlign:'center', fontSize:20, fontWeight:'bold' }}>Data Mahasiswa</Text>
            <Card style={{ margin: 3 }} onPress={()=>navigation.navigate('Mhs')}>
                <View style={{padding:8, justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={add} style={{ width:40, height:40 }}/>
                </View>
            </Card>
        </View>
    ) 
}
export default Tambah;