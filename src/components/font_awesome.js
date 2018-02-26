import React from 'react';
import { Platform, StyleSheet, Text } from 'react-native';

class FontAwesome extends React.Component {
  render() {
    return (
      <Text style={[styles.fontAwesome, this.props.style]}>
        {this.props.children}
      </Text>
    );
  }
}

const fontFamily = Platform.select({
  ios: 'Font Awesome 5 Free',
  android: 'FontAwesome5FreeSolid',
});

const styles = StyleSheet.create({
  fontAwesome: {
    backgroundColor:  'transparent',
    fontFamily: fontFamily,
  }
});

export default FontAwesome;
