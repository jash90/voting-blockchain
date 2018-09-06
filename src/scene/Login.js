import React, {Component} from "react";
import {StyleSheet, View, Alert} from "react-native";

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

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      password: ""
    };
  }
  componentWillMount = () => {};

  async componentDidMount() {}
  render() {
    return (
      <Container back={false}>
        <View>
          <Logo size={150}/>
          <Input
            placeholder={Language.get("login")}
            onChangeText={text => this.setState({login: text})}
            value={this.state.login}/>
          <Input
            placeholder={Language.get("password")}
            secureTextEntry={true}
            onChangeText={text => this.setState({password: text})}
            value={this.state.password}/>
        </View>
        <Content contentContainerStyle={styles.buttonContener}>
          <Button text={Language.get("login")} onPress={() => this.login()}/>
          <Button text={Language.get("register")} onPress={() => Actions.Register()} />
        </Content>
      </Container>
    );
  }
  async saveloginhaslo(login, password) {}
  
  googleLogin = async() => {};
  facebookLogin = async() => {};

  login() {
    Api
      .login(this.state.login, this.state.password)
      .then(response => {
        if (response.status === 200){
          Actions.List();
        }else{
          alert(response.message);
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
