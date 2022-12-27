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
            <View style={{flex:10}}>
    
            </View>
            <Card style={{ flex: 1}} onPress={()=>navigation.navigate('Isi')}>
                <View style={{padding:8, justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={add} style={{ width:40, height:40 }}/>
                </View>
            </Card>
        </View>
    ) 
}
export default Tambah;