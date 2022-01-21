import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import PropTypes from "prop-types";
import MyButton from "../components/MyButton";

export default class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titlee:"delete",
            titlee2:"edit",
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.img} source={require('../img/user.png')} />
                <View style={styles.txt}>
                    <Text> Login: {this.props.login}, hasło: {this.props.passwd}</Text>
                    <MyButton name="Delete" titlee={this.state.titlee} testProp1="aaa" testPress={this.props.delete} login={this.props.login} passwd={this.props.passwd}/>
                    <MyButton name="Delete" titlee={this.state.titlee2} testProp1="aaa" testPress={this.props.edit} login={this.props.login} passwd={this.props.passwd}/>
                </View>
            </View>
        );
    }
}
User.propTypes = {
    login: PropTypes.string.isRequired,
    //Press:PropTypes.func.isRequired,
}
const styles = StyleSheet.create({
    img: {
        width: 30,
        height: 30,
    },
    container: {
        flexDirection: 'row',
        backgroundColor: "#d3d3d3",
        
    },
    txt:{
        height:160,
        justifyContent:"center",
    }

});

