import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet
} from "react-native";
import { Card } from "native-base";
import { Container } from "../components";
import { Icon } from "native-base";
import MIcon from "react-native-vector-icons/MaterialIcons";
import _ from "lodash";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph
} from "react-native-chart-kit";
import { observer, inject } from "mobx-react";

@inject("authStore")
@observer
export default class AnswerItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {}

  render() {
    return (
      <Container back>
        <Card
          style={{
            width: "90%",
            alignSelf: "center",
            padding: 10,
            borderRadius: 20
          }}
        >
          <View
            style={{
              height: 20,
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <Text>Pytanie</Text>
            <View
              style={{
                flexDirection: "row"
              }}
            >
              <Icon
                name="calendar"
                style={{
                  fontSize: 18,
                  marginRight: 10
                }}
              />
              <Text>{this.props.item.publicatedDate}</Text>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              height: 70,
              justifyContent: "center"
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                fontSize: 24,
                fontWeight: "bold"
              }}
            >
              {this.props.item.questionName}
            </Text>
          </View>
          <View
            style={{
              justifyContent: "center"
            }}
          >
            {this.props.item.answerName === undefined ? (
              <View
                style={{
                  flexDirection: "row"
                }}
              >
                <Text>{`Odpowiedź: brak`}</Text>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: "row"
                }}
              >
                <Text>{`Odpowiedź: ${this.props.item.answerName}`}</Text>
              </View>
            )}
            {this.props.item.publicatedDateEnd === undefined ? (
              <View
                style={{
                  flexDirection: "row"
                }}
              >
                <Text>Wyniki: brak</Text>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: "row"
                }}
              >
                <Text>Wyniki:</Text>
                <MIcon name="equalizer" size={20} />
              </View>
            )}
          </View>
          {/* {this.props.item.selected == 0
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
                            }}/>} */}
          {/* {Moment().isBefore(Moment(this.props.item.date, "DD.MM.YYYY"))
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
} */}
        </Card>
      </Container>
    );
  }
}

const styles = StyleSheet.create({});
