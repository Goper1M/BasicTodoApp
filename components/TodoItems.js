import React from 'react';
import { StyleSheet, Text, Button, TouchableOpacity } from 'react-native';
import replacePathSepForGlob from 'jest-util/build/replacePathSepForGlob';

export default class TodoItem extends React.Component{
    constructor (props) {
        super(props);
    }

    render () {
        // where is this todoItem?
        const todoItem = this.props.todoItem;

        return (        
            <TouchableOpacity 
                style={styles.todoItem}
                onPress={ () => this.props.completed(this.props.todoItem.id)}>
                    <Text style={(todoItem.done) ? { color: '#FF0000', textDecorationLine: 'line-through' } : {color: '#313131'}}>
                        { todoItem.title }
                    </Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    todoItem: {
        width: '100%',
        height: 40,
        borderBottomColor: '#DDD',
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 15,
    }
})