import React from 'react';
import { StyleSheet, Text, Animated, Button, TouchableOpacity, TouchableHighlight, View } from 'react-native';
import replacePathSepForGlob from 'jest-util/build/replacePathSepForGlob';
import Swipeable from 'react-native-gesture-handler/Swipeable';

export default class TodoItem extends React.Component{
    constructor (props) {
        super(props);
    }

    render () {
        // where is this todoItem?
        // ask james about todoItem.
        const todoItem = this.props.todoItem;
        const mcolor = todoItem.colorValue;
        // const onSwipeFromLeft = this.props.onSwipeFromLeft;

        return (
            <Swipeable
            renderLeftActions={LeftAction} // shows an action panel after user swipes right
            onSwipeableLeftOpen={this.props.onSwipeFromLeft}
            renderRightActions={(progress, dragX) => <RightAction progress={progress} dragX={dragX} onPress={this.props.onRightPress} />}
            overshootRight={false}
            >
                <TouchableOpacity 
                    style={styles.todoItem}
                    onPress={ () => this.props.completed(this.props.todoItem.listid)}>                  
                            <View   
                                style={[styles.circle, {backgroundColor: mcolor}]}></View>
                            <Text style={(todoItem.isComplete) ? { color: '#FF0000', textDecorationLine: 'line-through' } : {color: '#313131'}}>
                                { todoItem.listName }
                            </Text>

                </TouchableOpacity>
            </Swipeable>
        )
    }
}


const LeftAction = (progress, dragX) => {
    const scale = dragX.interpolate({
        inputRange: [0, 100], // the user dragged for 100 pixel?
        outputRange: [0, 1], // after a drag of 100 pixel have full size text
        extrapolate: 'clamp' // means to lock it down to our outputRange.
    })
    return( 
        <View style={styles.leftAction}>
            <Animated.Text style={[styles.actionText, { transform: [{ scale }]}]}>Archive</Animated.Text>
        </View>
    )
}

const RightAction = ({progress, dragX, onPress}) => { 
    const scale = dragX.interpolate({
        inputRange: [-50, 0], // the user dragged for 100 pixel (inputRange always has to increment)
        outputRange: [1, 0], // after a drag of 100 pixel have full size text
        extrapolate: 'clamp' // means to lock it down to our outputRange.
    })
    return(
        // this onPres prop is passed an object {onPress} from the component RightAction which than has a prop named onPress, 
        <TouchableOpacity onPress={onPress}>   
            <View style={styles.rightAction}>
                <Animated.Text style={[styles.actionText, { transform: [{ scale }]}]}>Delete</Animated.Text>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    todoItem: {
        width: '100%',
        height: 40,
        borderBottomColor: '#DDD',
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between',
        paddingLeft: 15,
        backgroundColor: '#fff'
    },
    circle:{
        height: 15,
        width: 15,
        borderRadius: 15/2,
        marginRight: 10,
        backgroundColor: "#fec"
    },
    seperator: {
        flex: 1,
        height: 1,
        backgroundColor: "#e4e4e4",
        margin: 10
    },
    leftAction: {
        backgroundColor: "#388e3c",
        justifyContent: "center",
        flex: 1
    },
    rightAction: {
        backgroundColor: "#dd2c00",
        justifyContent: "center",
        // flex: 1,
        alignItems: "flex-end"
    },
    actionText: {
        color: "#fff",
        fontWeight: '600',
        padding: 12,
        
    },

})