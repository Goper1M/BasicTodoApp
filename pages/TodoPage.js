import React from 'react';
import { StyleSheet, Text, Animated, Button, TouchableOpacity, View } from 'react-native';
import TodoItem from '../components/TodoItems';
import { FlatList } from 'react-native-gesture-handler';


 export default class TodoPage extends React.Component{
     _isMounted = false;

     static navigationOptions = {
         title: 'Todos' // try and put the name of the list here
     }
    constructor (props) {
        super (props);
        let stupid;

        this.state = {
            list:[],
            listId: 3,
            stupid: this.props.navigation.getParam('passedItemId', null)            
        }
    console.log(this.state.stupid)
    }

     
    componentDidMount(){
        this._isMounted = true;
        this.getTodo();

    }

    getTodo(){
        fetch("http://localhost:3000/todo/getbyid", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    listId : this.state.stupid
                }),
       }).then(response => response.json())
         .then ((responseJson) => {
            if(this._isMounted){
                this.setState ({list: responseJson});
            }
        })
        .catch(error => console.log(error)) //to catch the errors if any
    }

    render(){
        return(
            <View style={ styles.container }>
                <FlatList
                    data = { this.state.list }
                    extraData = { this.state }
                    keyExtractor = {( item ) => item.todoId.toString()}
                    renderItem={({ item }) => {
                        
                        if (!item.isCompleted) {
                            return (
                                <View>
                                    <View style = {styles.Item}>
                                        <TouchableOpacity>
                                            <View style={[styles.circle]}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity style = { styles.Item }>
                                            <Text style={[( item.isCompleted ) ? { color: '#FF0000', textDecorationLine: 'line-through' } : {color: '#313131'}],{ fontSize: 14 }}>
                                                { item.todo }
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>


                            )
                        }

                    }}
                />
                <TouchableOpacity>
                    <View style={[styles.circleButton]}/>
                </TouchableOpacity>
            </View>
        )
    }
 }

 const styles = StyleSheet.create({
     container: {
         flex: 1,
         backgroundColor: '#fff'
     },
     container_2:{

     },
     Item: {
        width: '100%',
        height: 40,
        borderBottomColor: '#DDD',
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between',
        paddingLeft: 15,
        backgroundColor: '#fff'

    },
    circle:{ 
        height: 17,
        width: 17,
        borderRadius: 17/2,
        // marginRight: 1,
        // backgroundColor: "#fec",
        borderColor: 'lightgrey',
        borderWidth: 1
    },
    circleButton:{
        height: 45,
        width: 45,
        borderRadius: 45/2,
        // marginRight: 1,
        backgroundColor: "#d33c3d",
        borderColor: '#d33c3d',
        borderWidth: 1,
        margin: 40,
        alignSelf: "flex-end"
    }
 })

