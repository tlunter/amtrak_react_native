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

    this.state = { routes: [], adding: false, addedNew: false };

    this.load = this.load.bind(this);
    this.addRoute = this.addRoute.bind(this);
    this.renderPage = this.renderPage.bind(this);
    this.updateRoute = this.updateRoute.bind(this);

    props.navigation.addListener('didFocus', this.load);
  }

  componentWillMount() {
    this.props.navigation.setParams({ addRoute: this.addRoute });
  }

  componentDidMount() {
    this.load();
  }

  componentWillReceiveProps() {
    this.load();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.adding && this.state.adding) {
      this.load().then(() => {
        console.log("Scroll to end");
        setTimeout(() => this.list.scrollToEnd(), 20);
      });
    } else if (prevState.adding && !this.state.adding) {
      if (this.state.addedNew) {
        this.load().then(() => {
          console.log("Scroll to end");
          setTimeout(() => this.list.scrollToEnd(), 20);
        });
      } else {
        this.load().then(() => {
          console.log("Scroll to beginning");
          setTimeout(() => this.list.scrollToEnd(), 20);
        });
      }
    }
  }

  load() {
    return new Promise((resolve, reject) => {
      Route.all()
        .then((routes) => {
          console.log('Load Routes:', JSON.stringify(routes));
          this.setState({ routes: routes }, resolve);
        });
    });
  }

  addRoute() {
    this.setState({ adding: true });
  }

  updateRoute(route) {
    return ({ value, remove }) => {
      if (remove && this.state.adding) {
        return new Promise((resolve, reject) => {
          this.setState({ adding: false, addedNew: false }, resolve);
        });
      } else if (remove) {
        return route.remove().then(this.load);
      } else if (value) {
        return route.update(value).then(this.load);
      }
    }
  }

  renderPage({ item }) {
    return (
      <RouteTableCell
        key={item.id}
        route={item}
        new={item.new}
        updateRoute={this.updateRoute(item)}/>
    );
  }

  render() {
    let routes = this.state.routes.slice(0);
    if (this.state.adding) {
      routes.push(new Route({ new: true }));
    }

    return (
      <FlatList
        ref={(component) => this.list = component}
        data={routes}
        renderItem={this.renderPage}
        keyExtractor={(item, index) => item.id}
        style={[styles.list, containerStyles.container, containerStyles.fullWidth]}
        horizontal={true}
        pagingEnabled={true}
        keyboardShouldPersistTaps="always" />
    );
  }
};

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#e6e8ed',
  }
});

export default StatusView;
