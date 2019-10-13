import React from 'react';
import {Text, StyleSheet, View, ActivityIndicator} from 'react-native';
import * as firebase from 'firebase';


export default class LoadingPage extends React.Component{
    

    static navigationOptions = {
        header: null
    }
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.loading_container}>
                    <Text style={styles.title}>Loading...</Text>
                    <ActivityIndicator size='large' color='#333'/>
                </View>
            </View>
        );
    };
    componentDidMount=()=>{
        var app = this.props.navigation.navigate('App')

        // use the ES6 syntax here to pass in scope and get rid of the 'function' name
        firebase.auth().onAuthStateChanged((user) =>{
            if (user) {
                this.props.navigation.navigate('App')
            }else {
                this.props.navigation.navigate('Auth')
            }
        })
    }  
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    loading_container:{
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1

    },
    title: {
        fontSize: 18,
        marginBottom: 10
        // justifyContent: 'center'
        // alignItems: 'center'
        // alignContent: 'center'
    }
})