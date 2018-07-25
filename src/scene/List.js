import React, {Component} from 'react';
import {
    View,
    Image,
    FlatList,
    Text,
    TouchableHighlight,
    StyleSheet,
    TouchableOpacity,
    Modal
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Fab, Button, Icon as NIcon} from 'native-base';
import Container from "@components/container";
import {Actions} from "react-native-router-flux";
import Accordion from 'react-native-collapsible/Accordion';
import {Icon} from 'native-base';
import _ from 'lodash';
const BACON_IPSUM = 'Bacon ipsum dolor amet chuck turducken landjaeger tongue spare ribs. Picanha bee' +
        'f prosciutto meatball turkey shoulder shank salami cupim doner jowl pork belly c' +
        'ow. Chicken shankle rump swine tail frankfurter meatloaf ground round flank ham ' +
        'hock tongue shank andouille boudin brisket. ';

const CONTENT = [
    {
        title: 'First',
        content: BACON_IPSUM
    }, {
        title: 'Second',
        content: BACON_IPSUM
    }, {
        title: 'Third',
        content: BACON_IPSUM
    }, {
        title: 'Fourth',
        content: BACON_IPSUM
    }, {
        title: 'Fifth',
        content: BACON_IPSUM
    }
];

const SELECTORS = [
    {
        title: 'First',
        value: 0
    }, {
        title: 'Third',
        value: 2
    }, {
        title: 'None',
        value: false
    }
];

import CheckBoxButton from '@components/check-box-button'

export default class List extends Component {
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
                    question: 'Czy lubisz kawę ?',
                    answers: [
                        {
                            id: 1,
                            text: 'Tak'
                        }, {
                            id: 2,
                            text: 'Nie'
                        }, {
                            id: 3,
                            text: 'Może'
                        }, {
                            id: 4,
                            text: 'Nie twoja sprawa'
                        }
                    ],
                    stats: [
                        {
                            procentage: 20,
                            name: 'Tak'
                        }, {
                            procentage: 30,
                            name: 'Nie'
                        }, {
                            procentage: 10,
                            name: 'Może'
                        }, {
                            procentage: 40,
                            name: 'Nie twoja sprawa'
                        }
                    ],
                    date: '01.07.2018',
                    selected: 1
                }, {
                    Id: 1,
                    question: 'Czy lubisz kawę ?',
                    answers: [
                        {
                            id: 1,
                            text: 'Tak'
                        }, {
                            id: 2,
                            text: 'Nie'
                        }, {
                            id: 3,
                            text: 'Może'
                        }, {
                            id: 4,
                            text: 'Nie twoja sprawa'
                        }
                    ],
                    date: '31.07.2018',
                    selected: 0
                }, {
                    Id: 1,
                    question: 'Czy lubisz kawę ?',
                    answers: [
                        {
                            id: 1,
                            text: 'Tak'
                        }, {
                            id: 2,
                            text: 'Nie'
                        }, {
                            id: 3,
                            text: 'Może'
                        }, {
                            id: 4,
                            text: 'Nie twoja sprawa'
                        }
                    ],
                    date: '20.07.2018',
                    selected: 1
                }
            ],
            activeSection: false,
            collapsed: true
        }
    };

    toggleExpanded = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
    };

    setSection = section => {
        this.setState({activeSection: section});
    };

    renderHeader = (section, _, isActive) => {
        return (
            <Animatable.View
                duration={1}
                style={[
                styles.header, isActive
                    ? styles.active
                    : styles.inactive
            ]}
                transition="backgroundColor">
                <Text style={styles.headerText}>{section.question}</Text>
            </Animatable.View>
        );
    };

    renderContent(section, _, isActive) {
        return (
            <Animatable.View
                duration={1}
                style={[
                styles.content, isActive
                    ? styles.active
                    : styles.inactive
            ]}
                transition="backgroundColor">
                <CheckBoxButton
                    table={section.answers}
                    selected={section.selected}
                    onChange=
                    {(value) => this.selected(section,value) }/>
            </Animatable.View>
        );
    }

    componentWillMount() {}

    render() {
        return (
            <Container back={false}>
                <FlatList
                    keyExtractor={(item, index) => String(index)}
                    data={this.state.table}
                    renderItem={({item}) => <TouchableOpacity onPress={() => this.selectQuestion(item)}>
                    <View>
                        <Text style={{fontSize:22}}>{item.question}</Text>
                    </View>
                </TouchableOpacity>}/>
            </Container>
        );
    }
    selected(item, value) {
        var table = this.state.table;
        var index = _.findIndex(table, item);
        table[index].selected = value;
        this.setState({table});
    }
    selectQuestion(item) {
        Actions.Item({item});
    }
    renderPawn(min, max) {
        var table = [];
        for (var i = 0; i < max; i++) {
            if (i < min) {
                table.push(<Icon size={15} name={'pawn'} color={'black'}/>);
            } else {
                table.push(<Icon size={15} name={'pawn'} color={'gray'}/>);
            }
        }
        return table;
    }
    openItem(item) {
        Actions.Item({item: item});
    }
}

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.85)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F5FCFF'
    },
    title: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: '300',
        marginBottom: 20
    },
    header: {
        backgroundColor: '#F5FCFF',
        padding: 10
    },
    headerText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500'
    },
    content: {
        padding: 20,
        backgroundColor: '#fff'
    },
    active: {
        backgroundColor: 'rgba(255,255,255,1)'
    },
    inactive: {
        backgroundColor: 'rgba(245,252,255,1)'
    },
    selectors: {
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    selector: {
        backgroundColor: '#F5FCFF',
        padding: 10
    },
    activeSelector: {
        fontWeight: 'bold'
    },
    selectTitle: {
        fontSize: 14,
        fontWeight: '500',
        padding: 10
    }
});