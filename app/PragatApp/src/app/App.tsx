import * as React from 'react';

import SwitchNavigator from "../app/navigation/SwitchNavigator"

console.disableYellowBox = true;

export default class App extends React.Component {
  render() {
    return (
      <SwitchNavigator />
    );
  }
}
