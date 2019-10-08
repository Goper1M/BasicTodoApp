import React from 'react';
import 
{
    TextInput,
    Touchopacity,
    View,
    StyleSheet,
    Text,
} from 'react-native';

class LoginPage extends React.Component{
    static navigationOptions = {
        // title: null,
        header: null
    }
    constructor(props){
        super (props);
    }


    render(){
        return(
            <View style= {styles.container} >
                <View style={styles.input}>
                    <Text>Sign up using Google</Text>
                </View>

            </View>
        );
    };
}



export default LoginPage; 

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        // flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',

    },
    buttons: {
        color: '#1B65FA',
        fontWeight: '500',

    },
    input: {
        marginBottom: 150,
        padding: 10,
        paddingHorizontal: 70,
        borderWidth: 1,
        borderRadius: 3
        
        // flexDirection: 'row',
        // borderColor: '#020302',
        // borderWidth: 1,
        // flex: 1
  
    }
})