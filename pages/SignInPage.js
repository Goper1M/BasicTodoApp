import React from 'react';
import {
    TextInput,
    TouchableOpacity,
    View,
    StyleSheet,
    Text,
    Button,
    Image
} from 'react-native'; 
import { italic } from 'colorette';
import * as firebase from 'firebase';


class SignInPage extends React.Component{
    static navigationOptions = {
        header: null
    }

    constructor(props){
        super(props);

        this.state = {
            password: "",
            email: "",
            errorMessage: null
        }
    }

    handleSignin = () =>{
        firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .catch(error => this.setState({errorMessage: error.message}));
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.title}>Todo.</Text>
                <Text style={styles.subtitle}>Sign in with email</Text>

                {/* <View> */}
        {/* { this.state.errorMessage && <Text style= {styles.error}>{ this.state.errorMessage }</Text> } */}
                {/* </View> */}

                <View>
                    <TextInput
                        placeholder= 'username or email'
                        style={styles.username}
                        onChangeText={email => this.setState({ email })}
                        value={ this.state.email }
                    />
                    <TextInput
                        placeholder= 'password'
                        style={styles.password}
                        onChangeText={password => this.setState({password})}
                        value= { this.state.password }
                    />
                </View>
                
                <View>
                    <TouchableOpacity
                        onPress={this.handleSignin}
                    >
                        <Text style={styles.btn_signin}>Sign in</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity>
                        <Text style={styles.forgot_password}>forget password?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity >
                        <Text style={styles.sign_up}>don't have an account? <Text style={{color: '#D62459', fontWeight: '600'}}>sign up</Text></Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };
}
export default SignInPage;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        marginTop: 100,
        marginHorizontal: 30

    },
    title: {
        fontSize: 30,
        fontWeight: '600'  
    },
    subtitle: {
        fontSize: 20,
        fontWeight: '500',
        marginBottom: 40
        // fontStyle: 'italic'
    },
    username: {
        fontSize: 17,
        marginHorizontal: 8,
        marginTop: 15,
        padding: 8,
        backgroundColor: '#FAF8F5',
        borderRadius: 4,
    },
    password: {
        fontSize: 17,
        marginHorizontal: 8,
        marginTop: 10,
        padding: 8,
        backgroundColor: '#FAF8F5',
        borderRadius: 4,
    },
    btn_signin: {
        padding: 8,
        paddingHorizontal: 50,
        borderRadius: 3,
        color: '#fff',
        backgroundColor: '#D62459',
        fontSize: 14,
        marginHorizontal: 8,
        textAlign: 'center',
        marginTop: 25,
        fontSize: 15
    },
    forgot_password: {
        textAlign: 'center',
        marginTop: 30,
    },
    sign_up: {
        textAlign: 'center',
        marginTop: 15
        ,
    },
    error: {
        color: '#F50404',
        fontWeight: '600',
        fontSize: 14
    }

})