'use strict';

import React, { StyleSheet, TouchableHighlight, View, Image } from 'react-native';

const RightHeaderButton = React.createClass({
  getDefaultProps() {
    return { right: true, left: false };
  },
  onTap: function() {
    if (this.props.onTap) {
      this.props.onTap();
    }
  },
  render: function() {
    return (
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor='rgba(0,0,0,0.0);'
        onPress={this.onTap}
        style={styles.right}>
        <Image style={styles.image} source={this.props.source} />
      </TouchableHighlight>
    );
  },
});

const styles = StyleSheet.create({
  right: {
    position: 'absolute',
    right: 0,
    padding: 4,
  },
  image: {
    height: 38,
    width: 38,
    tintColor: '#ffffff',
  },
});

export default RightHeaderButton;
