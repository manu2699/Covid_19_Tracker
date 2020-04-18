import * as React from 'react';
import Svg, { Defs, Path } from 'react-native-svg';

class StatePath extends React.Component {
  state = {
    myState: this.props.myState,
    stateName: this.props.stateName,
  };

  componentWillReceiveProps() {
    this.setState({ stateName: this.props.stateName });
  }

  render() {
    return (
      <Path
        // strokeLinecap="round"
        // strokeLinejoin="round"
        fill={this.props.fill}
        onPress={this.props.onPress}
        fill={
          this.state.myState === this.props.stateName
            ? '#e86f9a'
            : this.props.fill
        }
        strokeWidth={this.props.strokeWidth}
        stroke={'#e86f9a'}
        // stroke={
        //   this.state.myState === this.props.stateName ? '#ff073a' : '#ffb4c3'
        // }
        d={this.props.d}
      />
    );
  }
}

export default StatePath;
