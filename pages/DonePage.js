import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class DonePage extends React.Component{
    static navigationOptions = {
        title: 'Completed'
    }
    constructor () {
        super ();
    }

    render(){
        return(
            <View style = { style.container }>
                <Text>New Page!</Text>
            </View>
        );
    };
};


const style = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    statusbar: {
      backgroundColor: '#FFCE00',
      height: 44
    } 
  });