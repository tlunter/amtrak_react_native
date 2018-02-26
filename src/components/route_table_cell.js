'use strict';

import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import Network from '../network';
import RouteStatusView from './route_status_view.js';
import containerStyles from '../styles/container.js';
const { container, fullWidth } = containerStyles;
import FontAwesome from './font_awesome.js';
import { angleDoubleDown, mapMarker, train } from '../icons.js';

class RouteTableCell extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      statuses: [],
      timeout: null,
      interval: null
    };

    this.load = this.load.bind(this);

    this.renderSpecsView = this.renderSpecsView.bind(this);
    this.renderSettingsView = this.renderSettingsView.bind(this);
    this.renderTrain = this.renderTrain.bind(this);
  }

  componentDidMount() {
    const timeout = setTimeout(this.load, 1);
    const interval = setInterval(this.load, 30000);

    this.setState({ timeout, interval });
  }

  componentWillUnmount() {
    clearTimeout(this.state.timeout);
    clearInterval(this.state.interval);
  }

  load() {
    const route = this.props.route;
    Network.get(`http://amtrak.tlunter.com/api/${route.from}/${route.to}.json`)
      .then((response) => {
        if (response instanceof TypeError) {
          throw response;
        } else {
          return response.json();
        }
      })
      .then((data) => {
        this.setState({ statuses: data });
      })
      .done();
  }

  renderSpecsView() {
    const { from, to, preferredTrain } = this.props.route;

    let preferredTrainRow;
    if (preferredTrain) {
      preferredTrainRow = (
        <View style={styles.headerRow}>
          <FontAwesome style={[styles.specsIcon, styles.headerPreferredTrain]}>
            {train}
          </FontAwesome>
          <Text style={styles.specsText}>
            {preferredTrain}
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <FontAwesome style={[styles.specsIcon, styles.headerFrom]}>
            {angleDoubleDown}
          </FontAwesome>
          <Text style={styles.specsText}>
            {from.toUpperCase()}
          </Text>
        </View>
        <View style={styles.headerRow}>
          <FontAwesome style={[styles.specsIcon, styles.headerTo]}>
            {mapMarker}
          </FontAwesome>
          <Text style={styles.specsText}>
            {to.toUpperCase()}
          </Text>
        </View>
        {preferredTrainRow}
      </View>
    );
  }

  renderSettingsView() {
    return (
      <View style={[styles.header, styles.settings]}>
        <TouchableHighlight
          onPress={this.props.editRoute}
          underlayColor="white">
          <FontAwesome style={styles.settingsImage}>{edit}</FontAwesome>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={this.props.deleteRoute}
          underlayColor="white">
          <FontAwesome style={styles.settingsImage}>{cross}</FontAwesome>
        </TouchableHighlight>
      </View>
    );
  }

  renderTrain({ item }) {
    return (
      <RouteStatusView
        status={item}
        preferredTrain={this.props.route.preferredTrain}
        style={styles.card} />
    );
  }

  render() {
    return (
      <View style={[styles.row, fullWidth]}>
        <View style={styles.card}>
          {this.renderSpecsView()}
        </View>
        <FlatList
          style={[container, fullWidth]}
          data={this.state.statuses}
          renderItem={this.renderTrain}
          keyExtractor={(item, index) => item.number.toString()} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  row: {
    margin: StyleSheet.hairlineWidth,
  },

  card: {
    flexDirection: 'row',

    backgroundColor: '#ffffff',

    margin: 12,
  },

  header: {
    padding: 12,
  },

  headerRow: {
    flexDirection: 'row',

    paddingTop: 10,
    paddingRight: 5,
    paddingBottom: 10,
    paddingLeft: 5,
  },

  headerFrom: {
    color: 'green',
  },

  headerTo: {
    color: 'red',
  },

  headerPreferredTrain: {
    color: 'rgba(19, 117, 179, 0.5)',
  },

  specsIcon: {
    paddingRight: 5,

    width: 40,

    textAlign: 'center',
    fontSize: 24,
  },

  specsText: {
    paddingLeft: 5,
    paddingRight: 5,

    fontSize: 18,
    textAlign: 'center',

    fontWeight: 'bold',
    color: '#000000',
  },

  settings: {
    position: 'absolute',
    right: 0,

    flexDirection: 'row',

    marginTop: 4,
  },
  settingsImage: {
    height: 14,
    width: 14,
    marginLeft: 5,
    marginRight: 5,
  },
});

export default RouteTableCell;
