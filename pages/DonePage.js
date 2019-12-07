import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import TodoItem from '../components/TodoItems';

export default class DonePage extends React.Component{
    static navigationOptions = {
        title: 'Completed'
    }
    constructor (props) {
        super (props);

        this.state= {
            list:[]
            // receivedTodos: this.props.navigation.getParam ('passedTodos', 'temp')   
        }

        // console.log(list);
    }
    componentDidMount(){
        
        fetch("http://localhost:3000/list/getAllActiveParent")
        .then(response => response.json())
        .then((responseJson)=> {
        this.setState({list:responseJson})
        })
        .catch(error=>console.log(error)) //to catch the errors if any
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