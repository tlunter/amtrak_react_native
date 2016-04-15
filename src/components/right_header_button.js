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
        <Image style={[styles.image, this.props.style]} source={this.props.source} />
      </TouchableHighlight>
    );
  },
});

const styles = StyleSheet.create({
  right: {
    position: 'absolute',
    right: 0,
    height: 42,
    width: 42,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  image: {
    height: 38,
    width: 38,
    tintColor: '#ffffff',
  },
});

export default RightHeaderButton;
