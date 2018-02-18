'use strict';

import React from 'react';
import { Platform, StyleSheet, TouchableHighlight, Text, View } from 'react-native';

class HeaderView extends React.Component {
  constructor(props) {
    super(props);

    this.onTap = this.onTap.bind(this);
  }

  onTap() {
    if (this.props.onTap) {
      this.props.onTap();
    }
  }

  render() {
    const { left, right } = this.props;
    const platformHeaderStyle = Platform.select({
      ios: styles.headerIOS,
      android: styles.headerAndroid,
    });
    return (
      <View style={[styles.header, platformHeaderStyle]}>
        {left}
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor='rgba(0,0,0,0.0);'
          onPress={this.onTap}>
          <Text style={styles.headerText}>Amtrak Status</Text>
        </TouchableHighlight>
        {right}
      </View>
    );
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#1375b3',
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#000000',
  },
  headerIOS: {
    height: 64,
    paddingTop: 18,
  },
  headerAndroid: {
    height: 56,
  },
  headerText: {
    color: '#ffffff',
    fontSize: 30,
  },
});

export default HeaderView;
