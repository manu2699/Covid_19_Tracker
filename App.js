import React, { Component } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import home from "./Screens/Home";
import distance from "./Screens/Distance";
import stateDist from "./Screens/Map";
import precautions from "./Screens/Precautions";
import analysis from "./Screens/Analysis";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";


const Tab = createBottomTabNavigator();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logo: true,
      flag: false
    };

  }

  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Home') {
                iconName = "home";
              } else if (route.name === 'StateWise') {
                iconName = "news";
              } else if (route.name === 'Distance') {
                iconName = "location"
              } else if (route.name === "Precautions") {
                iconName = "thumbs-up"
              } else if (route.name === "Analysis") {
                iconName = "line-graph"
              }

              return (<Icon name={iconName} size={23} color={color} />);
            },
            tabBarLabel: ({ focused }) => {
              return focused ? (<Text style={{ fontWeight: "500", fontFamily: "Oxanium", color: "#fff", fontSize: wp("3%"), marginBottom: hp("1%") }}>{route.name}</Text>) : null;
            },

          })}
          tabBarOptions={{
            activeTintColor: '#fff',
            showLabel: true,
            labelPosition: "below-icon",
            keyboardHidesTabBar: false,
            style: {
              backgroundColor: "#1c1c1c",
              borderTopLeftRadius: wp("7%"),
              borderTopRightRadius: wp("7%"),
              overflow: "hidden",
              height: hp("7%"),
              padding: hp("1%"),
              elevation: 10
            }
          }}
        >
          <Tab.Screen name="Home" component={home} />
          <Tab.Screen name="StateWise" component={stateDist} />
          <Tab.Screen name="Distance" component={distance} />
          <Tab.Screen name="Analysis" component={analysis} />
          <Tab.Screen name="Precautions" component={precautions} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}
