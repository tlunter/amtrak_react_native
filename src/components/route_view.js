'use strict';

import React from 'react';
import { ListView, StyleSheet, Text, View } from 'react-native';
import containerStyles from '../styles/container';
const { container, fullWidth } = containerStyles;

const RouteView = React.createClass({
  getInitialState() {
    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    return { dataSource: ds };
  },
  componentWillMount() {
    this.setState({ dataSource: this.state.dataSource.cloneWithRows(this.props.statuses) });
  },
  componentWillReceiveProps(newProps) {
    this.setState({ dataSource: this.state.dataSource.cloneWithRows(newProps.statuses) });
  },

  renderTrain(status) {
    const preferredTrain = parseInt(this.props.preferredTrain);
    const isHighlighted = preferredTrain && status.number === preferredTrain;
    return (
      <View style={[styles.train, isHighlighted && styles.highlightedTrain]}>
        <Text style={styles.trainNumber}>{status.number}</Text>
        <Text style={styles.trainScheduled}>{status.departure && status.departure.scheduled_time}</Text>
        <Text style={styles.trainEstimated}>{status.departure && status.departure.estimated_time}</Text>
      </View>
    );
  },
  render() {
    return (
      <View style={[container, styles.wrappingView]}>
        <ListView
          style={[container, fullWidth]}
          dataSource={this.state.dataSource}
          renderRow={this.renderTrain} />
      </View>
    );
  }
});

const textHeight = 20;

var styles = StyleSheet.create({
  wrappingView: {
    backgroundColor: '#ffffff',

    borderTopColor: '#f5f5f5',
    borderTopWidth: 1,
  },
  train: {
    flex: 1,
    flexDirection: 'row',
  },
  highlightedTrain: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(19, 117, 179, 0.5)',
  },
  trainNumber: {
    flex: 1,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,

    fontSize: textHeight,
    color: '#000000',
  },
  trainScheduled: {
    flex: 2,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,

    fontSize: textHeight,
    color: '#000000',
  },
  trainEstimated: {
    flex: 2,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,

    fontSize: textHeight,
    color: '#000000',
  },
});

export default RouteView;
