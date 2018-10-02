import React, { Component } from "react";
import {
  View,
  Image,
  FlatList,
  Text,
  Switch,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  TextInput
} from "react-native";
import * as Animatable from "react-native-animatable";
import { Button } from "native-base";
import { Container, CheckBoxButton } from "../components";
import { Actions } from "react-native-router-flux";
import Accordion from "react-native-collapsible/Accordion";
import { Card, Item, Label, Input } from "native-base";
import _ from "lodash";
import MIcon from "react-native-vector-icons/MaterialIcons";
import { Icon as NIcon } from "native-base";
import Api from "../api";
import { createIconSetFromIcoMoon } from "react-native-vector-icons";
import selection from "../../icons/selection.json";
const Icon = createIconSetFromIcoMoon(selection);
import Fab from "@components/fab";
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
