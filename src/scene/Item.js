import React, {Component} from 'react';
import {
    View,
    Image,
    FlatList,
    Text,
    TouchableHighlight,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Dimensions
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Fab, Icon as NIcon} from 'native-base';
import Container from "@components/container";
import {Actions} from "react-native-router-flux";
import Accordion from 'react-native-collapsible/Accordion';
import {Icon} from 'native-base';
import _ from 'lodash';
import CheckBoxButton from '@components/check-box-button'
import Button from '@components/button'
import Moment from 'moment';
import {LineChart, BarChart, PieChart, ProgressChart, ContributionGraph} from 'react-native-chart-kit'
import Color from "../Color"
import 'babel-polyfill'
import Language from "../Language";
export default class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    };

    componentWillMount() {}

    render() {
        return (
            <Container back={false}>
                <View style={{
                    width: '100%'
                }}>
                    <Text
                        style={{
                        fontSize: 22,
                        textAlign: 'center',
                        fontWeight: 'bold'
                    }}>
                        {this.props.item.question}
                    </Text>
                </View>
                {this.props.item.selected == 0
                    ? <View/>
                    : this.props.item.stats == undefined
                        ? (
                            <View>
                                <Text>{Language.get('soonResult')}</Text>
                            </View>
                        )
                        : <PieChart data={this.props.item.stats} accessor='procentage' width={Dimensions
                            .get('window')
                            .width} // from react-native
    height={200} chartConfig={{
                            backgroundColor: Color.primaryColor,
                            backgroundGradientFrom: Color.secondaryColor,
                            backgroundGradientTo: Color.accentColor,
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignSelf: 'center',
                                borderRadius: 16
                            }
                        }} style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                            borderRadius: 16
                        }}/>}
                {Moment().isBefore(Moment(this.props.item.date, "DD.MM.YYYY"))
                    ? <View>
                            <CheckBoxButton
                                table={this.props.item.answers}
                                selected={this.props.item.selected}/>
                            <Button text={'Zapisz'}/>
                        </View>
                    : (
                        <View>
                            <Text>{Language.get('checkedAnswer') + this.props.item.answers[this.props.item.selected].text}</Text>
                        </View>
                    )
}

            </Container>
        );
    }

}

const styles = StyleSheet.create({});