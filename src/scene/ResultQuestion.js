import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Switch,
  FlatList
} from 'react-native';
import { Card } from 'native-base';
import { Container, Fab } from '../components';
import _ from 'lodash';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph
} from 'react-native-chart-kit';
import Api from '../api';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SwipeListView } from 'react-native-swipe-list-view';
import { observer, inject } from 'mobx-react';

@inject('authStore')
@observer
export default class ResultQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      answersCounts: []
    };
  }

  componentDidMount = () => {
    console.log(this.props.question);
    Api.getAnswerUser(this.props.authStore.getToken(), this.props.question.id)
      .then(response => {
        if (response.status === 200) {
          this.setState({ answers: response.data });
          let answers = _.uniq(this.state.answers.map(a => a.name));
          let answersCounts = [];
          answers.forEach(e => {
            let sum = _.sumBy(this.state.answers, o => {
              return o.name === e ? 1 : 0;
            });
            answersCounts.push({ name: e, sum: sum });
          });
          this.setState({ answersCounts });
        } else if (response.message) {
          alert(response.message);
        } else {
          alert(response.message.detail);
        }
      })
      .catch(error => {
        alert(error);
      });
  };

  render() {
    let { name, multiAnswer } = this.props.question;
    return (
      <Container back>
        <View style={{ width: '100%', height: '100%' }}>
          <Card
            style={{
              width: '90%',
              alignSelf: 'center',
              padding: 10,
              borderRadius: 20,
              borderColor: 'grey',
              borderWidth: 1
            }}>
            <Text
              style={{
                fontSize: 24,
                textAlign: 'center',
                fontWeight: 'bold'
              }}>
              {name}
            </Text>
          </Card>
          <Card
            style={{
              width: '90%',
              padding: 10,
              borderRadius: 20,
              alignSelf: 'center',
              justifyContent: 'center'
            }}>
            <FlatList
              data={_.sortBy(this.state.answersCounts, e => {
                return -e.sum;
              })}
              renderItem={({ item }) => (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}>
                  <Text>{item.name}</Text>
                  <Text>{this.getProcentage(item)}</Text>
                </View>
              )}
              ListFooterComponent={() => (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}>
                  <Text>{'Ilość głosów:'}</Text>
                  <Text>{this.state.answers.length}</Text>
                </View>
              )}
            />
          </Card>
        </View>
      </Container>
    );
  }
  getProcentage(item) {
    return (
      Number(item.sum / _.sumBy(this.state.answersCounts, 'sum')).toFixed(2) *
        100 +
      '%'
    );
  }
}
const styles = StyleSheet.create({});
