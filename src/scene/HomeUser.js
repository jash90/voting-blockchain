import React, { Component } from "react";
import {
  View,
  Image,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal
} from "react-native";
import * as Animatable from "react-native-animatable";
import { Fab, Button, Icon as NIcon } from "native-base";
import { Container, CheckBoxButton } from "../components";
import { Actions } from "react-native-router-flux";
import Accordion from "react-native-collapsible/Accordion";
import { Icon, Card } from "native-base";
import _ from "lodash";
import MIcon from "react-native-vector-icons/MaterialIcons";
import { LocalDate, DateTimeFormatter } from "js-joda";
import Api from "../api";
import { observer, inject } from "mobx-react";

@inject("authStore")
@observer
export default class HomeUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      selected: 0,
      visible: false,
      item: {},
      table: [
        {
          Id: 1,
          question: "Czy lubisz kawę ?",
          answers: [
            {
              id: 1,
              text: "Tak"
            },
            {
              id: 2,
              text: "Nie"
            },
            {
              id: 3,
              text: "Może"
            },
            {
              id: 4,
              text: "Nie twoja sprawa"
            }
          ],
          stats: [
            {
              procentage: 20,
              name: "Tak"
            },
            {
              procentage: 30,
              name: "Nie"
            },
            {
              procentage: 10,
              name: "Może"
            },
            {
              procentage: 40,
              name: "Nie twoja sprawa"
            }
          ],
          date: "01.07.2018",
          selected: 1
        },
        {
          Id: 1,
          question: "Czy lubisz kawę ?",
          answers: [
            {
              id: 1,
              text: "Tak"
            },
            {
              id: 2,
              text: "Nie"
            },
            {
              id: 3,
              text: "Może"
            },
            {
              id: 4,
              text: "Nie twoja sprawa"
            }
          ],
          date: "31.07.2018",
          selected: 0
        },
        {
          Id: 1,
          question: "Czy lubisz kawę ?",
          answers: [
            {
              id: 1,
              text: "Tak"
            },
            {
              id: 2,
              text: "Nie"
            },
            {
              id: 3,
              text: "Może"
            },
            {
              id: 4,
              text: "Nie twoja sprawa"
            }
          ],
          date: "20.07.2018",
          selected: 1
        }
      ],
      activeSection: false,
      collapsed: true
    };
  }
  componentDidMount = () => {
    Api.getQuestionsUser(this.props.authStore.getToken())
      .then(response => {
        if (response.status === 200) {
          this.setState({ questions: response.data });
        } else if (response.message) {
          alert(response.message);
        }
      })
      .catch(error => {
        alert(error);
      });
  };
  render() {
    return (
      <Container back>
        <View
          style={{
            width: "100%",
            height: "100%"
          }}
        >
          <FlatList
            keyExtractor={(item, index) => String(index)}
            data={this.state.questions}
            renderItem={({ item }) => (
              <TouchableWithoutFeedback
                onPress={() => this.selectQuestion(item)}
              >
                <Card
                  style={{
                    flex: 1,
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
                      <Text>{item.publicatedDate}</Text>
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
                      {item.questionName}
                    </Text>
                  </View>
                  <View
                    style={{
                      justifyContent: "center"
                    }}
                  >
                    {item.answerName === undefined ? (
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
                        <Text>{`Odpowiedź: ${item.answerName}`}</Text>
                      </View>
                    )}
                    {item.publicatedDateEnd === undefined ? (
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
                </Card>
              </TouchableWithoutFeedback>
            )}
          />
        </View>
      </Container>
    );
  }
  selectQuestion(item) {
    Actions.AnswerItem({ item });
  }
  getEnochDay(date) {
    return LocalDate.parse(
      date,
      DateTimeFormatter.ofPattern("dd.MM.yyyy")
    ).toEpochDay();
  }
}

const styles = StyleSheet.create({});
