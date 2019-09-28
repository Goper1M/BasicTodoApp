import React from 'react';
import Header from './components/Header';
import InputBar from './components/InputBar';
import TodoItem from './components/TodoItems';
import DonePage from './pages/DonePage';
import 
{ 
  Platform, 
  StyleSheet, 
  Text, 
  View, 
  FlatList,
  Image,
  TouchableOpacity  
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

 
class Home extends React.Component {
  static navigationOptions  = {
    title: 'Tasks',
    headerRight: (
      <TouchableOpacity style={{ paddingLeft:15, paddingRight:15 }}>
          <Image 
            style = {{ width: 20, height: 20,}}
            source={require('./images/shopping-list.svg')}/>
      </TouchableOpacity>
    )
  };
  constructor(props) {
    super(props);
    
    //not sure what this means yet ask james later for more info [x]
    this.state = {
      todoInput: '',
      todos: [
        {
          id: 0,
          title: 'Take out James trash',
          done: false
        },
        {
          id: 1,
          title: 'Finish this app',
          done: true
        },
        {
          id: 2,
          title: 'Finish tfdsfdsfsdfhis app',
          done: false
        },
        {
          id: 3,
          title: 'Finish thfdsfdsfsdais app',
          done: false
        },
        {
          id: 4,
          title: 'Finish this appfdsfsdafdsa',
          done: true
        },
        {
          id: 5,
          title: 'fdsfdsafdsaFinish this app',
          done: false
        }
      ]
    };
  }
  
  onPressEllipsis () {
    this.props.navigation.push ('DonePage');
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
    console.log(this.state.todoInput); // personal example of how to get the current state.
    return (
      <View style={style.container}>
        {/* {statusbar} */}
        {/* <Header 
          title="Hello World!"
          /> */}


        <InputBar
          // clarify on why we have touse ({}) instead of just using ()
          textChange={(todoInput) => this.setState({ todoInput })}
          addNewToDo={() => this.addNewToDo()}
          todoInput={this.state.todoInput}
        />


        <FlatList
          data={this.state.todos}
          extraData={this.state}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {

            if (!item.done) {
              return (
                <TodoItem
                  todoItem={item}
                  completed={(itemId) => this.completed(itemId)}
                />
              )
            }

          }}
        />
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: Home,
    DonePage: DonePage,

  }
);

export default createAppContainer(AppNavigator);

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