import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Header} from '../sections/Header';
import {Hero} from '../sections/Hero';
import {Menu} from '../sections/Menu';
import {StackNavigator} from 'react-navigation';

export default class Home extends React.Component {

    static navigationOptions = {
        header: null
    }

    componentDidMount(){
        console.log('Home', this.props);
    }

    render(){
        const navigation = this.props.navigation;
        return (
            <View style = {styles.container}>
                <Header message = 'Press Login' />
                <Hero />
                <Menu navigation={this.props.navigation} />   
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});



