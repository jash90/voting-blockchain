import React, {PureComponent} from "react";
import {View, FlatList, Text, StyleSheet} from "react-native";
import {Menu, MenuTrigger, MenuOptions, MenuOption} from "react-native-popup-menu";
import {Icon} from "native-base";
import PropTypes from "prop-types";

const CustomMenu = props => {
    let {
        style,
        children,
        layouts,
        ...other
    } = props;
    let {x, y, width} = layouts.triggerLayout;

    let position = {
        top: y,
        left: x,
        width: width - 55
    };

    return (
        <View {...other} style={[position, styles.contextMenu]}>
            {children}
        </View>
    );
};

class Dropdown extends PureComponent {
    render() {
        let {value, items, onSelect, getText} = this.props;

        return (
            <Menu renderer={CustomMenu} style={styles.menu}>
                <MenuTrigger>
                    <View style={styles.containerTrigger}>
                        <Text style={styles.textValue}>{value}</Text>
                        <Icon style={styles.icon} name="arrow-dropdown" fontSize={20}/>
                    </View>
                </MenuTrigger>
                <MenuOptions style={styles.menuOptions}>
                    <FlatList
                        style={styles.styleFlatList}
                        contentContainerStyle={styles.contentFlatList}
                        data={items}
                        renderItem={({item}) => (
                        <MenuOption style={styles.menuOption} onSelect={() => onSelect(item)}>
                            <Text allowFontScaling numberOfLines={1} style={styles.textItem}>
                                {getText(item)}
                            </Text>
                        </MenuOption>
                    )}
                        keyExtractor={(_item, index) => index.toString()}/>
                </MenuOptions>
            </Menu>
        );
    }
}

const styles = StyleSheet.create({
    icon: {
        marginRight: 5
    },
    contextMenu: {
        margin: 5,
        borderRadius: 2,
        backgroundColor: "white",
        shadowColor: "black",
        shadowOpacity: 0.3,
        shadowOffset: {
            width: 3,
            height: 3
        },
        shadowRadius: 4,
        elevation: 5
    },
    contentFlatList: {
        width: "100%"
    },
    styleFlatList: {
        width: "100%"
    },
    textItem: {
        flex: 1,
        padding: 5
    },
    menuOption: {
        width: "100%",
        backgroundColor: "#fff"
    },
    menuOptions: {
        width: "100%"
    },
    textValue: {
        fontSize: 18,
        flex: 1
    },
    containerTrigger: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 8,
        width: "100%"
    },
    menu: {
        backgroundColor: "#fff",
        margin: 10
    }
});

Dropdown.propTypes = {
    value: PropTypes.any.isRequired,
    items: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
    getText: PropTypes.func.isRequired
};
export default Dropdown;