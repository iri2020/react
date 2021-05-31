import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { SignIn, Splash, TeacherPage, ForgotPassword, TeacherPageMonday} from './Screens'

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
      <AuthStack.Navigator>asd
        <AuthStack.Screen name='Авторизация' component={SignIn}></AuthStack.Screen>
         <AuthStack.Screen name='Страница преподавателя' component={TeacherPage}></AuthStack.Screen>
         <AuthStack.Screen name='Восстановление пароля' component={ForgotPassword}></AuthStack.Screen>
         <AuthStack.Screen name='Расписание' component={TeacherPageMonday}></AuthStack.Screen>
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
