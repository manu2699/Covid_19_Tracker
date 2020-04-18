import * as React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AnimateNumber from 'react-native-animate-number';

const CountIndicator = ({ count, txtcolor, bgcolor, type, delta }) => {
  const newStyle = { ...styles.count, color: txtcolor, backgroundColor: bgcolor };
  return (
    <>
      <View style={newStyle}>
        <Text style={{ ...styles.txt, fontSize: wp("3.3%") }}>
          {type.toUpperCase()}
        </Text>
        <Text style={{ ...styles.txt, fontSize: wp("4%") }}>
          <AnimateNumber
            value={count}
            countBy={100}
            timing="linear"
            formatter={(val) => {
              return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }} />
        </Text>
        {type === 'cnfrm' && (
          <Text style={{ ...styles.txt, fontSize: wp("3.5%") }}>
            <AnimateNumber
              value={delta}
              countBy={20}
              formatter={(val) => {
                return "+ " + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              }} />
          </Text>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  count: {
    width: wp("20%"),
    height: hp("10%"),
    padding: wp("2%"),
    margin: wp("1.3%"),
    borderRadius: wp("4%"),
  },
  txt: {
    fontFamily: 'Poppins-Medium',
    fontWeight: "bold",
    color: "#fff",
    textAlign: "justify"
  }
});

export default CountIndicator;
