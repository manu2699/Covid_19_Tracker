import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import GetLocation from 'react-native-get-location';
import axios from "axios";
import LottieView from 'lottie-react-native';

export default class Distance extends Component {

  constructor(props) {
    super(props);
    this.state = {
      url: "https://script.google.com/macros/s/AKfycbwqcrVhD9D6Oi2aIi9EG16ks3hLjbJqag_jznwxqpY88xdoBQun/exec?",
      lat: "",
      long: "",
      loading: false,
      res: "",
    }
  }

  enable = () => {
    this.setState({ loading: true })
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({ interval: 10000, fastInterval: 5000 })
      .then(data => {
        console.log(data)
        GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 15000,
        })
          .then(location => {
            // console.log(location, location["longitude"], location["latitude"]);
            // this.setState({ lat: location["latitude"], long: location["longitude"] });
            this.setState({ lat: ((location["latitude"] / 2) * 3.5) + 2.675, long: ((location["longitude"] / 2) * 3.5) + 2.675 });
            if (this.state.lat != "" && this.state.long != "") {
              console.log(`${this.state.url}lat=${location["latitude"]}&long=${location["longitude"]}`)
              axios.get(`${this.state.url}lat=${this.state.lat}&long=${this.state.long}`).then(res => {
                console.log(res.data)
                this.setState({ res: res.data + 1.5, loading: false })
              })
            }
          })
          .catch(error => {
            const { code, message } = error;
            console.warn(code, message);
            this.setState({ loading: false })
          })
      }).catch(err => {
        console.log(err)
        this.setState({ loading: false })
      });
  }

  render() {
    return (
      <ScrollView stickyHeaderIndices={[0]} style={{ backgroundColor: "white" }
      }>
        <View>
          <View style={{ padding: wp("2%"), display: "flex", flexDirection: "row", backgroundColor: "white", elevation: 10 }}>
            <View style={styles.heading}>
              <Text style={styles.small}>Near-by</Text>
              <Text style={{ fontFamily: "FredokaOne", fontSize: wp("6%"), marginLeft: wp("1%") }}>Infection</Text>
            </View>
          </View>
        </View>
        {/* <View>
          <View style={{ padding: wp("4%"), display: "flex", flexDirection: "row", backgroundColor: "white" }}>
            <Text style={styles.small}>Near-by Infection</Text>
          </View>
        </View> */}
        {(this.state.res != "") ? (
          // <ImageBackground source={require("../assets/Img/card.png")} style = { styles.card } >
          <View style={{ alignItems: "center", padding: wp("4%") }}>
            <LottieView source={require('../assets/Img/map-animation.json')} autoPlay loop
              style={{
                marginTop: hp("-2%"),
                width: wp("50%"),
              }} />
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Text style={{ fontFamily: "Oxanium", fontSize: wp("5%"), color: "red" }}>You are</Text>
              <Text style={{ fontFamily: "FredokaOne", fontSize: wp("5%"), color: "red" }}> {(this.state.res).toFixed(2)} km</Text>
            </View>
            <Text style={{ fontFamily: "Oxanium", fontSize: wp("5%"), color: "red" }}>Away from a infected victim</Text>
          </View>
          // </ImageBackground>
        ) : (
            <View>
              {(this.state.loading) ?
                (<ActivityIndicator style={{ flex: 1, justifyContent: "center", alignItems: "center" }} size="large" color="#696969" />)
                :
                (
                  // <ImageBackground source={require("../assets/Img/card.png")} style = { styles.card } >
                  <View style={{ alignItems: "center" }}>
                    {/* <Icon name="location" size={50} style={{ paddingBottom: wp("5%"), color: "#ff2f00" }} /> */}
                    <LottieView source={require('../assets/Img/map-marker-drop.json')} autoPlay loop
                      style={{
                        width: wp("60%"),
                      }} />
                    <TouchableOpacity onPress={() => { this.enable() }} style={styles.button}>
                      <Text style={{ fontFamily: "FredokaOne", fontSize: wp("4%"), color: "white" }}>Enable your location.</Text>
                    </TouchableOpacity>
                  </View>
                  // </ImageBackground>
                )}
            </View>
          )
        }
        <View style={{ alignItems: "center", padding: wp("3%") }}>
          <Text style={{ fontFamily: "Oxanium", fontSize: wp("4.5%"), color: '#1E90FF', fontWeight: "bold", textAlign: "justify" }}>The resultant distance is an esimated value, {'\n'}Infected victim may or may not be present within the specified kms.{'\n'}So we recommend you to...</Text>
          <LottieView source={require('../assets/Img/animation.json')} autoPlay loop style={{
            width: wp("100%"),
            height: wp("60%")
          }} />
        </View>

      </ScrollView >
    );
  }
}

const styles = StyleSheet.create({
  small: {
    fontFamily: "Oxanium",
    fontSize: wp("6%"),
    color: "grey",
  },
  card: {
    width: wp("95%"),
    height: hp("25%"),
    margin: wp("3%"),
    padding: wp("5%"),
    overflow: "hidden"
  },

  button: {
    alignItems: "center",
    width: wp("80%"),
    backgroundColor: "#00a2ff",
    padding: wp("2%"),
    margin: wp("2%"),
    borderRadius: wp("10%")
  },
  heading: {
    padding: wp("2%"),
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    borderBottomColor: "#000",
    backgroundColor: "white",
  },
  downLeft: {
    textAlign: "justify",
    fontFamily: "Oxanium",
    color: "black",
    fontSize: wp("5%"),
    overflow: "hidden"
  }
});

