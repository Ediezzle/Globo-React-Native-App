import React from 'react';
import {StyleSheet, Text, View, Image, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class Header extends React.Component {
    constructor(props){
        super(props);
        //manipulating state like this without using setState should only be done in the constructor
        console.log('constructor');
        this.state = {
            isLoggedIn: false,
            isLoggedIn: false,
            loggedInUser: false
        };
    }

    toggleUser = ()=>{
        if(this.state.isLoggedIn){
            AsyncStorage.setItem('userLoggedIn', 'none', (err, result)=>{
                this.setState({
                    isLoggedIn: false,
                    loggedInUser: false
                });
                Alert.alert('User logged out');
            });
        }
        else{
            this.props.navigation.navigate('LoginRT');
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('userLoggedIn', (err, result)=>{
            if(result === 'none'){
                console.log('NONE');
            }
            else if (result === null){
                AsyncStorage.setItem('userLoggedIn', 'none', (err, result)=>{
                    console.log('Set user to NONE');
                });
            }
            else {
                this.setState({
                    isLoggedIn: true,
                    loggedInUser: result
                });
            }
        });
    }

    render(){
        let display = this.state.isLoggedIn ? this.state.loggedInUser : this.props.message;
        return (
            <View style = {styles.headStyle}>
                <Image style = {styles.logoStyle} source = {require('./img/Globo_logo_REV.png')} />
                <Text style = {styles.headText} onPress = {this.toggleUser}>{display}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  headText: {
    textAlign: 'right',
    color: '#ffffff',
    fontSize: 20,
    flex: 1
  },
  headStyle: {
      paddingTop: 30,
      paddingRight: 10,
      backgroundColor: '#35605a',
      flex: 1,
      flexDirection: 'row',
      borderBottomWidth: 2,
      borderColor: '#000000'
  },
  logoStyle: {
      flex: 1,
      width: undefined,
      height: undefined
  }
});
