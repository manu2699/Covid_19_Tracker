import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { LineChart, BarChart } from "react-native-chart-kit";
import axios from "axios";
import { Line } from "react-native-svg";

const confirmedConfig = {
  backgroundGradientFrom: "#573d88",
  backgroundGradientFromOpacity: 1,
  backgroundGradientTo: "#5623b8",
  backgroundGradientToOpacity: 0.75,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  strokeWidth: 3,
};

const curedConfig = {
  backgroundGradientFrom: "#30803d",
  backgroundGradientFromOpacity: 1,
  backgroundGradientTo: "#044d10",
  backgroundGradientToOpacity: 0.75,
  barPercentage: 0.25,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
};

const deathConfig = {
  backgroundGradientFrom: "#ae3d42",
  backgroundGradientFromOpacity: 1,
  backgroundGradientTo: "#cf1921",
  backgroundGradientToOpacity: 0.75,
  barPercentage: 0.25,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
};
export default class Analysis extends Component {

  constructor(props) {
    super(props);
    this.state = {
      lat: "",
      long: "",
      labels: [],
      confirmed: [],
      cured: [],
      death: [],
      stacked: [],
      loading: true,
      res: "",
      actv: 0,
      cnfrm: 0,
      dec: 0
    }
  }


  load = () => {
    axios.get("https://api.covid19india.org/data.json").then(res => {
      let arr = res.data.cases_time_series, ind;
      for (ind = 31; ind < arr.length; ind += 5) {
        this.setState({
          labels: [...this.state.labels, arr[ind].date],
          confirmed: [...this.state.confirmed, arr[ind].totalconfirmed],
          cured: [...this.state.cured, arr[ind].totalrecovered],
          death: [...this.state.death, arr[ind].totaldeceased],
          stacked: [...this.state.stacked, [parseInt(arr[ind].totalconfirmed), parseInt(arr[ind].totalrecovered), parseInt(arr[ind].totaldeceased)]]
        })
      }
      this.setState({
        actv: parseInt(res.data.statewise[0].active),
        cnfrm: parseInt(res.data.statewise[0].confirmed),
        dec: parseInt(res.data.statewise[0].deaths),
        loading: false,
      })
      console.log(this.state.confirmed, this.state.cured, this.state.death, this.state.labels, this.state.actv, this.state.cnfrm, this.state.dec, this.state.stacked)
    })
  }

  componentDidMount = () => {
    this.load();
  }

  render() {
    if (this.state.loading) {
      return (<ActivityIndicator style={{ flex: 1, justifyContent: "center", alignItems: "center" }} size="large" color="#696969" />)
    }
    else {
      return (
        <ScrollView stickyHeaderIndices={[0]} style={{ backgroundColor: "white" }
        }>
          <View>
            <View style={{ padding: wp("2%"), display: "flex", flexDirection: "row", backgroundColor: "white", elevation: 10 }}>
              <View style={styles.heading}>
                <Text style={styles.small}> &#x1F1EE;&#x1F1F3; SPREAD </Text>
                <Text style={{ fontFamily: "FredokaOne", fontSize: wp("6%"), marginLeft: wp("1%") }}>ANALYSIS</Text>
              </View>
            </View>
          </View>
          <Text style={{ ...styles.small, color: "#30803d", marginTop: hp("2%"), alignSelf: "center" }}>CURED </Text>
          <LineChart
            style={{ padding: wp("5%"), borderRadius: wp("5%") }}
            data={{
              labels: [...this.state.labels],
              datasets: [
                {
                  data: [...this.state.cured],
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  strokeWidth: 3
                }
              ]
            }}
            width={wp("90%")}
            height={hp("40%")}
            fromZero={true}
            showBarTops={true}
            chartConfig={curedConfig}
            // onDataPointClick={({ value, dataset, getColor }) => {
            //   console.log(value, dataset, getColor)
            //   this.Toast(true, value)
            // }}
            verticalLabelRotation={265}
            xLabelsOffset={35}
          />
          {/* < /> */}
          <Text style={{ ...styles.small, color: "#573d88", alignSelf: "center" }}> CONFIRMED </Text>
          <LineChart
            style={{ padding: wp("5%"), borderRadius: wp("5%") }}
            data={{
              labels: [...this.state.labels],
              datasets: [
                {
                  data: [...this.state.confirmed],
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  strokeWidth: 3
                }
              ]
            }}
            width={wp("90%")}
            height={hp("40%")}
            chartConfig={confirmedConfig}
            verticalLabelRotation={265}
            xLabelsOffset={35}
          />
          <Text style={{ ...styles.small, color: "#ae3d42", alignSelf: "center" }}> DECEASED </Text>
          <LineChart
            style={{ padding: wp("5%"), borderRadius: wp("5%") }}
            data={{
              labels: [...this.state.labels],
              datasets: [
                {
                  data: [...this.state.death],
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  strokeWidth: 3
                }
              ]
            }}
            width={wp("90%")}
            height={hp("40%")}
            chartConfig={deathConfig}
            verticalLabelRotation={265}
            xLabelsOffset={35}
          />

        </ScrollView >
      );
    }
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

