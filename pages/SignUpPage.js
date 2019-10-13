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
 import * as firebase from 'firebase'

class SignUpPage extends React.Component{


    static navigationOptions = {
        header: null
    }

    constructor(props){
        super(props);

        this.state = {
            name: "",
            email: "",
            password: "",
            errormessage: null
        };
    }

    handleSignUp = () => {
        firebase
            .auth()
            .createUserWithEmailAndPassword( this.state.email, this.state.password )
            .catch(function(error){
                var errorCode = error.code;
                var errormessage = error.message;
            }
            )};


    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.title}>Todo.</Text>
                <Text style={styles.subtitle}>Create an account</Text>

                <View>
                    <TextInput
                        style={styles.name}
                        placeholder= 'name'
                        onChangeText={ name => this.setState({ name })}
                        // ask james what the value prop does...
                        value={ this.state.name }

                    />
                    <TextInput
                        style={ styles.username }
                        placeholder= 'username or email'
                        onChangeText= { email => this.setState({ email })}
                        value={ this.state.email }
                    />
                    <TextInput
                        style={ styles.password }
                        placeholder= 'password'
                        onChangeText={ password => this.setState({ password })}
                        value={ this.state.password }
                    />
                </View>
                
                <View>
                    <TouchableOpacity
                    onPress={ this.handleSignUp }
                    >
                        <Text style={styles.btn_signin}>Sign Up</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    };
}
export default SignUpPage;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        marginTop: 100,
        marginHorizontal: 30

    },
    btn_signin_singout: {
        padding: 8,
        paddingHorizontal: 50,
        borderRadius: 3,
        color: '#fff',
        backgroundColor: '#D62459',
        fontSize: 14,
        marginHorizontal: 5
    },
    title: {
        fontSize: 30,
        fontWeight: '600'  
    },
    subtitle: {
        fontSize: 20,
        fontWeight: '500',
        // fontStyle: 'italic'
    },
    name: {
        fontSize: 17,
        marginHorizontal: 8,
        marginTop: 30,
        padding: 8,
        backgroundColor: '#FAF8F5',
        borderRadius: 4
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
        marginTop: 15,
        padding: 8,
        backgroundColor: '#FAF8F5',
        borderRadius: 4,
        marginBottom: 33,
    },
    btn_signin: {
        padding: 15,
        paddingHorizontal: 50,
        borderRadius: 3,
        color: '#fff',
        backgroundColor: '#D62459',
        fontSize: 14,
        marginHorizontal: 8,
        textAlign: 'center',
        fontSize: 16,
        
    },
    forgot_password: {
        textAlign: 'center',
        marginTop: 30,
    },
    no_account: {
        textAlign: 'center',
        marginTop: 5
        ,
    }

})