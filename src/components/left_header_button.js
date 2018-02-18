'use strict';

import React from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

class LeftHeaderButton extends React.Component {
  static defaultProps = {
    right: false,
    left: true
  }

  constructor(props) {
    super(props);

    this.onTap = this.onTap.bind(this);
    this.renderText = this.renderText.bind(this);
    this.renderImage = this.renderImage.bind(this);
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

  renderImage() {
    return <Image style={[styles.image, this.props.style]} source={this.props.source} />;
  }

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
  }
};

const styles = StyleSheet.create({
  left: {
    position: 'absolute',
    left: 0,
    top: 5,
    height: 48,
    minWidth: 42,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  image: {
    height: 38,
    width: 38,
    tintColor: '#ffffff',
  },
  textView: {
  },
  text: {
    color: '#ffffff',
  }
});

export default LeftHeaderButton;
