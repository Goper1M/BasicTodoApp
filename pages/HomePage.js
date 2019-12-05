import React from 'react';
import InputBar from '../components/InputBar';
import TodoItem from '../components/TodoItems';
import
{ 
  Platform, 
  StyleSheet, 
  Text, 
  View, 
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';

import * as firebase from "firebase";


export default class HomePage extends React.Component {
  
  _isMounted = false;

    constructor(props) {
      super(props);

      this.state = {
        list:[],
        listName : "",
        listDescription : null,
        userId  : 1,
        parentListId : null,
        sortOrder : 7,
        colorCode : "red",
        isFavorite : 0
      }
      // before the homescreen is in focus do this.
      const didBlurSubscription = this.props.navigation.addListener(
        'willFocus',
        payload => {
          this.setState({todos: this.state.todos});
        }
      )
    }

    componentDidMount(){
      this._isMounted = true;
      this.getList()
      this.props.navigation.setParams({ onPressEllipsis: this._onPressEllipsis });
    }

    componentWillUnmount(){
      this._isMounted = false;
    }



    // Header config
    static navigationOptions = ({navigation}) => {
      return {
        title: 'Tasks',
        headerRight: (
          // <Button
          //   onPress={navigation.getParam('increaseCount')}
          //   title="+1"
          //   color={Platform.OS === 'ios' ? '#564782' : null}
          // />
          <TouchableOpacity 
            style={{ paddingLeft:15, paddingRight:15 }}
            // *** after we setParam, we need to getParam the key value onPressEllipsis which is also "_onPressEllipsis"
            onPress={navigation.getParam('onPressEllipsis')}
            >
              <Image 
                style = {{ width: 23, height: 23,}}
                source={require('../images/shopping-list.png')}/>
          </TouchableOpacity>
        ),
      }
    };
    //  *** before the UI renders we will use the method setParams to set _onPressEllipsis to onPressEllipsis
    // componentWillMount () {
    //   this.props.navigation.setParams({ onPressEllipsis: this._onPressEllipsis });
    // }
    // *** during the method getParam it will bring us this this function and execute it accordingly
    _onPressEllipsis = () => {
      this.props.navigation.push ('DonePageScreen', {
        passedTodos: this.state.list
      });
    }

    getList = () => {

      fetch("http://localhost:3000/list/getAllActiveParent")
      .then(response => response.json())
      .then((responseJson)=> {
        if(this._isMounted){
          this.setState({list:responseJson})
        }
      })
      .catch(error=>console.log(error)) //to catch the errors if any
      
    }
    // add a new todo to the state after button is pressed
    addNewList() {
    fetch("http://localhost:3000/list/create", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          listName : this.state.listName,
          listDescription : this.state.listDescription,
          userId : this.state.userId,
          parentListId : this.state.parentListId,
          sortOrder : this.state.sortOrder,
          colorCode : this.state.colorCode,
          isFavorite : this.state.isFavorite
        }),
    }).then(() => {
        this.getList()
      })
      .catch(error => console.log(error)) //to catch the errors if any
    }

    // clicking a todo will make it completed
    toggleCompleted(todoId) {
      let todos = this.state.todos;
  
      todos.forEach(todo => {
        if (todoId === todo.id && !todo.done) {
          todo.done = true;
        }
      })
  
      this.setState({ todos });
    }
    handleSignOut(){
      firebase
        .auth()
        .signOut()
        .catch(function(error) {
          console.log('error happened here in handleSignOut')
      });
    }
    showUserInfo(){
      let user = firebase.auth().currentUser;
      let name, email, uid, emailVerified;

      if(user != null){
        name = user.displayName;
        email = user.email;
        emailVerified = user.emailVerified;
        uid = user.uid;
      }
      
    }

    getTodos = (itemId) => {
      this.props.navigation.navigate ('TodoPageScreen', {
        passedItemId: itemId
      });
    }
    
    render() {
      // ask about the question mark "?" and colon ":" [x]
      // ask about this shorthand if statement [x]
      const statusbar = (Platform.OS == 'ios') ? <View style={style.statusbar}></View> : <View></View>;
      // console.log(this.state.todoInput); // personal example of how to get the current state.
  
      return (
        <View style={style.container}>
          {/* {statusbar} */}
  
          <FlatList
            data={this.state.list}
            extraData={this.state}
            keyExtractor={(item, index) => item.listId.toString()}
            renderItem={({ item, index }) => {
  
              if (!item.isComplete) {
                return (
                  <TodoItem
                    // {...item}
                    todoItem={item}
                    onSwipeFromLeft={ () => alert("swiped from left")}
                    onRightPress={ () => alert("pressed from the right!")}
                    // completed={(itemId) => this.toggleCompleted(itemId)}
                    getTodos={(itemId) => this.getTodos(itemId)}

                  />
                )
              }
  
            }}
          />

          <TouchableOpacity
            style={ style.btn_signout2 }
            onPress={this.showUserInfo}
          >
            <Text style={{color:'#fff', fontSize: 14}}>User Info</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={ style.btn_signout }
            onPress={this.handleSignOut}
          >
            <Text style={{color:'#fff', fontSize: 14}}>Sign out</Text>
          </TouchableOpacity>


          <InputBar
            // clarify on why we have touse ({}) instead of just using ()
            textChange={(todoInput) => this.setState({ listName : todoInput})}
            addNewToDo={() => this.addNewList()}
            todoInput={this.state.listName} // rename this better man
          />
  
        </View>
      );
    }
}
  

const style = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    statusbar: {
      backgroundColor: '#FFCE00',
      height: 44
    },
    btn_signout: {
      padding: 15,
      paddingHorizontal: 50,
      borderRadius: 3,
      color: '#fff',
      backgroundColor: '#D62459',
      fontSize: 14,
      marginHorizontal: 8,
      textAlign: 'center',
      fontSize: 16,
      alignItems: 'center'
    },
    btn_signout2: {
      padding: 15,
      paddingHorizontal: 50,
      borderRadius: 3,
      color: '#fff',
      backgroundColor: '#D62459',
      fontSize: 14,
      marginHorizontal: 8,
      textAlign: 'center',
      fontSize: 16,
      alignItems: 'center',
      marginBottom: 15
    }
  });