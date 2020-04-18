import * as React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import CountIndicator from './CountIndicator';
import AnimateNumber from 'react-native-animate-number';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Fontisto';
export default class Statistics extends React.Component {
  state = {
    diff: {},
    sts: {},
    loading: true,
  };

  load = () => {
    this.setState({ loading: true, diff: {}, sts: {} })
    fetch('https://api.covid19india.org/state_district_wise.json')
      .then((resp) => resp.json())
      .then((resp) => {
        this.setState({ sts: resp })
        let data = {};
        for (let state of Object.keys(resp)) {
          let distData = resp[state].districtData;

          let deltaSum = 0;
          for (let dist of Object.keys(distData)) {
            deltaSum += distData[dist].delta.confirmed;
          }

          data[state] = deltaSum;

          this.setState({ diff: data, loading: false });
        }
      })
      .catch((error) => console.log(error));
  }

  componentDidMount() {
    this.load();
  }

  render() {
    const { name, data } = this.props;
    //console.log(this.state.diff);
    if (this.state.loading) {
      return (<ActivityIndicator style={{ flex: 1, justifyContent: "center", alignItems: "center" }} size="large" color="#696969" />)
    }
    else {
      return (
        <View style={styles.stats}>
          <View style={{ display: "flex", flexDirection: "row", paddingLeft: widthPercentageToDP("6%") }}>
            <View>
              <Text style={{ ...styles.statenm, fontSize: widthPercentageToDP("3%"), }}>Touch on your State to view details.</Text>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <View style={{ width: widthPercentageToDP("5%"), height: heightPercentageToDP("2.5%"), borderRadius: widthPercentageToDP("1%"), marginRight: widthPercentageToDP("1%"), backgroundColor: "#e86f9a" }}></View>
                <Text style={{ ...styles.statenm, fontSize: widthPercentageToDP("3%"), marginRight: widthPercentageToDP("1%"), }}>Selected State</Text>
              </View>
            </View>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity onPress={() => { this.load() }} style={styles.button}>
                <Text style={{ fontFamily: "FredokaOne", fontSize: widthPercentageToDP("3%"), color: "white" }}>
                  {/* Refresh {" "} */}
                  <Icon name={"cloud-refresh"} size={widthPercentageToDP("6%")} />
                </Text>
              </TouchableOpacity>
            </View>

          </View>
          <Text style={styles.statenm}>{name.toUpperCase()}</Text>
          <View style={styles.counts}>
            <CountIndicator
              count={data.confirmed}
              txtcolor="#fff"
              bgcolor="#573d88"
              type={'cnfrm'}
              delta={this.state.diff[name]}>

            </CountIndicator>
            <CountIndicator
              count={data.active}
              type={'activ'}
              bgcolor={'#7f7f7f'}
              txtcolor={'#fff'}></CountIndicator>
            <CountIndicator
              count={data.recovered}
              type={'cured'}
              bgcolor={'#30803d'}
              txtcolor={'#fff'}></CountIndicator>
            <CountIndicator
              count={data.deaths}
              type={'decsd'}
              bgcolor={'#ae3d42'}
              txtcolor={'#fff'}></CountIndicator>
          </View>
          <View style={{ width: widthPercentageToDP("90%"), paddingLeft: widthPercentageToDP("3%"), paddingTop: widthPercentageToDP("2%") }}>
            <View style={styles.TableHeader}>
              <Text style={styles.stateNameTH}>
                DISTRICT
            </Text>
              <Text style={styles.confirmedTH}>
                CUMULATIVE</Text>
              <Text style={styles.activeTH}>
                TODAY</Text>
            </View>
            {Object.keys(this.state.sts[name].districtData).map((item, key) => {
              return (
                <View style={key % 2 ? styles.item2 : styles.item1} key={key}>
                  <Text style={styles.stateName}>
                    {item}
                  </Text>
                  <Text style={styles.confirmed}>
                    <AnimateNumber
                      value={this.state.sts[name].districtData[item].confirmed}
                      countBy={20}
                      formatter={(val) => {
                        return " " + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                      }} />
                  </Text>
                  <Text style={styles.active}>
                    <AnimateNumber
                      value={this.state.sts[name].districtData[item]["delta"].confirmed}
                      countBy={20}
                      formatter={(val) => {
                        return " " + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                      }} />
                  </Text>
                </View>
              )
            })}
          </View>
        </View>
      );
    }

  }
}

const styles = StyleSheet.create({
  stats: {
    paddingLeft: widthPercentageToDP("3%"),
    marginTop: heightPercentageToDP("-10%")
  },
  statenm: {
    fontFamily: 'Poppins-Medium',
    fontSize: 23,
  },
  button: {
    alignItems: "center",
    width: widthPercentageToDP("18%"),
    borderRadius: widthPercentageToDP("10%"),
    backgroundColor: "#00a2ff",
    padding: widthPercentageToDP("3%"),
    marginLeft: widthPercentageToDP("5%")
  },
  counts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item1: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 1,
    paddingTop: 12,
    paddingBottom: 12,
    paddingStart: 12,
    backgroundColor: '#eee',
    fontSize: 24
  },
  item2: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 1,
    paddingTop: 12,
    paddingBottom: 12,
    paddingStart: 12,
    backgroundColor: '#fff',
    fontSize: 24,
    borderColor: "#eee",
    borderWidth: 2
  },
  stateName: {
    flex: 1,
    fontWeight: "600",
    fontFamily: "Pangolin",
    fontWeight: "bold",
    // textAlign: "center"
  },
  confirmed: {
    flex: 1,
    fontFamily: "Pangolin",
    color: '#E32636',
    fontWeight: "bold",
    textAlign: "justify"
  },
  active: {
    flex: 1,
    fontFamily: "Pangolin",
    color: '#1E90FF',
    fontWeight: "bold",
    textAlign: "justify"
  },
  activeTH: {
    flex: 1,
    fontSize: widthPercentageToDP("3.5%"),
    color: '#1E90FF',
    fontFamily: "FredokaOne",
  },
  stateNameTH: {
    flex: 1,
    fontSize: widthPercentageToDP("3.5%"),
    fontFamily: "FredokaOne",
  },
  confirmedTH: {
    flex: 1,
    fontFamily: "FredokaOne",
    fontSize: widthPercentageToDP("3.5%"),
    color: '#E32636',
    fontWeight: "bold"
  },
  TableHeader: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 12,
    paddingBottom: 12,
    paddingStart: 12,
    backgroundColor: '#fff',
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#eee"
  },
});
