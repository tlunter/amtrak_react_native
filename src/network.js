'use strict';

import { StatusBar, Platform } from 'react-native';

let NetworkStack = 0;

const Network = {
  get(url) {
    NetworkStack += 1;
    this.handleNetworkIndicator();
    return fetch(url)
      .finally((response) => {
        NetworkStack -= 1;
        this.handleNetworkIndicator();
        return response;
      });
  },
  handleNetworkIndicator() {
    console.log(`NetworkStack: ${NetworkStack}`);

    if (Platform.OS === 'ios') {
      StatusBar.setNetworkActivityIndicatorVisible(NetworkStack > 0);
    }
  }
};

export default Network;
