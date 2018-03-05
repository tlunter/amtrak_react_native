'use strict';

import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Network from '../network';
import RouteStatusView from './route_status_view.js';
import RouteTableHeader from './route_table_header.js';

import containerStyles from '../styles/container.js';
const { container, fullWidth } = containerStyles;
import routeTableStyles from '../styles/route_table.js';
const { card } = routeTableStyles;

import FontAwesome from './font_awesome.js';
import { angleDoubleDown, edit, mapMarker, train } from '../icons.js';

class RouteTableCell extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      statuses: [],
      timeout: null,
      interval: null
    };

    this.load = this.load.bind(this);
    this.renderTrain = this.renderTrain.bind(this);
    this.startEditing = this.startEditing.bind(this);
    this.stopEditing = this.stopEditing.bind(this);
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

  startEditing() {
    this.setState({ editing: true });
  }

  stopEditing() {
    this.setState({ editing: false }, this.load);
  }

  renderTrain({ item }) {
    return (
      <RouteStatusView
        status={item}
        preferredTrain={this.props.route.preferredTrain}
        style={card} />
    );
  }

  render() {
    const header = (
      <RouteTableHeader
        route={this.props.route}
        editing={this.state.editing}
        startEditing={this.startEditing}
        stopEditing={this.stopEditing} />
    );

    let data;
    if (this.state.editing) {
      data = [];
    } else {
      data = this.state.statuses;
    }

    return (
      <View style={fullWidth}>
        <FlatList
          ListHeaderComponent={header}
          style={[container, fullWidth]}
          data={data}
          renderItem={this.renderTrain}
          keyExtractor={(item, index) => item.number.toString()}
          keyboardShouldPersistTaps="always" />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  row: {
    margin: StyleSheet.hairlineWidth,
  },
});

export default RouteTableCell;
