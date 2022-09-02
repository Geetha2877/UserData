import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeScreen from '../screens/home1';
import DisplayScreen from '../screens/display';



export const AppTabNavigator = createBottomTabNavigator({
  Create : {
    screen: HomeScreen,
    navigationOptions :{
      tabBarIcon : <Image source={require("../assets/splash.png")} style={{width:20, height:20}}/>,
      tabBarLabel : "Home",
    }
  },
  Display: {
    screen: DisplayScreen,
    navigationOptions :{
      tabBarIcon : <Image source={require("../assets/splash.png")} style={{width:20, height:20}}/>,
      tabBarLabel : "Display",
    }
  }
});