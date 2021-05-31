import React, {Component, useState, useEffect} from 'react'
import {StyleSheet, View, Text, Button, TextInput, Modal} from 'react-native'

import axios from 'axios';

export default class Auth extends Component
{
    constructor(props){
        super(props);
        this.formRef = React.createRef();
        this.state={
            userlastname:'', 
            userpassword:'',
            errorMessage: false,
            errorMessageText: '',
            forgot: false
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
        axios.
        post(
            'https://cors-anywhere.herokuapp.com/'+'https://raspisanie-nggtki.000webhostapp.com/auth.php',
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
            }
        })
    }

    render()
    {
        return(
            <View>
            <View  style={styles.navbar}>
                <View style={styles.navbarLogo}>
                </View>
                <Text style={styles.text}>Вход в систему</Text>
                <TextInput value={this.state.userlastname} style={styles.input} placeholder='Фамилия' 
                onChangeText={userlastname=>this.setState({userlastname})}/>
                <TextInput value={this.state.userpassword} style={styles.input} class="test" placeholder='Пароль' 
                onChangeText={userpassword=>this.setState({userpassword})}/>
            </View>
            <View  style={styles.navbarButton}>
                <Button title='Авторизация' color="#00AEEF" 
                onPress={this.Authorization}/>
                <Text style={styles.textForgotPassword} >Забыли пароль?</Text>
                <View style={styles.ErrorView}>
                   {(this.state.errorMessage) &&  <Text style={styles.ErrorMessage}>{this.state.errorMessageText}</Text> }
                </View>
            </View>
            {this.state.forgot === true && <ForgotPassword/>}
        </View>
        )
    }
}

class ForgotPassword extends React.Component{
    render(){
        return(
            <View>
                  <TextInput style={styles.input} placeholder='Фамилия'></TextInput>
            </View>
        )
    }
}
const styles = StyleSheet.create({
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
      }
});