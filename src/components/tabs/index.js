import React, {Component} from 'react';
import {View, Text, FlatList} from 'react-native';
import {Icon} from 'native-base';
class Tabs extends Component {
    render() {
        return (
            <View>
               <View
                    style={{
                    width: "100%",
                    height: 50,
                    flexDirection: "row",
                    backgroundColor: "#456"
                }}>
                    <View
                        style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Icon name="logo-facebook"/>
                        <Text>facebook</Text>
                    </View>
                    <View
                        style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Icon name="logo-facebook"/>
                        <Text>facebook</Text>
                    </View>
                    <View
                        style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }}></View>
                    <View
                        style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Icon name="logo-facebook"/>
                        <Text>facebook</Text>
                    </View>
                    <View
                        style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Icon name="logo-facebook"/>
                        <Text>facebook</Text>
                    </View>
                </View>
                <View
                    style={{
                    height: 60,
                    position: "absolute",
                    justifyContent: "center",
                    alignSelf: "center",
                    padding: 5
                }}>
                    <View
                        style={{
                        width: 70,
                        height: 70,
                        backgroundColor: 'red',
                        transform: [
                            {
                                rotate: '45deg'
                            }
                        ],
                        bottom: 20,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#e9e9ef",
                        zIndex: 9999
                    }}>
                        <View
                            style={{
                            width: 50,
                            height: 50,
                            backgroundColor: 'red'
                        }}/>
                    </View>
                </View>
                </View>
        );
    }
}

export default Tabs;