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

export default class HomePage extends React.Component {
    constructor(props) {
      super(props);
      
      //my array and todoInput
      this.state = {
        todoInput: '',
        todos: [
          {
            id: 0,
            title: 'Take out James trash',
            comments: ['something about it', 'something again another this'],
            done: false,
            
          },
          {
            id: 1,
            title: 'Finish this app completed',
            comments: [' not sure if i can finish this app in time', 'james will help'],
            done: true
          },
          {
            id: 2,
            title: 'Finish tfdsfdsfsdfhis app',
            comments: [],
            done: false
          },
          {
            id: 3,
            title: 'Finish thfdsfdsfsdais app',
            done: false
          },
          {
            id: 4,
            title: 'Finish this appfdsfsdafdsa completed',
            done: true
          },
          {
            id: 5,
            title: 'fdsfdsafdsaFinish this app',
            done: false
          }
        ]
      };
  
  
      const didBlurSubscription = this.props.navigation.addListener(
        'willFocus',
        payload => {
          this.setState({todos: this.state.todos});
        }
      )
  
    }
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
            // onPress= {() => navigation.push('DonePage', {todos: this.state.todos})}
            onPress={navigation.getParam('onPressEllipsis')}
            >
              <Image 
                style = {{ width: 23, height: 23,}}
                source={require('../images/shopping-list.png')}/>
          </TouchableOpacity>
        ),
      }
    };
  
    componentWillMount () {
      this.props.navigation.setParams({ onPressEllipsis: this._onPressEllipsis });
      // <DonePage sendStateBack={(data) => this.parentState(data)}/>
    }
  
    
    // parentState (value) {
    //   this.state.setState({value});
    // }
  
    _onPressEllipsis = () => {
      this.props.navigation.push ('DonePageScreen', {
        passedTodos: this.state.todos
      });
    }
  
    // what the crap is this doing
    addNewToDo() {
      let todos = this.state.todos;
  
      todos.unshift({
        id: todos.length + 1,
        title: this.state.todoInput,
        done: false
      });
  
      this.setState({
        todos,
        todoInput: ''
      });
    }
    // what the crap is this doing
    completed(todoId) {
      let todos = this.state.todos;
  
      todos.forEach(todo => {
        if (todoId === todo.id && !todo.done) {
          todo.done = true;
        }
      })
  
      this.setState({ todos });
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
            data={this.state.todos}
            extraData={this.state}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
  
              if (!item.done) {
                return (
                  <TodoItem
                    // {...item}
                    todoItem={item}
                    onSwipeFromLeft={ () => alert("swiped from left")}
                    onRightPress={ () => alert("pressed from the right!")}
                    completed={(itemId) => this.completed(itemId)}
                  />
                )
              }
  
            }}
          />
          <TouchableOpacity style={ style.btn_signout }>
            <Text style={{color:'#fff', fontSize: 14}}>Sign out</Text>
          </TouchableOpacity>
          <InputBar
            // clarify on why we have touse ({}) instead of just using ()
            textChange={(todoInput) => this.setState({ todoInput })}
            addNewToDo={() => this.addNewToDo()}
            todoInput={this.state.todoInput}
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
    }
  });