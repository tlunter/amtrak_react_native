'use strict';

import React, { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

const LeftHeaderButton = React.createClass({
  getDefaultProps() {
    return { right: false, left: true };
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
  render() {
    return (
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor='rgba(0,0,0,0.0);'
        onPress={this.onTap}
        style={styles.left}>
        {this.props.text ? this.renderText() : this.renderImage()}
      </TouchableHighlight>
    );
  },
});

const styles = StyleSheet.create({
  left: {
    position: 'absolute',
    left: 0,
    height: 42,
    width: 42,
    alignItems: 'flex-end',
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

export default LeftHeaderButton;
