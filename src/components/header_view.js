'use strict';

import React from 'react-native';
const { TouchableHighlight, View, Text, StyleSheet } = React;
import RightHeaderButton from './right_header_button.js';

const HeaderView = React.createClass({
  onTap: function() {
    if (this.props.onTap) {
      this.props.onTap();
    }
  },
  render: function() {
    let rightButton;
    React.Children.forEach(this.props.children, (child) => {
      if (child.props.right) {
        rightButton = child;
      }
    });
    return (
      <View style={styles.header}>
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor='rgba(0,0,0,0.0);'
          onPress={this.onTap}>
          <Text style={styles.headerText}>Amtrak Status</Text>
        </TouchableHighlight>
        {rightButton}
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 64,
    paddingTop: 18,
    backgroundColor: '#1375b3',
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#000000',
  },
  headerText: {
    color: '#ffffff',
    fontSize: 30,
  },
});

export default HeaderView;
