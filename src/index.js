import React, { Component } from 'react';
import { Container, Echarts } from './components'

export default class App extends Component {
  render() {
    return (
      <Container width={this.props.width}>
        <Echarts {...this.props} />
      </Container>
    );
  }
}
