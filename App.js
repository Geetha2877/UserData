import React from 'react';
import { createAppContainer, createSwitchNavigator,} from 'react-navigation';
import LoginScreen from "./screens/Login";
import ResetPassword from "./screens/reset"
import SignupScreen from "./screens/signup"
import { AppDrawerNavigator } from './Navigation/DrawerNavigator'

export default function App() {
  return (
    <AppContainer/>
  );
}

const switchNavigator = createSwitchNavigator({
  LoginScreen:{screen: LoginScreen},
  SignupScreen:{screen: SignupScreen},
  ResetPassword: {screen: ResetPassword},
  Drawer:{screen: AppDrawerNavigator}
})

const AppContainer =  createAppContainer(switchNavigator);