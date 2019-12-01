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
import * as firebase from 'firebase';
class LoginPage extends React.Component {
    static navigationOptions = {
        // title: null,
        header: null
    }
    constructor(props) {
        super(props);
    }

    // getColors() {
    //     fetch("http://localhost:3000/")
    //     .then(response => response.json())
    //     .then((responseJson)=> {
    //     console.log(responseJson);
    //     })
    //     .catch(error=>console.log(error)) //to catch the errors if any
    // }

    render() {
        return (
            <View style={styles.container} >
                <View style={styles.welcome_view}>
                    <Text style={styles.welcome_title}>Todo.</Text>
                    <Text style={{marginTop: 5}}>    a simple clean todo app</Text>
                </View>

                <View style={styles.btn_view}>  
                    <TouchableOpacity>
                        <Text style={styles.btn_facebook}>Sign-in with Facebook</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        // onPress={() => {this.props.navigation.push('HomeScreen')}}
                        onPress={() => {this.getColors()}}
                    >
                        <Text style={styles.btn_google}>Sign-in with Google</Text>
                    </TouchableOpacity>

                    <Text style={styles.horizontal_line}>────────  CONTINUE WITH EMAIL  ────────</Text>

                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity onPress={()=>{this.props.navigation.push('SignInScreen')}}>
                            <Text style={styles.btn_signin_singout}>Sign in</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{this.props.navigation.push('SignUpScreen')}}>
                            <Text style={styles.btn_signin_singout}>Sign up</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        );
    };
}



export default LoginPage; 

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FAF1E4',
        flex: 1,
        // flexDirection: 'row',
        // alignItems: 'center',
        justifyContent: 'space-between',
    },
    welcome_view: {
        paddingStart: 20,
        paddingTop: 90,
    },
    welcome_title: {
        fontWeight: '600',
        fontSize: 30
    },
    welcome_subtitle: {
        fontSize:12,
        fontStyle: "italic"
    },
    btn_view: {
        // width: 200,
        // height: 50,
        // flexDirection: "row",
        // marginBottom: 50,
        paddingBottom: 50,
        paddingTop: 17,
        alignItems: "center",
        backgroundColor: '#fff',
        // justifyContent: 'space-between',
        // flex:1
    },
    btn_google: {
        backgroundColor: '#4285F4',
        // backgroundColor: '#4267b2',
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
        padding: 8,
        borderRadius: 3,
        paddingHorizontal: 90
    },
    btn_facebook: {
        backgroundColor: '#4267b2',
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
        padding: 8,
        borderRadius: 3,
        paddingHorizontal: 81.5,
        marginBottom: 5
    },
    horizontal_line: {
        fontSize: 10.5,
        marginVertical: 13,
    },
    btn_signin_singout: {
        padding: 8,
        paddingHorizontal: 50,
        borderRadius: 3,
        color: '#fff',
        backgroundColor: '#D62459',
        fontSize: 14,
        marginHorizontal: 5

    }
})


