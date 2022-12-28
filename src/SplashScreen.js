import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import Home from './Home';
import logo from './logo.png';

import { StackActions } from '@react-navigation/native';

class SplashScreen extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }

    componentDidMount(){
        setTimeout(() => {
            this.props.navigation.dispatch(StackActions.replace('Home'))
        }, 3000)
    }

    render(){
        return(
            <View style={{flex:1}}>
            <View style={{flex:1}}></View>
            <View style={{alignItems:'center', justifyContent:'center', flex:2}}>
                <Image source={logo} style={{width: 216, height: 216}}></Image>
                <Text style={{color:'black'}}>Loading...</Text>
            </View>
            <View style={{flex:1}}></View>
            </View>
        )
    }
}

export default SplashScreen;