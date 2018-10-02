import React, {Component} from 'react';
import {View, Text, TextInput, FlatList} from "react-native";

class Autocomplete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            items: [
                {
                    id: 1,
                    value: "text"
                }, {
                    value: "text",
                    id: 2
                }
            ],
            loading: false,
            x: 0,
            y: 0,
            height: 0,
            text: "",
            focus:false
        };
    }

    render() {
        return (
            <View
                style={{
                width: "100%",
                height: 80
            }}>
                <TextInput
                    onFocus={() => this.setState({ focus: true })}
                    onBlur={() => this.setState({focus:false})} 
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
                    margin: 10
                }}
                    onLayout={event => {
                    const layout = event.nativeEvent.layout;
                    this.setState({x: layout.x, y: layout.y, height: layout.height})
                }}
                    placeholder={"email"}
                    value={this.state.text}
                    onChangeText={text => this.setState({text})}/> 
                    {this.state.text.length>0 && this.state.focus
                    ? <View
                            style={{
                            position: "absolute",
                            top: this.state.y + this.state.height,
                            left: this.state.x,
                            zIndex: 999,
                            width: "90%",
                            backgroundColor: "#e6e6e6",
                            overflow: "hidden",
                            height: 120
                        }}>
                            <FlatList
                            nestedScrollEnabled={true}
                                keyboardShouldPersistTaps="always"
                                data={[
                                "text",
                                "text",
                                "text",
                                "text",
                                "text",
                                "text"
                            ]}
                                keyExtractor={(item,index)=>String(index)}
                                renderItem={({item}) => {
                                return (
                                    <View
                                        style={{
                                        width: "100%",
                                        height: 40,
                                        marginBottom: 10,
                                        backgroundColor: "white",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}>
                                        <Text
                                            style={{
                                            fontSize: 20
                                        }}>{item}</Text>
                                    </View>
                                );
                            }}/>
                        </View>
                    : null}
            </View>
        );
    }
}

export default Autocomplete;