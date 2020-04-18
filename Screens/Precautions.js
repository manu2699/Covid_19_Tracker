import React, { Component } from "react";
import { View, Text, ImageBackground, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import LottieView from 'lottie-react-native';
export default class Tips extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Total: {},
    }
  }


  render() {
    return (
      <ScrollView stickyHeaderIndices={[0]} style={{ backgroundColor: "#F5F5F5" }
      }>
        <View>
          <View style={{ padding: wp("2%"), display: "flex", flexDirection: "row", backgroundColor: "white", elevation: 10 }}>
            <View style={styles.heading}>
              <Text style={styles.small}>SAFETY</Text>
              <Text style={{ fontFamily: "FredokaOne", fontSize: wp("6%"), marginLeft: wp("1%") }}>PRECAUTIONS</Text>
            </View>
          </View>
        </View>
        <View style={{ marginTop: hp("-2%") }}>
          <View style={styles.row}>
            <View style={styles.half}>
              <LottieView source={require('../assets/Img/immunity.json')} autoPlay loop
                style={{
                  width: wp("55%"),
                }} />
              <Text style={{ ...styles.cover, color: "#28a745" }}>Since the vaccine for COVID is under testing, boosting immunity is better way to fight against it.</Text>
            </View>
            <View style={styles.half}>
              <LottieView source={require('../assets/Img/quarantine.json')} autoPlay loop
                style={{
                  width: wp("55%"),
                }} />
              <Text style={{ ...styles.cover, paddingRight: wp("4%"), color: "#ff073a" }}>Self-Quartine is the safest technique to keep yourself away from COVID</Text>
            </View>
          </View>
        </View>
        <View style={{ marginTop: hp("-4%") }}>
          <View style={styles.row}>
            <View style={styles.half}>
              <LottieView source={require('../assets/Img/sdist.json')} autoPlay loop
                style={{
                  width: wp("55%"),
                }} />
              <Text style={{ ...styles.cover, color: "#007bff" }}>Please maintain social distancing while going out to buy essential things.</Text>
            </View>
            <View style={styles.half}>
              <LottieView source={require('../assets/Img/wash.json')} autoPlay loop
                style={{
                  width: wp("55%"),
                }} />
              <Text style={{ ...styles.cover, paddingRight: wp("4%") }}>Wash your hands often.</Text>
            </View>
          </View>
        </View>

      </ScrollView >
    );
  }
}

const styles = StyleSheet.create({
  row: {
    display: "flex",
    flexDirection: "row"
  },
  half: {
    width: wp("50%"),
  },
  small: {
    fontFamily: "Oxanium",
    fontSize: wp("6%"),
    color: "grey",
  },
  cover: {
    fontFamily: "Poppins-SemiBold",
    color: "black",
    fontSize: wp("4.2%"),
    textAlign: "justify",
    paddingLeft: wp("4%"),
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

