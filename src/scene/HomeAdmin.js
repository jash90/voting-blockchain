import React, {Component} from 'react';
import {
    View,
    Image,
    FlatList,
    Text,
    Toa,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Modal
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Fab, Button, Switch} from 'native-base';
import {Container, CheckBoxButton} from "../components";
import {Actions} from "react-native-router-flux";
import Accordion from 'react-native-collapsible/Accordion';
import {Card} from 'native-base';
import _ from 'lodash';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import Api from "../api";
import {createIconSetFromIcoMoon} from "react-native-vector-icons";
import selection from "../../icons/selection.json";
const Icon = createIconSetFromIcoMoon(selection);
export default class HomeMod extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userRoles: []
        }
    };

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
            <Container back>
                <View>
                    <FlatList
                        keyExtractor={(item, index) => String(index)}
                        data={this
                        .state
                        .userRoles
                        .sort((a, b) => {
                            return a.Id - b.Id
                        })}
                        renderItem={({item}) => <TouchableWithoutFeedback>
                        <Card
                            style={{
                            width: "90%",
                            alignSelf: "center",
                            padding: 10,
                            borderRadius: 20
                        }}>
                            <View
                                style={{
                                height: 20,
                                flexDirection: "row",
                                justifyContent: "space-between"
                            }}>
                                <Text
                                    style={{
                                    fontSize: 10
                                }}>
                                    Typ użytkownika
                                </Text>
                            </View>
                            <View
                                style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                <Text
                                    numberOfLines={1}
                                    style={{
                                    fontSize: 24,
                                    fontWeight: "bold"
                                }}>{item.name}</Text>
                                <Icon name={this.getIcon(item.Id)} size={24}/>
                            </View>
                            <View
                                style={{
                                flex: 1
                            }}>
                                <View
                                    style={{
                                    height: 35,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between"
                                }}>
                                    <Text
                                        style={{
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}>{"Rejestracja"}</Text>
                                    <Switch
                                        style={{
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}
                                        value={item.register}/>
                                </View>
                                <View
                                    style={{
                                    height: 35,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between"
                                }}>
                                    <Text
                                        style={{
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}>{"Logowanie"}</Text>
                                    <Switch
                                        style={{
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}
                                        value={item.login}/>
                                </View>
                            </View>
                        </Card>
                    </TouchableWithoutFeedback>}/>
                </View>
            </Container>
        );
    }
    getIcon(id) {
        switch (id) {
            case 1:
                return "learning";
            case 2:
                return "classroom";
            default:
                return "parents";
        }
    }

}

const styles = StyleSheet.create({});