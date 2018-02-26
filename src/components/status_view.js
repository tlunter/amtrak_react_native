import React from 'react';
import {
  FlatList,
  Platform,
  StyleSheet,
  View
} from 'react-native';
import RightHeaderButton from './right_header_button.js';
import RouteTableCell from './route_table_cell.js';
import Route from '../models/routes.js';
import containerStyles from '../styles/container.js';
import { plus } from '../icons.js';

class StatusView extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      title: 'Amtrak Status',
      headerRight: (
        <RightHeaderButton
          source='plus'
          onTap={params.addRoute}
          style={{ height: 26, width: 26 }} />
      ),
    };
  };

  constructor(props) {
    super(props);

    this.state = { routes: [] };

    this.load = this.load.bind(this);
    this._addRoute = this._addRoute.bind(this);
    this.editRoute = this.editRoute.bind(this);
    this.deleteRoute = this.deleteRoute.bind(this);
    this.renderPage = this.renderPage.bind(this);

    props.navigation.addListener('didFocus', this.load);
  }

  componentWillMount() {
    this.props.navigation.setParams({ addRoute: this._addRoute });
  }

  componentDidMount() {
    this.load();
  }

  componentWillReceiveProps() {
    this.load();
  }

  load() {
    Route.all()
      .then((routes) => {
        console.log('Load Routes:', JSON.stringify(routes));
        this.setState({ routes: routes });
      })
      .done();
  }

  _addRoute() {
    this.props.navigation
      .push('AddRouteForm', { addRoute: true });
  }

  editRoute(route) {
    this.props.navigation
      .push('AddRouteForm', { editRoute: true, route: route });
  }

  deleteRoute(route) {
    route.remove().then(this.load).done();
  }

  renderPage({ item }) {
    return (
      <RouteTableCell
        key={item.id}
        route={item}
        editRoute={this.editRoute.bind(this, item)}
        deleteRoute={this.deleteRoute.bind(this, item)} />
    );
  }

  render() {
    return (
      <FlatList
        ref={(component) => this.list = component}
        data={this.state.routes}
        renderItem={this.renderPage}
        keyExtractor={(item, index) => item.id}
        style={[styles.list, containerStyles.container, containerStyles.fullWidth]}
        horizontal={true}
        pagingEnabled={true} />
    );
  }
};

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#eeeeee',
  }
});

export default StatusView;
