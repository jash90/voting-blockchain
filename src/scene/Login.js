import React, {Component} from "react";
import {StyleSheet, View, Alert} from "react-native";

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
  Container
} from "../components";
import Color from "../Color";
import Language from "../Language";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "mod",
      password: "B2r#e4"
    };
  }

  render() {
    return (
      <Container back={false}>
        <Content
          contentContainerStyle={{
          width: "100%",
          justifyContent: "space-between"
        }}>
          <Logo size={180}/>
          <View style={{
            marginTop: 35
          }}>
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
          <View
            style={{
            width: "100%",
            height: 200,
            justifyContent: "space-around"
          }}>
            <Button text={Language.get("login")} onPress={() => this.login()}/>
            <Button text={Language.get("register")} onPress={() => Actions.Register()}/>
          </View>
        </Content>
      </Container>
    );
  }

  login() {
    const {login, password} = this.state;
    Api
      .login(login, password)
      .then(response => {
        if (response.status === 200) {
          if (response.data != null) {
            const {token, userRoleId} = response.data;
            switch (userRoleId) {
              case 1:
                Actions.HomeAdmin({token});
                break;
              case 2:
                Actions.HomeMod({token});
                break;
              case 3:
                Actions.HomeUser({token});
                break;
              case 4:
                Alert.alert("Błąd autoryzacji", "Brak potwierdzenia konta. Skontaktuj się z administratorem.");
                break;
              default:
                Actions.HomeUser({token});
                break;
            }
          } else {
            throw "Incorrect UserRoleId";
          }
        } else {
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
    justifyContent: "space-between",
    alignItems: "center"
  }
});
