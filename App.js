import DonePage from './pages/DonePage';
import LoginPage from './pages/LoginPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import LoadingPage from './pages/LoadingPage';
import HomePage from './pages/HomePage';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyB0jw689cGMO5P9XQWbD1ro6X1FIDkvi2g",
  authDomain: "todo-9a609.firebaseapp.com",
  databaseURL: "https://todo-9a609.firebaseio.com",
  projectId: "todo-9a609",
  storageBucket: "todo-9a609.appspot.com",
  messagingSenderId: "820149163211",
  appId: "1:820149163211:web:68dce1f9a51913ac8af74e",
  measurementId: "G-EDT7CZKB0Z"
};

firebase.initializeApp(firebaseConfig);





const AppNavigator = createStackNavigator(
  {
    HomeScreen: HomePage,
    DonePageScreen: DonePage,
  },
);

const AuthNavigator = createStackNavigator(
  {
    LoginPageScreen: LoginPage,
    SignInScreen: SignInPage,
    SignUpScreen: SignUpPage,
  },
  {
    initialRouteName: 'LoginPageScreen'
  }
);

const SwitchNavigator = createSwitchNavigator(
  {
    LoadingScreen: LoadingPage,
    App: AppNavigator,
    Auth: AuthNavigator
  },
  {
    initialRouteName: 'App'
  }
)

export default createAppContainer(SwitchNavigator);


