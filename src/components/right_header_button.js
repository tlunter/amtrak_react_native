'use strict';
import React from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

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
    return (
      <View style={styles.textView}>
        <Text style={[styles.text, this.props.style]}>{this.props.text}</Text>
      </View>
    );
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
    minWidth: 42,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  image: {
    height: 38,
    width: 38,
    tintColor: '#ffffff',
  },
  textView: {
    padding: 3,
  },
  text: {
    color: '#ffffff',
  }
});

export default RightHeaderButton;
