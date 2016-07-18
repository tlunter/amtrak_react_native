'use strict';

import React from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import TimerMixin from 'react-timer-mixin';
import Network from '../network';
import RouteView from './route_view.js';
import icons from '../icons.js';
const { cross, edit, circleRight } = icons;

const RouteTableCell = React.createClass({
  mixins: [TimerMixin],
  getInitialState() {
    return {
      settingsExposed: false,
      routeExposed: false,
      statuses: [],
    };
  },
  componentDidMount() {
    this.setTimeout(this.load, 1);
    this.setInterval(this.load, 30000);
  },

  load() {
    const route = this.props.route;
    Network.get(`http://amtrak.tlunter.com/${route.from}/${route.to}.json`)
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
  },

  toggleSettingsExposed() {
    this.setState({ settingsExposed: !this.state.settingsExposed });
  },
  toggleRouteExposed() {
    this.setState({ routeExposed: !this.state.routeExposed });
  },

  renderSpecsView() {
    const { from, to, preferredTrain } = this.props.route;
    let preferredTrainText;

    if (preferredTrain) {
      preferredTrainText = <Text style={styles.specsText}>{' '}({preferredTrain})</Text>;
    }

    return (
      <TouchableHighlight
        style={[styles.header, styles.specs]}
        onPress={this.toggleRouteExposed}
        onLongPress={this.toggleSettingsExposed}
        underlayColor="white">
        <View style={styles.specsView}>
          <Text style={styles.specsText}>{from.toUpperCase()}</Text>
          <Image style={styles.arrowImage} source={{uri: circleRight}} />
          <Text style={styles.specsText}>{to.toUpperCase()}</Text>
          {preferredTrainText}
        </View>
      </TouchableHighlight>
    );
  },
  renderSettingsView() {
    if (this.state.settingsExposed) {
      return (
        <View style={[styles.header, styles.settings]}>
          <TouchableHighlight
            onPress={this.props.editRoute}
            underlayColor="white">
            <Image style={styles.settingsImage} source={{uri: edit}} />
          </TouchableHighlight>
          <TouchableHighlight
            onPress={this.props.deleteRoute}
            underlayColor="white">
            <Image style={styles.settingsImage} source={{uri: cross}} />
          </TouchableHighlight>
        </View>
      );
    }
  },
  renderRouteRow() {
    if (this.state.routeExposed) {
      return (
        <RouteView
          statuses={this.state.statuses}
          preferredTrain={this.props.route.preferredTrain} />
      );
    }
  },
  render() {
    return (
      <View style={styles.row} ref="rowView">
        <View style={styles.headerRow}>
          {this.renderSpecsView()}
          {this.renderSettingsView()}
        </View>
        {this.renderRouteRow()}
      </View>
    );
  }
});

const styles = StyleSheet.create({
  row: {
    margin: StyleSheet.hairlineWidth,

    backgroundColor: '#ffffff',
  },

  headerRow: {
    flexDirection: 'row',
  },

  header: {
    padding: 10,
  },
  specs: {
    flex: 1,
  },
  specsView: {
    flexDirection: 'row',
  },
  specsText: {
    flex: 0,
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

  arrowImage: {
    marginTop: 4,
    marginLeft: 10,
    marginRight: 10,
    height: 14,
    width: 14,
  },
});

export default RouteTableCell;
