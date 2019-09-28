import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
// import { Entypo } from 'react-native-vector-icons';
// import { Entypo } from 'react-native-vector-icons/Entypo';


//ask about the flow of this later 9:16pm [x]
const Header = (props) => {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>{props.title}</Text>
            <TouchableHighlight onPress={props.onPressEllipsis}>
                <Image
                    style={styles.ellipsis}
                    source={require('../images/more.png')}
                />
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#265847',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    title: {
        color: '#F3F3F3',
        fontSize: 28,
        fontWeight: '900',
        textTransform: 'uppercase'
    },
    ellipsis: {
        // justifyContent: 'flex-end',
        width: 20,
        height: 20,

    }
});

export default Header;