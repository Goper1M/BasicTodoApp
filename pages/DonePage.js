import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import TodoItem from '../components/TodoItems';

export default class DonePage extends React.Component{
    static navigationOptions = {
        title: 'Completed'
    }
    constructor (props) {
        super (props);

        this.state= {
            receivedTodos: this.props.navigation.getParam ('passedTodos', 'temp')
        }
        // console.log(receivedTodos);
    }

    unComplete = (itemId) => {

        let receivedTodos = this.state.receivedTodos;
        receivedTodos.forEach(mtodo => {
            if (itemId === mtodo.id && mtodo.done){
                mtodo.done = false;
            }
        })
        this.setState({receivedTodos})
    }

    

    render(){
        // const mdata = props.receivedTodos;
        // console.log(mdata);
        // let receivedTodos = this.props.navigation.getParam ('passedTodos', 'temp');
        // console.log(receivedTodos);
        return(
            <View style = { style.container }>
                {/* <Text></Text> */}
                <FlatList
                    data={this.state.receivedTodos}
                    extraData= {this.state}
                    keyExtractor={( item, index ) => index.toString()}
                    renderItem={({ item, index }) => {
                        if (item.done){
                            return (
                                <TodoItem
                                    todoItem={item}
                                    completed={(itemId) => this.unComplete(itemId)}
                                />
                            )
                        }
                    }}
                />
            </View>
        );
    };

}


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