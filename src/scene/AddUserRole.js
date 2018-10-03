import React, { Component } from "react";
import {
  View,
  Text,
  Switch,
  StyleSheet,
  TextInput
} from "react-native";
import { Container } from "../components";
import { Card, } from "native-base";
import _ from "lodash";
import { observer, inject } from "mobx-react";

@inject("authStore")
@observer
export default class AddUserRole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userRoles: []
    };
  }
  render() {
    return (
      <Container back>
        <View>
          <Card
            style={{
              width: "90%",
              padding: 10,
              borderRadius: 20,
              alignSelf: "center"
            }}
          >
            <TextInput
              style={{ height: 40, fontSize: 20 }}
              placeholder={"Nazwa roli"}
            />
          </Card>
          <Card
            style={{
              width: "90%",
              padding: 10,
              borderRadius: 20,
              alignSelf: "center"
            }}
          >
            <View
              style={{
                height: 40,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <Text
                style={{
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                {"Rejestracja"}
              </Text>
              <Switch
                style={{
                  justifyContent: "center",
                  alignItems: "center"
                }}
                value={true}
              />
            </View>
          </Card>
          <Card
            style={{
              width: "90%",
              padding: 10,
              borderRadius: 20,
              alignSelf: "center"
            }}
          >
            <View
              style={{
                height: 40,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <Text
                style={{
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                {"Logowanie"}
              </Text>
              <Switch
                style={{
                  justifyContent: "center",
                  alignItems: "center"
                }}
                value={true}
              />
            </View>
          </Card>
          <Card
            style={{
              width: "90%",
              padding: 10,
              borderRadius: 20,
              alignSelf: "center",
              backgroundColor: "#000",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View
              style={{
                height: 40,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={{ color: "#fff", fontSize: 18 }}>Zapisz</Text>
            </View>
          </Card>
        </View>
      </Container>
    );
  }
}
const styles = StyleSheet.create({});
