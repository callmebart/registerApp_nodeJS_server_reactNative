import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from "prop-types";

export default class MyButton extends Component {
    testPress;
    constructor(props) {
        super(props);
        this.state = {
        };

    }


    render() {

        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.props.testPress}
                    testProp2={this.props.testProp2}
                    style={styles.buttonStyle}>
                    <Text style={styles.reg}>{this.props.titlee}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
MyButton.propTypes = {
    titlee: PropTypes.string.isRequired,
    testProp1: PropTypes.string.isRequired,
    testProp2: PropTypes.bool.isRequired,
    testPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: "#3ccf63",
        height: 45,
        width:300,
        justifyContent: "center",
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 5,
        marginTop: 20,
    },
    reg: {
        color: "white",
        fontWeight: "bold",
        textAlign: 'center'
    },
});