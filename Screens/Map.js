import React from 'react';
import { StyleSheet, View, Dimensions, ScrollView, Text } from 'react-native';
import India from './India';
import ZoomableSvg from 'zoomable-svg';
const { width, height } = Dimensions.get('window');
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";


class Map extends React.Component {
  state = {
    constrain: true,
    constraints: {
      combine: 'dynamic',
      scaleExtent: [width / height, 5],
      translateExtent: [
        [0, 0],
        [1500, 1500],
      ],
    },
  };

  render() {
    const { constrain, constraints } = this.state;
    return (
      <ScrollView stickyHeaderIndices={[0]} style={{ backgroundColor: "#F5F5F5", padding: wp("1%") }}>
        <View>
          <View style={{ padding: wp("2%"), display: "flex", flexDirection: "row", backgroundColor: "white", elevation: 10 }}>
            <View style={styles.heading}>
              <Text style={styles.small}> &#x1F1EE;&#x1F1F3; STATE WISE </Text>
              <Text style={{ fontFamily: "FredokaOne", fontSize: wp("6%"), marginLeft: wp("1%") }}>TRACKER</Text>
            </View>
          </View>
        </View>
        <View>
          <ZoomableSvg
            align="mid"
            vbWidth={850}
            vbHeight={850}
            width={width}
            height={height}
            initialTop={-170}
            meetOrSlice="meet"
            svgRoot={India}
            childProps={this.childProps}
            constrain={constrain ? constraints : null}></ZoomableSvg>
        </View>
      </ScrollView>

    );
  }
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
  },
  small: {
    fontFamily: "Oxanium",
    fontSize: wp("6%"),
    color: "grey",
  },
  heading: {
    padding: wp("1.5%"),
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    borderBottomColor: "#000",
    backgroundColor: "white",
  }
});

export default Map;
