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
import {Card, Fab} from 'native-base';
import {Container, Button, CheckBoxButton} from "../components";
import {Actions} from "react-native-router-flux";
import Accordion from 'react-native-collapsible/Accordion';
import {Icon} from 'native-base';
import MIcon from "react-native-vector-icons/MaterialIcons";
import _ from 'lodash';
import Moment from 'moment';
import {LineChart, BarChart, PieChart, ProgressChart, ContributionGraph} from 'react-native-chart-kit'
import Color from "../Color"
import 'babel-polyfill'
import Language from "../Language";
import Api from "../api";
export default class QuestionItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answers: []
        }
    };

    componentDidMount = () => {
        Api
            .getAnswers(this.props.token, this.props.question.Id)
            .then(response => {
                if (response.status === 200) {
                    this.setState({answers: response.data});
                } else if (response.message) {
                    alert(response.message);
                } else {
                    alert(response.message.detail);
                }
            })
            .catch(error => {
                alert(error);
            })
    }

    render() {
        return (
            <Container back>
                <View style={{}}>
                    <FlatList
                        data={this.state.answers}
                        ListHeaderComponent=
                        { () =><Card style={{ width: "90%", alignSelf: "center", padding: 10, borderRadius: 20 }}><Text style={{fontSize:20, textAlign:"center", fontWeight:"bold"}}>{this.props.question.name}</Text></Card>}
                        renderItem=
                        { ({item}) =><Card style={{ width: "90%", alignSelf: "center", padding: 10, borderRadius: 20 }}><Text>{JSON.stringify(item)}</Text></Card>}/>
                </View>
            </Container>
        );
    }

}

const styles = StyleSheet.create({});