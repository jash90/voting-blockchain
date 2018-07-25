import React, {Component} from 'react';
import {
    View,
    Image,
    FlatList,
    Text,
    TouchableHighlight,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Fab, Button, Icon as NIcon} from 'native-base';
import Container from "@components/container";
import {Actions} from "react-native-router-flux";
import Accordion from 'react-native-collapsible/Accordion';
import {Icon} from 'native-base';
import _ from 'lodash';

export default class CheckBoxButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 0,
            selects: []
        };
    }
    render() {
        return (
            <View>
            <FlatList
                data={this.props.table}
                extraData={this.state.selected}
                keyExtractor={(item,index)=>String(index)}
                renderItem={({item}) => <TouchableOpacity onPress={() => this.onChange(item.id)}>
                <View
                    style={{
                        flexDirection:'row',
                        alignItems:'center',
                           height: 40,
                            width: '100%'
                }}>
                    <Icon name={this.nameIcon(item.id)} fontSize={20} style={{padding:5}}/>
                    <Text style={{fontSize:20}}>{item.text}</Text>
                </View>
            </TouchableOpacity>}/>
</View>
        );
    }
    nameIcon(value) {
        if (this.props.countSelected == null) {
            return this.state.selected == value
                ? 'radio-button-on'
                : 'radio-button-off'
        } else {
            return _.find(this.state.selects, ['Id', value]) == undefined
                ? 'square'
                : 'checkbox'
        }
    }
    onChange(value) {
        if (this.props.countSelected == null) {
            this.setState({selected: value});
        } else {
            this.setState({
                selects: selects.push(value)
            });
        }
    }
}