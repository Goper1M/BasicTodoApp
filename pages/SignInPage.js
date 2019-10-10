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

class SignInPage extends React.Component{
    static navigationOptions = {
        header: null
    }

    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.title}>Todo.</Text>
                <Text style={styles.subtitle}>Sign in with email</Text>

                <View>
                    <TextInput
                        placeholder= 'username or email'
                        style={styles.username}
                    />
                    <TextInput
                        placeholder= 'password'
                        style={styles.password}
                    />
                </View>
                
                <View>
                    <TouchableOpacity>
                        <Text style={styles.btn_signin}>Sign in</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity>
                        <Text style={styles.forgot_password}>forget password?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.no_account}>dont have an account? sign-up</Text>
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
    no_account: {
        textAlign: 'center',
        marginTop: 5
        ,
    }

})