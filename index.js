import React from 'react';
import { AppRegistry, StatusBar, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import StatusView from './src/components/status_view.js';
import AddRouteForm from './src/components/add_route_form.js';

StatusBar.setBarStyle('light-content', false);
StatusBar.setBackgroundColor('#1375b3');

let AmtrakStatus = StackNavigator(
  {
    StatusView: { screen: StatusView },
    AddRouteForm: { screen: AddRouteForm },
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#1375b3'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  }
);

AppRegistry.registerComponent('AmtrakStatus', () => AmtrakStatus);
