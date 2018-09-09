import React, {Component} from "react";
import {StyleSheet, View, Alert, TouchableOpacity, Text} from "react-native";

import {Content} from "native-base";

import {Actions} from "react-native-router-flux";

import axios from "axios";

import Api from "../api/index"

import Logo from "@components/logo";
import GoogleButton from "@components/google-button";
import FacebookButton from "@components/facebook-button";
import Button from "@components/button";
import Input from "@components/input";
import Color from "../Color";
import Language from "../Language";
import Container from "@components/container";
import Autocomplete from "react-native-autocomplete-input";

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: "jan",
            password: "123123",
            email: "jan@kowalski.pl",
            firstname: "Jan",
            lastname: "Kowalski",
            repeatPassword: "123123",
            query: "",
            userRoles: []
        };
    }
    componentDidMount = () => {
        Api
            .getUserRole()
            .then(response => {
                if (response.status === 200) {
                    this.setState({userRoles: response.data});
                    console.log(response.data);
                } else {
                    alert(JSON.stringify(response.message.detail));
                }
            })
            .catch(error => {
                alert(error);
            })
    }

    render() {
        return (
            <Container back={true} leftPress={() => Actions.pop()} scrollView={true}>
                <View
                    style={{
                    flex: 1,
                    justifyContent: "space-around"
                }}>
                    <Input
                        placeholder={Language.get("firstname")}
                        onChangeText={text => this.setState({firstname: text})}
                        value={this.state.firstname}/>
                    <Input
                        placeholder={Language.get("lastname")}
                        onChangeText={text => this.setState({lastname: text})}
                        value={this.state.lastname}/>
                    <Input
                        placeholder={Language.get("email")}
                        onChangeText={text => this.setState({email: text})}
                        value={this.state.email}/>
                    <Autocomplete
                        inputContainerStyle={{borderColor:"transparent"}}
                        underlineColorAndroid={"transparent"}
                        style={{
                        borderRadius: 20,
                        width: "90%",
                        height: 60,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "white",
                        paddingLeft: 15,
                        paddingRight: 15,
                        fontSize: 20,
                        alignSelf: "center",
                        marginLeft: 10,
                        marginRight:10,
                        borderColor:"transparent"
                    }}
                        data={this.getData()}
                        defaultValue={this.state.query}
                        onChangeText={text => this.setState({query: text})}
                        renderItem={item => (
                        <TouchableOpacity onPress={() => this.setState({query: item})}>
                            <Text>{item.name}</Text>
                        </TouchableOpacity>
                    )}/>
                    <Input
                        placeholder={Language.get("login")}
                        onChangeText={text => this.setState({login: text})}
                        value={this.state.login}/>
                    <Input
                        placeholder={Language.get("password")}
                        secureTextEntry={true}
                        onChangeText={text => this.setState({password: text})}
                        value={this.state.password}/>
                    <Input
                        placeholder={Language.get("repeatPassword")}
                        secureTextEntry={true}
                        onChangeText={text => this.setState({repeatpassword: text})}
                        value={this.state.repeatpassword}/>
                    <View
                        style={{
                        marginTop: 20,
                        marginBottom: 20
                    }}>
                        <Button text={Language.get("register")} onPress={() => this.register()}/>
                    </View>
                </View>
            </Container>
        );
    }
    getData() {
        const {userRoles, query} = this.state;
        if (query.length > 0) {
            return userRoles.filter(value => {
                return String(value.name)
                    .toLowerCase()
                    .includes(String(query).toLowerCase())
            })
        } else {
            return [];
        }
    }
    register() {
        Api
            .register(this.state.login, this.state.password, null, this.state.firstname, this.state.lastname, this.state.email)
            .then(response => {
                if (response.status === 200) {
                    alert(JSON.stringify(response.message));
                } else {
                    alert(JSON.stringify(response.message.detail));
                }
            })
            .catch(error => {
                alert(error);
            })
    }
}

var styles = StyleSheet.create({
    fullStyle: {
        flex: 1,
        backgroundColor: Color.primaryColor
    },
    buttonContener: {
        width: "100%",
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center"
    }
});
