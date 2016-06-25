'use strict';

import React, { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

const RightHeaderButton = React.createClass({
  getDefaultProps() {
    return { right: true, left: false };
  },
  onTap: function() {
    if (this.props.onTap) {
      this.props.onTap();
    }
  },
  renderText() {
    return <Text style={[styles.text, this.props.style]}>{this.props.text}</Text>;
  },
  renderImage() {
    return <Image style={[styles.image, this.props.style]} source={this.props.source} />;
  },
  render: function() {
    return (
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor='rgba(0,0,0,0.0);'
        onPress={this.onTap}
        style={styles.right}>
        {this.props.text ? this.renderText() : this.renderImage()}
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
  text: {
    color: '#ffffff',
  }
});

export default RightHeaderButton;
