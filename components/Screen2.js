import React, { Component, } from 'react';
import { View, Text, Button, StyleSheet, FlatList,ScrollView } from 'react-native';
import MyButton from "../components/MyButton";
import User from "../components/User";

export default class Screen2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: this.props.navigation.state.params.login,
            password: this.props.navigation.state.params.passwd,
            titlee: "Log out",
            tab: [],
        };
        this.that = this
        if (this.state.login == "Admin") {
            this.GetUsers();
        }



        //console.log(this.props)    
    }
    GetUsers() {
        fetch('http://192.168.1.12:3000/GetUsers', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.that.setState({ tab: responseJson })
                console.log("tab", this.state.tab)
            })
            .catch((error) => {
                console.error(error);
            });
    }
    DeleteFunction(x, y) {
        console.log("działam")
        fetch('http://192.168.1.12:3000/deleteUser', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                login: x,
                passwd: y,
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                this.that.setState({ tab: responseJson })
            })
            .catch((error) => {
                console.error(error);
            });
    }
    EditFunction(x, y) {
        this.props.navigation.navigate("s3", { a: x, b: y });
    }

    render() {
        //console.log(this.props.navigation.state.params.login)
        // console.log(this.props.navigation.state.params.passwd)
        return (
            <View style={styles.container}>
                <View style={styles.HelloView}>
                    <Text style={styles.title}> Hello {this.state.login} !</Text>
                </View>
                <ScrollView style={styles.content}>
                    <FlatList keyExtractor={(item, index) => index.toString()}
                        data={
                            this.state.tab
                        }
                        renderItem={({ item }) => <User login={item.login} passwd={item.passwd} delete={this.DeleteFunction.bind(this, item.login, item.passwd)} edit={this.EditFunction.bind(this, item.login, item.passwd)}/>}
                    />
                </ScrollView>
                <View style={styles.ButtonsView}>
                    <MyButton titlee={this.state.titlee} testProp1="aaa" testProp2={false} testPress={() => this.props.navigation.navigate("s1")} />
                </View>



            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 4,
    },
    HelloView: {
        flex: 0.1,
    },
    ButtonsView: {
        flex: 0.2,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        padding: 20
    },

});
