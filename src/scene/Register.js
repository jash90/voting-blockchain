import React, {Component} from "react";
import {
    StyleSheet,
    View,
    Dimensions,
    Alert,
    TouchableOpacity,
    Text,
    TextInput,
    FlatList,
    ScrollView
} from "react-native";

import {Content} from "native-base";

import {Actions} from "react-native-router-flux";

import axios from "axios";

import Api from "../api/index"

import {
    Logo,
    GoogleButton,
    FacebookButton,
    Button,
    Input,
    Autocomplete,
    Container
} from "../components";

import Color from "../Color";
import Language from "../Language";
import {createIconSetFromIcoMoon} from "react-native-vector-icons";
import selection from "../../icons/selection.json";
const Icon = createIconSetFromIcoMoon(selection);

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
            userRole: [],
            query: "",
            value: "",
            items: ["text", "text"]
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
            <Container back={true} leftPress={() => Actions.pop()} scrollView>
                <View
                    style={{
                    width: Dimensions
                        .get("window")
                        .width,
                    height: Dimensions
                        .get("window")
                        .height-80
                }}>
                    <View style={{
                        flex: 70
                    }}>
                        <Input
                            placeholder={Language.get("email")}
                            onChangeText={text => this.setState({email: text})}
                            value={this.state.email}/>
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
                    </View>
                    <View style={{
                        flex: 30, 
                        justifyContent: "flex-end",
                        marginBottom: 20
                    }}>
                        <Button
                            style={{

                        }}
                            text={Language.get("register")}
                            onPress={() => this.register()}/>
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
        const {login, password, email} = this.state;
        Api
            .register(login, password, null, null, null, email)
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
