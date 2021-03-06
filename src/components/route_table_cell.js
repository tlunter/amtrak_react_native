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
      refreshing: false,
      errored: false,
      timeout: null,
      interval: null,
      editing: props.route.new,
      new: props.route.new,
    };

    this.load = this.load.bind(this);
    this.renderTrain = this.renderTrain.bind(this);
    this.renderEmptyItem = this.renderEmptyItem.bind(this);
    this.startEditing = this.startEditing.bind(this);
    this.updateRoute = this.updateRoute.bind(this);
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

  componentWillReceiveProps(nextProps) {
    if (this.state.new && !nextProps.route.new) {
      this.setState({ new: false });
      this.load();
    }
  }

  load() {
    const route = this.props.route;
    this.setState({ refreshing: true });
    Network.get(`http://amtrak.tlunter.com/api/${route.from}/${route.to}.json`)
      .then((response) => {
        if (response instanceof TypeError) {
          throw response;
        } else if (response.ok) {
          return response.json();
        } else {
          return response.text().then((text) => { throw text; });
        }
      })
      .catch((err) => {
        this.setState({ errored: true, statuses: [], refreshing: false });
      })
      .then((data) => {
        this.setState({ statuses: data, errored: false, refreshing: false });
      })
      .done();
  }

  startEditing() {
    this.setState({ editing: true });
  }

  updateRoute({ value, cancel, remove }) {
    // Cancelled editing existing
    if (cancel && !this.state.new) {
      this.setState({ editing: false });
    // Cancelled new or removed
    } else if (cancel || remove) {
      this.props.updateRoute({ remove: true });
    // Updating route
    } else if (value) {
      this.props.updateRoute({ value })
        .then(() => this.setState({ editing: false }, this.load));
    }
  }

  renderTrain({ item }) {
    return (
      <RouteStatusView
        status={item}
        preferredTrain={this.props.route.preferredTrain}
        style={card} />
    );
  }

  renderEmptyItem() {
    if (this.state.editing) {
      return null;
    }

    let msg;
    if (this.state.errored) {
      msg = "Oh no! Couldn't load results!";
    } else if (this.state.loading) {
      msg = "Loading!";
    } else {
      msg = "No trains found!";
    }

    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>{msg}</Text>
      </View>
    );
  }

  render() {
    const { route } = this.props;
    const header = (
      <RouteTableHeader
        route={route}
        editing={this.state.editing}
        startEditing={this.startEditing}
        updateRoute={this.updateRoute} />
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
          ListEmptyComponent={this.renderEmptyItem}
          style={[container, fullWidth]}
          refreshing={this.state.refreshing}
          onRefresh={this.load}
          data={data}
          renderItem={this.renderTrain}
          keyExtractor={(item, index) => `${route.id}-${item.number.toString()}-${index}`}
          keyboardShouldPersistTaps="always" />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  row: {
    margin: StyleSheet.hairlineWidth,
  },

  emptyItem: {
    alignItems: 'center',

    margin: 12,
  },

  emptyItemText: {
    fontStyle: 'italic',

    fontSize: 20,
  }
});

export default RouteTableCell;
