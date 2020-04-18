import React, { Component } from "react";
import { View, Text, ImageBackground, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import AnimateNumber from 'react-native-animate-number';
import axios from 'axios';
import SplashScreen from 'react-native-splash-screen';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/Fontisto';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Total: {},
      loading: false
    }
  }

  load = () => {
    this.setState({ loading: true, Total: {} })
    axios.get('https://api.covid19india.org/data.json').then(res => {
      console.log(res.data.statewise[0])
      this.setState({
        Total: res.data.statewise[0],
        loading: false
      })
    })
  }

  componentDidMount() {
    this.load();
    SplashScreen.hide();
  }

  render() {
    if (this.state.loading) {
      return (<ActivityIndicator style={{ flex: 1, justifyContent: "center", alignItems: "center" }} size="large" color="#696969" />)
    }
    else {
      return (
        <ScrollView stickyHeaderIndices={[0]} style={{ backgroundColor: "#F5F5F5" }}>
          <View>
            <View style={{ padding: wp("2%"), display: "flex", flexDirection: "row", backgroundColor: "white", elevation: 10 }}>
              <View style={styles.heading}>
                <Text style={styles.small}>COVID 19</Text>
                <Text style={{ fontFamily: "FredokaOne", fontSize: wp("6%"), marginLeft: wp("1%") }}>TRACKER &#x1F1EE;&#x1F1F3;</Text>
              </View>
            </View>
          </View>
          <View style={{ display: "flex", flexDirection: "row", alignItems: "center", paddingLeft: wp("3%") }}>
            <LottieView source={require('../assets/Img/covidfight.json')} autoPlay loop
              style={{
                width: wp("35%"),
              }} />
            <View style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Text style={styles.cover}>Last Updated at: {"\n"}{this.state.Total.lastupdatedtime}</Text>
              <TouchableOpacity onPress={() => { this.load() }} style={styles.button}>
                <Text style={{ fontFamily: "FredokaOne", fontSize: wp("4%"), color: "white" }}>
                  <Icon name={"cloud-refresh"} size={wp("4%")} style={{ color: "white", margin: wp("2%") }} />
                  {" "}Refresh
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <ImageBackground source={require("../assets/Img/total.png")}
            style={styles.card}>
            <View>
              <Text style={styles.upRight}>	&#x1F48A; Confirmed</Text>
              <Text style={styles.downLeft}> Cumulative :<AnimateNumber
                value={this.state.Total.confirmed}
                countBy={Math.round(this.state.Total.confirmed / 20)}
                formatter={(val) => {
                  return " " + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }} /></Text>
              <Text style={styles.downLeft}> Today :<AnimateNumber
                value={this.state.Total.deltaconfirmed}
                countBy={10}
                formatter={(val) => {
                  return " " + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }} /> </Text>
            </View>
          </ImageBackground>
          <ImageBackground source={require("../assets/Img/active.png")}
            style={{
              width: wp("88%"),
              height: hp("13.5%"),
              marginLeft: wp("5%"),
              marginRight: wp("5%"),
              marginTop: wp("2%"),
              padding: wp("5%"),
              alignSelf: "center"
            }}>
            <View>
              <Text style={styles.upRight}> 💉 Active </Text>
              <Text style={styles.downLeft}> Cumulative :<AnimateNumber
                value={this.state.Total.active}
                countBy={Math.round(this.state.Total.active / 20)}
                formatter={(val) => {
                  return " " + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }} /> </Text>
            </View>
          </ImageBackground>

          <ImageBackground source={require("../assets/Img/recovered.png")}
            style={styles.card}>
            <View>
              <Text style={styles.upRight}> &#128170;&#127996; Cured</Text>
              <Text style={styles.downLeft}> Cumulative :<AnimateNumber
                value={this.state.Total.recovered}
                countBy={Math.round(this.state.Total.recovered / 20)}
                formatter={(val) => {
                  return " " + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }} /></Text>
              <Text style={styles.downLeft}> Today : <AnimateNumber
                value={this.state.Total.deltarecovered}
                countBy={10}
                formatter={(val) => {
                  return " " + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }} /></Text>
            </View>
          </ImageBackground>

          <ImageBackground source={require("../assets/Img/deaths.png")}
            style={styles.card}>
            <Text style={styles.upRight}>	&#9904;&#65039; Deceased</Text>
            <Text style={styles.downLeft}> Cumulative :<AnimateNumber
              value={this.state.Total.deaths}
              countBy={Math.round(this.state.Total.deaths / 20)}
              formatter={(val) => {
                return " " + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              }} /></Text>
            <Text style={styles.downLeft}> Today : <AnimateNumber
              value={this.state.Total.deltadeaths}
              countBy={10}
              formatter={(val) => {
                return " " + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              }} /></Text>
          </ImageBackground>
        </ScrollView >
      );
    }
  }
}

const styles = StyleSheet.create({
  row: {
    display: "flex",
    flexDirection: "row"
  },
  half: {
    width: wp("40%"),
    height: hp("15%"),
    padding: wp("2%"),
    margin: wp("1.3%"),
    borderRadius: wp("4%"),
    alignItems: "center",
    alignContent: "center"
  },
  small: {
    fontFamily: "Oxanium",
    fontSize: wp("6%"),
    color: "grey",
  },
  card: {
    width: wp("90%"),
    height: hp("16%"),
    marginLeft: wp("5%"),
    marginRight: wp("5%"),
    marginTop: wp("2%"),
    padding: wp("5%")
  },
  button: {
    alignItems: "center",
    width: wp("50%"),
    borderRadius: wp("10%"),
    backgroundColor: "#00a2ff",
    padding: wp("2%"),
    margin: wp("1.5%")
  },
  cover: {
    fontFamily: "Oxanium",
    color: "black",
    fontSize: wp("5%"),
    overflow: "scroll"
  },
  upRight: {
    textShadowColor: '#ffffff',
    textShadowRadius: 2,
    textAlign: "right",
    marginBottom: hp("2%"),
    fontFamily: "Oxanium",
    color: "white",
    fontSize: wp("6%")
  },
  downLeft: {
    fontFamily: "FredokaOne",
    color: "white",
    fontSize: wp("5%")
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

