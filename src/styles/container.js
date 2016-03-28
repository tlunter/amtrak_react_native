'use strict';

import React, { Dimensions, StyleSheet } from 'react-native';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },
  horizontalCenter: {
    justifyContent: 'center',
  },
  verticalTop: {
    alignItems: 'flex-start',
  },
  verticalCenter: {
    alignItems: 'center',
  },
  fullWidth: {
    width: Dimensions.get('window').width,
  },
  debug: {
    backgroundColor: '#999999',
  },
});

export default styles;
