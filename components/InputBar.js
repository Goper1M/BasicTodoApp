import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';

const InputBar = (props) =>{
    return(
        <View style={styles.inputContainer}>
            <TextInput 
                style={styles.input}
                onChangeText={(todoInput) => props.textChange(todoInput)}
                value={props.todoInput}
            />
            <TouchableOpacity 
                style={styles.addButton}
                onPress={props.addNewToDo}
            >
                <Text style={styles.addButtonText}>ADD</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        shadowOffset: { width: 0, height: 3},
        shadowOpacity: .1,
        shadowColor: "#171717",
        padding: 20
    },
    input: {
        backgroundColor: '#F3F3F3',
        flex: 1,
        fontSize: 18,
        height: 35,
    },
    addButtonText: {
        color: '#171717',
        fontSize: 18,
        fontWeight: '600'
    },
    
    addButton: {
        width: 100,
        backgroundColor: '#FFCE00',
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default InputBar;