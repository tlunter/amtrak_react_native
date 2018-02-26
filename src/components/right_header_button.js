'use strict';
import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import FontAwesome from './font_awesome.js';
import Icons from '../icons.js';

class RightHeaderButton extends React.Component {
  constructor(props) {
    super(props);

    this.onTap = this.onTap.bind(this);
    this.renderText = this.renderText.bind(this);
    this.renderIcon = this.renderIcon.bind(this);
  }

  onTap() {
    if (this.props.onTap) {
      this.props.onTap();
    }
  }

  renderText() {
    return (
      <View style={styles.textView}>
        <Text style={[styles.text, this.props.style]}>{this.props.text}</Text>
      </View>
    );
  }

  renderIcon() {
    return (
      <FontAwesome style={[styles.icon, this.props.style]}>
        {Icons[this.props.source]}
      </FontAwesome>
    );
  }

  render() {
    return (
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor='rgba(0,0,0,0.0);'
        onPress={this.onTap}
        style={styles.right}>
        {this.props.text ? this.renderText() : this.renderIcon()}
      </TouchableHighlight>
    );
  }
};

const styles = StyleSheet.create({
  right: {
    height: 42,
    minWidth: 42,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  icon: {
    color: '#ffffff',
    backgroundColor:  'transparent',
    fontSize: 24,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  textView: {
    padding: 3,
  },
  text: {
    color: '#ffffff',
  }
});

export default RightHeaderButton;
