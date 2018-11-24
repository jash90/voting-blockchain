import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Switch } from 'react-native';
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
export default class QuestionItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: []
    };
  }

  componentDidMount = () => {
    console.log(this.props.question);
    Api.getAnswers(this.props.authStore.getToken(), this.props.question.id)
      .then(response => {
        if (response.status === 200) {
          console.log(response);
          this.setState({ answers: response.data });
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
      <Container back right onPress={() => this.onSave()} icon="save">
        <View style={{ width: '100%', height: '100%'}}>
          <Card
            style={{
              width: '90%',
              alignSelf: 'center',
              padding: 10,
              borderRadius: 20
            }}>
            <TextInput
              style={{ fontSize: 20, height: 40 }}
              value={name}
              placeholder="Pytanie"
            />
          </Card>
          <Card
            style={{
              width: '90%',
              padding: 10,
              borderRadius: 20,
              alignSelf: 'center'
            }}>
            <View
              style={{
                height: 40,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
              <Text
                style={{
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                {multiAnswer ? 'Wiele odpowiedzi' : 'Jedna odpowiedź'}
              </Text>
              <Switch
                style={{
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                value={multiAnswer}
                onValueChange={multiAnswer => this.setState({ multiAnswer })}
              />
            </View>
          </Card>
          <SwipeListView
            useFlatList
            keyExtractor={(_item, index) => index.toString()}
            disableRightSwipe={true}
            closeOnRowBeginSwipe={true}
            data={this.state.answers}
            rightOpenValue={-38}
            renderItem={(data, rowMap) => (
              <Card
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  padding: 10,
                  borderRadius: 20
                }}>
                <Text>{data.index + 1 + ') ' + data.item.name}</Text>
              </Card>
            )}
            renderHiddenItem={(data, rowMap) => (
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'flex-end'
                }}>
                <View style={{ flex: 1 }} />
                <View
                  style={{
                    backgroundColor: 'red',
                    borderRadius: 360,
                    width: 38,
                    height: 38,
                    marginTop: 5,
                    marginRight: '5%',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                  <Icon name={'delete'} size={20} color={'#fff'} />
                </View>
              </View>
            )}
          />
          <Fab icon />
        </View>
      </Container>
    );
  }
}
const styles = StyleSheet.create({});
