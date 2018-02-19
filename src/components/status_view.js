import React from 'react';
import { StyleSheet, View, ListView } from 'react-native';
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
          source={{uri: plus}}
          onTap={params.addRoute}
          style={{ height: 26, width: 26 }} />
      ),
    };
  };

  constructor(props) {
    super(props);

    const lv = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = { routes: lv.cloneWithRows([]) };

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
        this.setState({ routes: this.state.routes.cloneWithRows(routes) });
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

  renderPage(route) {
    return (
      <RouteTableCell
        key={route.id}
        route={route}
        editRoute={this.editRoute.bind(this, route)}
        deleteRoute={this.deleteRoute.bind(this, route)} />
    );
  }

  render() {
    return (
      <View style={containerStyles.container}>
        <ListView
          dataSource={this.state.routes}
          renderRow={this.renderPage}
          style={styles.list}
          enableEmptySections={true} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#eeeeee',
  }
});

export default StatusView;
