'use strict';

import React from 'react-native';
const { TouchableHighlight, StyleSheet, Image, Text, View } = React;
import containerStyles from '../styles/container.js';
const { container, horizontalCenter } = containerStyles;

var TabBar = React.createClass({
  getTabBarColors: function() {
    return StyleSheet.create({
      style: {
        backgroundColor: this.props.backgroundColor,
      }
    }).style;
  },
  getItemStyle: function() {
    return StyleSheet.create({
      text: {
        color: this.props.itemColor,
      },
      icon: {
        tintColor: this.props.itemColor,
      },
    });
  },
  getSelectedItemStyle: function() {
    return StyleSheet.create({
      text: {
        color: this.props.selectedItemColor,
      },
      icon: {
        tintColor: this.props.selectedItemColor,
      },
    });
  },
  render: function() {
    let selectedViews = [];
    let itemViews = [];
    React.Children.forEach(this.props.children, (view) => {
      let textStyles = [styles.itemText, this.getItemStyle().text];
      let imageStyles = [styles.itemIcon, this.getItemStyle().icon];
      let icon = view.props.icon;
      if (!this.props.currentTab || view.props.name === this.props.currentTab) {
        selectedViews.push(view.props.children);
        textStyles = [styles.itemText, this.getSelectedItemStyle().text];
        imageStyles = [styles.itemIcon, this.getSelectedItemStyle().icon];
        icon = view.props.selectedIcon || view.props.icon;
      }

      itemViews.push(
        <TouchableHighlight
          style={styles.item}
          key={view.props.name}
          underlayColor='rgba(255, 255, 255, 0.1);'
          onPress={() => this.props.setTab(view.props.name)}>
          <View style={styles.item}>
            <Image
              style={imageStyles}
              source={{uri: icon, scale: 1}} />
            <Text style={textStyles}>{view.props.display || view.props.name}</Text>
          </View>
        </TouchableHighlight>
      );
    });
    return (
      <View style={[container]}>
        {selectedViews}
        <View style={[horizontalCenter, styles.tabbar, this.getTabBarColors()]}>
          {itemViews}
        </View>
      </View>
    );
  }
});

var Item = React.createClass({
  PropTypes: {
    name: React.PropTypes.string.required,
    display: React.PropTypes.string,
    icon: React.PropTypes.string,
  },
  render: function() {
    return this.props.children;
  }
});

TabBar.Item = Item;

var styles = StyleSheet.create({
  tabbar: {
    height: 49,
    flexDirection: 'row',
  },
  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemIcon: {
    width: 34,
    height: 34,
    padding: 2,
    resizeMode: 'contain',
  },
  itemText: {
    fontSize: 9,
  },
});

export default TabBar;
