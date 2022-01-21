import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Text, View, Image,StyleSheet} from 'react-native';

class Screen3 extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        console.log(this.props.navigation.state.params.a)
        console.log(this.props.navigation.state.params.b)
    }

    render() {
        return (
            <View>
                <Image style={styles.img}source={require('../img/user.png')} /><Text>Login: {this.props.navigation.state.params.a}, hasło: {this.props.navigation.state.params.b}</Text>
            </View>
        );
    }
}

export default Screen3

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