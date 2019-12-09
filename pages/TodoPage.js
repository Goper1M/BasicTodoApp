import React from 'react';
import { 
        StyleSheet,
        Text, 
        Animated, 
        Button, 
        TouchableOpacity, 
        View, 
        TextInput, 
        KeyboardAvoidingView, 
        TouchableWithoutFeedback,
        Image,
        Keyboard,
        SafeAreaView } from 'react-native';
import TodoItem from '../components/TodoItems';
import { FlatList } from 'react-native-gesture-handler';


 export default class TodoPage extends React.Component{
     _isMounted = false;

     static navigationOptions = ({navigation})=>{
         return {
            title: navigation.getParam('passedItemName',null),  // try and put the name of the list here
            // headerTintColor: this.state.isVisible ? '#ddd' : null
         }
     }
    constructor (props) {
        super (props);

        this.state = {
            list:[],
            mTextInput: '',
            listId: this.props.navigation.getParam('passedItemId', null),
            parentTodoId: null,
            segmentId: null,
            sortOrder: null,
            priorityLevel: 4,
            dueDate: null,
            isVisible: false,
            // title: this.props.navigation.getParam('passedItemName',null)
                        
        }
    }

     
    componentDidMount(){
        this._isMounted = true;
        this.getTodo();
        this.keyboardDidHideListener = Keyboard.addListener('keyboardWillHide', this._keyboardDidHide)
    }

    componentWillUnmount(){
        this._isMounted = false;
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidHide = () =>{
        this.setState({isVisible: false})
    }

    getTodo(){
        fetch("http://localhost:3000/todo/getbyid", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    listId : this.state.listId
                }),
       }).then(response => response.json())
         .then ((responseJson) => {
            if(this._isMounted){
                this.setState ({list: responseJson});
            }
        })
        .catch(error => console.log(error)) //to catch the errors if any
    }

    showTextInput = () => {
        if(!this.state.isVisible){
            this.setState({ isVisible: true }, () => {
                this.todoInput.focus();

            })

        }else{
            this.setState({ isVisible: false })
        }

    }
    createTodo = () => {
        fetch("http://localhost:3000/todo/create", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                todo : this.state.mTextInput,
                listId : this.state.listId,
                parentTodoId : this.state.parentTodoId,
                segmentId : this.state.segmentId,
                sortOrder : this.state.sortOrder,
                priorityLevel : this.state.priorityLevel,
                dueDate : this.state.dueDate
            }),
        }).then(() => {
            this.getTodo()
        }).catch(error => console.log(error)) //to catch the errors if any
    }

    render(){

        const keyboardVerticalOffset = Platform.OS === 'ios' ? 88 : 0

        return(
            <SafeAreaView style={ styles.container }>
                <KeyboardAvoidingView
                    keyboardVerticalOffset={ keyboardVerticalOffset }
                    behavior='padding'
                    style={{flex:1, backgroundColor: this.state.isVisible ? 'rgba(0,0,0,.1)' : null}}
                >
                <FlatList
                    // contentContainerStyle={{ flex: 1 }}
                    data = { this.state.list }
                    extraData = { this.state }
                    keyExtractor = {( item ) => item.todoId.toString()}
                    renderItem={({ item }) => {
                        
                        if (!item.isCompleted) {
                            return (
                                // <View>
                                    <View style = { styles.Item }>
                                        <TouchableOpacity>
                                            <View style={[styles.checkTodo]}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity style = { styles.todoText }>
                                            <Text style={[( item.isCompleted ) ? { color: '#FF0000', textDecorationLine: 'line-through' } : {color: '#313131'}],{ fontSize: 14 }}>
                                                { item.todo }
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                // </View> 
                            )
                        }
                    }}
                />
                <TouchableOpacity
                    style={ styles.circleButton }
                    onPress={ this.showTextInput }>
                        <Image 
                            style={ styles.circlePlus }
                            source={ require('../images/pluser.png') } />
                </TouchableOpacity>
                    {
                        this.state.isVisible?
                            <View style={ styles.textInput_container }>
                                <TextInput
                                    placeholder={ 'e.g Family lunch on Sunday at noon' }
                                    returnKeyType='done'
                                    onSubmitEditing={() => { this.createTodo() }}
                                    enablesReturnKeyAutomatically= { true }
                                    ref={(input) => { this.todoInput = input }}  // look into this
                                    style={ styles.todoInput }
                                    onChangeText={( todoInput ) => this.setState({ mTextInput: todoInput })}
                                    value={ this.state.mTextInput }/>
                                    
                                <TouchableOpacity>
                                    <View style={{ backgroundColor: 'white', alignItems:'center', height:35, justifyContent:'center' }}>
                                        <Image
                                            style={ styles.send } 
                                            source={ require('../images/add.png') }/>
                                    </View>
                                </TouchableOpacity>
                            </View>: null
                    }
            </KeyboardAvoidingView>
            </SafeAreaView>
        )
    }
 }

 const styles = StyleSheet.create({
     container: {
         flex: 1,
         backgroundColor: '#fff'
     },
     textInput_container:{
        // flexDirection:'column',
        // justifyContent: 'space-between',
        // flex: 1
    },
     Item: {
        width: '100%',
        height: 40,
        borderBottomColor: '#DDD',
        borderBottomWidth: .6,
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between',
        paddingLeft: 15,
        // backgroundColor: '#fff'
    },
    todoText:{
        paddingLeft: 15,
    },
    checkTodo:{ 
        height: 17,
        width: 17,
        borderRadius: 17/2,
        // marginRight: 1,
        // backgroundColor: "#fec",
        borderColor: 'darkgrey',
        borderWidth: 1,
        // borderBottomWidth: 1

    },
    circleButton:{
        height: 45,
        width: 45,
        borderRadius: 45/2,
        // marginRight: 1,
        backgroundColor: "#d33c3d",
        borderColor: '#d33c3d',
        borderWidth: 1,
        position: 'absolute',
        bottom: 5,
        right: 25,
        alignItems:'center',
        justifyContent:'center'
    },
    circlePlus:{
        height: 19,
        width: 19,
    },
    send:{
        height: 20,
        // backgroundColor: 'white',
        width:20,
    },
    todoInput:{
        backgroundColor: 'white',
        // flex: 1,
        fontSize: 15,
        height: 50,
        // marginBottom: 40,
        // borderRadius: 10
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        padding: 12
     },
 })

