import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { SignIn, Splash, TeacherPage, ForgotPassword} from './Screens'

import Auth from './Auth'

const AuthStack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default () => {
  const [isLoading, setIsLoading] = React.useState(true);

  const [userToken, setUserToken] = React.useState(null);


  React.useEffect(() =>{
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, [])
  if(isLoading){
    return <Splash />
  }
  return (
      <NavigationContainer>
      <AuthStack.Navigator>
        <AuthStack.Screen name='SignIn' component={SignIn}></AuthStack.Screen>
         <AuthStack.Screen name='TeacherPage' component={TeacherPage}></AuthStack.Screen>
         <AuthStack.Screen name='ForgotPassword' component={ForgotPassword}></AuthStack.Screen>
       </AuthStack.Navigator>
    </NavigationContainer>
  )
}
/*       <AuthStack.Screen name='SignIn' component={SignIn}></AuthStack.Screen> */
const styles = StyleSheet.create({
  navbar:{
    height: 70,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#0494DD',
    paddingBottom: 10
},
text:{
    color: 'white',
    fontSize: 20
}
});
