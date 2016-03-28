'use strict';

import { StatusBarIOS } from 'react-native';
import axios from 'axios';

let NetworkStack = 0;

const Network = {
  get(url) {
    NetworkStack += 1;
    this.handleNetworkIndicator();
    return axios.get(url)
      .then((response) => {
        NetworkStack -= 1;
        this.handleNetworkIndicator();
        return response;
      });
  },
  handleNetworkIndicator() {
    console.log(`NetworkStack: ${NetworkStack}`);
    StatusBarIOS.setNetworkActivityIndicatorVisible(NetworkStack > 0);
  }
};

export default Network;
