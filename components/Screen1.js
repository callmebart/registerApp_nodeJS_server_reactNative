import React, { Component } from 'react';
import { View, Text, Button, TextInput, FlatList, StyleSheet, KeyboardAvoidingView, Alert } from 'react-native';
import MyButton from "../components/MyButton"

export default class Screen1 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            showRegisterView: false,
            ConfirmPassword: "",
            RegisterTitlee: "I'm new here , register me now!",
            LogInTitlee: "Log in",
        };
       this.RegisterMe = this.RegisterMe.bind(this);
        this.LogIn = this.LogIn.bind(this);
       this.Validation = this.Validation.bind(this);
        this.SendRegister = this.SendRegister.bind(this);

    }
   
    onTextLogin(txt) {
        //sets login state sends login value 
        this.setState({
            username: txt
        })
    }
    onTextPassword(txt) {
        //set password state send password value
        this.setState({
            password: txt
        })
    }
    onTextConfirmPassword(txt) {
        this.setState({
            ConfirmPassword: txt
        })
    }
    Validation() {
        if (this.state.password == this.state.ConfirmPassword) {
            this.SendRegister();
        } else {
            Alert.alert(
                'Hey user!',
                'Your Passowrds do not match!',
            );
        }
    }
    LogIn() {
        //Log in func
        console.log("Log in func")
        this.setState({
            showRegisterView: false,
        });
        if ((this.state.username == "" || this.state.password == "") && this.state.LogInTitlee == "Log in") {
            Alert.alert(
                'Hey user!',
                'Login and password inputs could not be empty',
            );
        }
        if (this.state.LogInTitlee == "Go Back") {
            this.setState({
                username: "",
                password: "",
                ConfirmPassword: "",
                LogInTitlee: "Log in",
                RegisterTitlee: "I'm new here , register me now!",
            })
        }
        if (this.state.LogInTitlee == "Log in")
            if (this.state.username !== "" && this.state.password !== "") {
                this.SendLogIn();
            }

    }
    
    RegisterMe() {
        //register user func
        console.log("registerMe func")
        this.setState({
            username: "",
            password: "",
            showRegisterView: true,
            RegisterTitlee: "Click to Register",
            LogInTitlee: "Go Back",
        });
        if (this.state.RegisterTitlee == "Click to Register") {
            this.Validation()
        }
        if ((this.state.username == "" || this.state.password == "") && this.state.RegisterTitlee == "Click to Register") {
            Alert.alert(
                'Hey user!',
                'Login and password inputs could not be empty',
            );
        }
    }

    render() {
        return (

            <View style={styles.container}>
                <View style={styles.HelloView}>
                    <Text style={styles.title}> Hello! </Text>
                </View>
                <View style={styles.TextInputView}>
                    <TextInput
                        name="username"
                        style={{ height: 40, marginTop: 10, flex: 1 }}
                        placeholder="Type here your name!"
                        onChangeText={(txt) => this.onTextLogin(txt)}
                        value={this.state.username}
                    />
                    <TextInput
                        name="password"
                        style={{ height: 40, marginTop: 10, flex: 1 }}
                        placeholder="Type here your password!"
                        onChangeText={(txt) => this.onTextPassword(txt)}
                        value={this.state.password}
                    />
                    {this.state.showRegisterView &&
                        <TextInput
                            name="passwordConfirm"
                            style={{ height: 40, marginTop: 8, flex: 1, }}
                            placeholder="Cofirm here your passowrd!"
                            onChangeText={(txt) => this.onTextConfirmPassword(txt)}
                            value={this.state.ConfirmPassword}
                        />
                    }
                </View>
                <View style={styles.ButtonsView}>
                    <MyButton titlee={this.state.LogInTitlee} testProp1="aaa" testProp2={false} testPress={() => this.LogIn()} />
                    <MyButton titlee={this.state.RegisterTitlee} testProp1="aaa" testProp2={false} testPress={() => this.RegisterMe()} />
                </View>
                <View style={styles.supported}>
                    <Text style={styles.supportedText}>Supported by NodeJS </Text>
                    <Text style={styles.supportedText}>and </Text>
                    <Text style={styles.supportedText}>ReactNative </Text>
                </View>
            </View>
        );
    }
    SendRegister(){
       // alert(this.state.password)
        if (this.state.username != '' || this.state.password != '') {
            fetch('http://192.168.1.12:3000/SendRegister', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: this.state.username,
                    passwd: this.state.password,
                })
            })
            .then((res) => res.text()) //convert to plain text
            .then(text => {                            //JA PIERDOLE DZIAŁA
                console.log(text)         
                     if (text == "Nie") {
                         alert("taki użytkownik już istnieje")
                     }
                    else {
                        this.props.navigation.navigate("s2",{login:this.state.username,passwd:this.state.passwd})
                    }
            })
            
            //    .then((responseJson) =>  {
            //        // var msg = responseJson._bodyText;
                   
            //         console.log(responseJson)s
            //         //  if (msg == "Tak") {
            //         //      alert("Użytkownik z takim loginem już istnieje");
            //         //  }
            //         // else {
            //         //     this.props.navigation.navigate("s2")
            //         // }
            //     })
                .catch((error) => {
                    console.error(error);
                });
        }
        else {
            alert("Login oraz hasło nie może być puste!");
        }
    }
    SendLogIn(){
        // alert(this.state.password)
         if (this.state.username != '' || this.state.password != '') {
             fetch('http://192.168.1.12:3000/SendLogin', {
                 method: 'POST',
                 headers: {
                     Accept: 'application/json',
                     'Content-Type': 'application/json',
                 },
                 body: JSON.stringify({
                     login: this.state.username,
                     passwd: this.state.password,
                 })
             })
             .then((res) => res.text()) //convert to plain text
             .then(text => {                            //JA PIERDOLE DZIAŁA
                 console.log(text)         
                      if (text == "Nie") {
                        this.props.navigation.navigate("s2",{login:this.state.username,passwd:this.state.passwd})
                          
                      }
                     else {
                        alert("Sprawdź hasło i login");
                     }
             })
                 .catch((error) => {
                     console.error(error);
                 });
         }
         else {
             alert("Login oraz hasło nie może być puste!");
         }
     }
}
   

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    TextInputView: {
        flex: 2,
        marginLeft: 40,
    },
    HelloView: {
        flex: 3,
    },
    ButtonsView: {
        flex: 4,
        alignItems: 'center',
    },
    title: {
        fontSize: 80,
        textAlign: 'center',
        padding: 20
    },
    supported: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: "flex-end"
    },
    supportedText: {
        textAlign: 'center',
        fontSize: 8,
    },
});