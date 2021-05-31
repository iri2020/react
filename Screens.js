import React, { Component } from "react";
import { render } from "react-dom";
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity } from "react-native";
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

//teacherPage
import { Col, Row, Grid } from "react-native-easy-grid";

import axios from 'axios';

const AuthStack = createStackNavigator();

const styles = StyleSheet.create({
    //Auth
    navbarLogo:{
        flexDirection:'row',
        position: 'absolute',
        margin: 50,
        marginLeft:50
    },
    input:{
        alignSelf: 'center',
        textAlign: 'center',
        width: '65%',
        borderStyle: 'solid',
        borderBottomWidth: 2,
        borderBottomColor: '#3949ab',
        marginVertical: 10
    },
    text:{
        paddingVertical: 50,
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 24
    },
    navbarButton:{
        marginVertical: 50,
        width: '65%',
        alignSelf: 'center',
        color: 'red'
    },
    textForgotPassword:{
        marginVertical: 10,
        alignSelf: 'flex-end',
        fontSize: 12,
        color: 'gray'
    },
    ErrorView:{
        alignSelf: 'center',
    },
    ErrorMessage:{
        color: 'darkred'
    },
    tinyLogo: {
        width: 32,
        height: 32,        
      },
    container:{
        flex: 1,
        backgroundColor: '#fff',
    },
    tableGrid:{
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
    tableGridText:{
        textAlign: 'center',
        justifyContent: 'center'
    }
});

const ScreenContainer = ({ children }) => (
    <View style={styles.container}>{children}</View>
  );
  export const SignIn = ({ navigation }) => {;
   
    class Auth extends Component{
        constructor(props){
            super(props);
            this.state={
                userlastname:'', 
                userpassword:'',
                errorMessage: false,
                errorMessageText: ''
            };
        }
        Authorization = () =>{
            if(this.state.userlastname.length == 0 || this.state.userpassword.length == 0 ){
                this.setState({
                    errorMessage: true,
                    errorMessageText: 'Необходимо заполнить все поля!'
                })
                setTimeout(() => {
                    this.setState({
                        errorMessageText: '',
                        errorMessage: false
                    })
                }, 1600);
                return;
            }
            //'https://cors-anywhere.herokuapp.com/'
            axios.
            post(
                'https://raspisanie-nggtki.000webhostapp.com/auth.php',
                JSON.stringify({
                    userlastname: this.state.userlastname,
                    userpassword: this.state.userpassword,
                }),
            ).then((response) => {
                if(response.data == 'Данный пользователь не найден!'){
                    this.setState({
                        userlastname: '',
                        userpassword: '',
                        errorMessage: true,
                        errorMessageText: 'Пользователь не найден!'
                    })
                    setTimeout(() => {
                        this.setState({
                            errorMessageText: '',
                            errorMessage: false
                        })
                    }, 1600);
                }else{
                    navigation.push('TeacherPage');
                }
            })
        }
        render(){
            return(
                <View>
                <View  style={styles.navbar}>
                    <Text style={styles.text}>Вход в систему</Text>
                    <TextInput value={this.state.userlastname} style={styles.input} placeholder='Фамилия' 
                    onChangeText={userlastname=>this.setState({userlastname})}/>
                    <TextInput value={this.state.userpassword} style={styles.input} class="test" placeholder='Пароль' 
                    onChangeText={userpassword=>this.setState({userpassword})}/>
                </View>
                <View  style={styles.navbarButton}>
                    <Button title='Авторизация' color="#00AEEF" 
                    onPress={this.Authorization}/>
                      <TouchableOpacity>
                        <Text style={styles.textForgotPassword} onPress={() => navigation.push('ForgotPassword')}>Забыли пароль?</Text>
                      </TouchableOpacity>
                    <View style={styles.ErrorView}>
                       {(this.state.errorMessage) &&  <Text style={styles.ErrorMessage}>{this.state.errorMessageText}</Text> }
                    </View>
                </View>
                {this.state.forgot === true && <ForgotPassword/>}
            </View>
            );
        }
    }
    return (
        <ScreenContainer>

          <Auth />
        </ScreenContainer>
    );
  };
  
  export const TeacherPage = () => {
    return (
      <View style={styles.container}>
        <Grid style={styles.tableGrid}>
            <TouchableOpacity style={{width: '100%'}} onPress={() => alert("Выбран понедельник")}>
            <Row style={{backgroundColor: '#c4e2f2' ,  width: '70%' , paddingTop:25 , marginTop:10 ,marginLeft:'15%', height: 70, justifyContent: 'center'}}>
            <Text style={styles.tableGridText}>Понедельник</Text>
            </Row>
            </TouchableOpacity>
            <TouchableOpacity style={{width: '100%'}} onPress={() => alert("Выбран вторник")}>
            <Row style={{backgroundColor: '#a6caf0' ,  width: '70%', paddingTop:25 , marginTop:10 ,marginLeft:'15%', height: 70, justifyContent: 'center'}}>
            <Text style={styles.tableGridText}>Вторник</Text>
            </Row>
            </TouchableOpacity>
            <TouchableOpacity style={{width: '100%'}} onPress={() => alert("Выбран среда")}>
            <Row style={{backgroundColor: '#c4e2f2' ,  width: '70%', paddingTop:25 , paddingTop:25 , marginTop:10 ,marginLeft:'15%', height: 70, justifyContent: 'center'}}>
            <Text style={styles.tableGridText}>Среда</Text>
            </Row>
            </TouchableOpacity>
            <TouchableOpacity style={{width: '100%'}} onPress={() => alert("Выбран четверг")}>
            <Row style={{backgroundColor: '#a6caf0' , width: '70%', paddingTop:25 , marginTop:10 ,marginLeft:'15%', height: 70, justifyContent: 'center'}}>
            <Text style={styles.tableGridText}>Четверг</Text>
            </Row>
            </TouchableOpacity>
            <TouchableOpacity style={{width: '100%'}} onPress={() => alert("Выбран пятница")}>
            <Row style={{backgroundColor: '#c4e2f2' ,  width: '70%', paddingTop:25 , marginTop:10 ,marginLeft:'15%', height: 70, justifyContent: 'center'}}>
            <Text style={styles.tableGridText}>Пятница</Text>
            </Row>
            </TouchableOpacity>
            <TouchableOpacity style={{width: '100%'}} onPress={() => alert("Выбран суббота")}>
            <Row style={{backgroundColor: '#a6caf0' ,  width: '70%', paddingTop:25 , marginTop:10 ,marginLeft:'15%', height: 70, justifyContent: 'center'}}>
            <Text style={styles.tableGridText}>Суббота</Text>
            </Row>
            </TouchableOpacity>
            <TouchableOpacity style={{width: '100%'}} onPress={() => alert("Выбран рассписание")}>
            <Row style={{backgroundColor: '#c4e2f2' ,  width: '70%', paddingTop:25 , marginTop:10 ,marginLeft:'15%', height: 70, justifyContent: 'center'}}>
            <Text style={styles.tableGridText}>Расписание на всю неделю</Text>
            </Row>
            </TouchableOpacity>
            <Row style={{backgroundColor: 'white' ,  width: '100%', paddingTop:30, marginTop:10 , height: 100, justifyContent: 'center'}}>
            <Text style={styles.tableGridText}>Тут какие-нибудь фильтры</Text>
            </Row>
        </Grid>
      </View>
    );
  };
  export const ForgotPassword = () => {
    return (
      <ScreenContainer>
          
      </ScreenContainer>
    );
  };

  export const Splash = () => {
    return (
      <ScreenContainer style={styles.navbar}>
          <Text style={styles.text}>Загрузка...</Text>
      </ScreenContainer>
    );
  };