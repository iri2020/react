import React, { Component } from "react";
import { render } from "react-dom";
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity } from "react-native";
import { NavigationContainer, StackActions } from '@react-navigation/native'
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
        width: '75%',
        borderStyle: 'solid',
        borderBottomWidth: 2,
        borderBottomColor: '#3949ab',
        marginVertical: 10,
        fontSize:16
    },
    text:{
        paddingVertical: 50,
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 24
    },
    navbarButton:{
        marginVertical: 50,
        width: '75%',
        alignSelf: 'center',
        color: 'red'
    },
    buttonStyle: {
        margin: 25,
        width: '75%',
        alignSelf: 'center',
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
        justifyContent: 'center',
    },
    textDayView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

const ScreenContainer = ({ children }) => (
    <View style={styles.container}>{children}</View>
  );
  export const SelectRole = ({ navigation}) =>{;
    return(
        <View style={styles.textDayView}>
            <View style={styles.buttonStyle}>
            <Button title='Преподаватель' color="#00AEEF" onPress={() => navigation.push('Авторизация')} />
            </View>
            <View style={styles.buttonStyle}>
            <Button title='Студент' color="#00AEEF" onPress={() => navigation.push('Выбор группы')}/>
            </View>
        </View>
    );
}
  export const SignIn = ({ navigation }) => {;
   
    class Auth extends Component{
        constructor(props){
            super(props);
            this.state={
                //Данные для входа
                userlastname:'', 
                userpassword:'',
                //Ошибки и прочее
                errorMessage: false,
                errorMessageText: '',
                //Данные о пользователе
                userName: '',
                userLastName: '',
                userSecondName: '',

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
                    this.setState({
                        userLastName: response.data[0][1],
                    })
                    navigation.dispatch(StackActions.push('Страница преподавателя', {lastname: this.state.userLastName}));
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
                    <TextInput value={this.state.userpassword} style={styles.input} placeholder='Пароль' 
                    onChangeText={userpassword=>this.setState({userpassword})}/>
                </View>
                <View  style={styles.navbarButton}>
                    <Button title='Авторизация' color="#00AEEF" 
                    onPress={this.Authorization}/>
                      <TouchableOpacity>
                        <Text style={styles.textForgotPassword} onPress={() => navigation.push('Восстановление пароля')}>Забыли пароль?</Text>
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
  
  export const TeacherPage = ({navigation, route}) => {
    return (
      <View style={styles.container}>
        <Grid style={styles.tableGrid}>
            <TouchableOpacity style={{width: '100%'}} onPress={() => navigation.dispatch(StackActions.push('Расписание->Преподаватель', {lastname: route.params.lastname, dayofweek: 'пн'}))}>
            <Row style={{backgroundColor: '#c4e2f2' ,  width: '70%' , paddingTop:'7%' , marginTop:'10%' ,marginLeft:'15%', height: 70, justifyContent: 'center'}}>
            <Text style={styles.tableGridText}>Понедельник</Text>
            </Row>
            </TouchableOpacity>
            <TouchableOpacity style={{width: '100%'}} onPress={() => navigation.dispatch(StackActions.push('Расписание->Преподаватель', {lastname: route.params.lastname, dayofweek: 'вт'}))}>
            <Row style={{backgroundColor: '#a6caf0' ,  width: '70%', paddingTop:'7%' , marginTop:10 ,marginLeft:'15%', height: 70, justifyContent: 'center'}}>
            <Text style={styles.tableGridText}>Вторник</Text>
            </Row>
            </TouchableOpacity>
            <TouchableOpacity style={{width: '100%'}} onPress={() => navigation.dispatch(StackActions.push('Расписание->Преподаватель', {lastname: route.params.lastname, dayofweek: 'ср'}))}>
            <Row style={{backgroundColor: '#c4e2f2' ,  width: '70%', paddingTop:'7%' , marginTop:10 ,marginLeft:'15%', height: 70, justifyContent: 'center'}}>
            <Text style={styles.tableGridText}>Среда</Text>
            </Row>
            </TouchableOpacity>
            <TouchableOpacity style={{width: '100%'}} onPress={() => navigation.dispatch(StackActions.push('Расписание->Преподаватель', {lastname: route.params.lastname, dayofweek: 'чт'}))}>
            <Row style={{backgroundColor: '#a6caf0' , width: '70%', paddingTop:'7%' , marginTop:10 ,marginLeft:'15%', height: 70, justifyContent: 'center'}}>
            <Text style={styles.tableGridText}>Четверг</Text>
            </Row>
            </TouchableOpacity>
            <TouchableOpacity style={{width: '100%'}} onPress={() => navigation.dispatch(StackActions.push('Расписание->Преподаватель', {lastname: route.params.lastname, dayofweek: 'пт'}))}>
            <Row style={{backgroundColor: '#c4e2f2' ,  width: '70%', paddingTop:'7%' , marginTop:10 ,marginLeft:'15%', height: 70, justifyContent: 'center'}}>
            <Text style={styles.tableGridText}>Пятница</Text>
            </Row>
            </TouchableOpacity>
            <TouchableOpacity style={{width: '100%'}} onPress={() => navigation.dispatch(StackActions.push('Расписание->Преподаватель', {lastname: route.params.lastname, dayofweek: 'сб'}))}>
            <Row style={{backgroundColor: '#a6caf0' ,  width: '70%', paddingTop:'7%' , marginTop:10 ,marginLeft:'15%', height: 70, justifyContent: 'center'}}>
            <Text style={styles.tableGridText}>Суббота</Text>
            </Row>
            </TouchableOpacity>
            <TouchableOpacity style={{width: '100%'}} onPress={() => alert("Выбран рассписание")}>
            <Row style={{backgroundColor: '#c4e2f2' ,  width: '70%', paddingTop:'7%' , marginTop:10 ,marginLeft:'15%', height: 70, justifyContent: 'center'}}>
            <Text style={styles.tableGridText}>Расписание на всю неделю</Text>
            </Row>
            </TouchableOpacity>
            <Row style={{backgroundColor: 'white' ,  width: '100%', paddingTop:30, marginTop:10 , height: 100, justifyContent: 'center'}}>
            </Row>
        </Grid>
      </View>
    );
  };
export const StudentPageSelectGroup = ({navigation, route}) =>{
    class Stud extends Component{
        constructor(props){
            super(props);
            this.state={
                group: ''

            };
        }
        render(){
            return (
                <View style={styles.textDayView}>
                    <View >
                        <Text style={{fontSize:18, textAlign:"center", margin:3}}>Введите название группы (без пробелов):</Text> 
                    </View>
                    <View >
                        <TextInput style={styles.input} placeholder='      Пример: ИС17     ' onChangeText={group=>this.setState({group})}></TextInput>
                        <Button title='Посмотреть расписание' onPress={() => navigation.dispatch(StackActions.push('Страница студента', {group: this.state.group}))}/> 
                    </View>
                </View>
            )
        }
    }
    return(
        <ScreenContainer>
            <Stud />
        </ScreenContainer>
    );
}
export const StudentPageCheckRasp = ({navigation, route}) =>{
return (
    <View style={styles.container}>
        <Grid style={styles.tableGrid}>
            <TouchableOpacity style={{width: '100%'}} onPress={() => navigation.dispatch(StackActions.push('Расписание->Студент', {group: route.params.group, dayofweek: 'пн'}))}>
            <Row style={{backgroundColor: '#c4e2f2' ,  width: '70%' , paddingTop:'7%' , marginTop:'10%' ,marginLeft:'15%', height: 70, justifyContent: 'center'}}>
            <Text style={styles.tableGridText}>Понедельник</Text>
            </Row>
            </TouchableOpacity>
            <TouchableOpacity style={{width: '100%'}} onPress={() => navigation.dispatch(StackActions.push('Расписание->Студент', {group: route.params.group, dayofweek: 'вт'}))}>
            <Row style={{backgroundColor: '#a6caf0' ,  width: '70%', paddingTop:'7%' , marginTop:10 ,marginLeft:'15%', height: 70, justifyContent: 'center'}}>
            <Text style={styles.tableGridText}>Вторник</Text>
            </Row>
            </TouchableOpacity>
            <TouchableOpacity style={{width: '100%'}} onPress={() => navigation.dispatch(StackActions.push('Расписание->Студент', {group: route.params.group, dayofweek: 'ср'}))}>
            <Row style={{backgroundColor: '#c4e2f2' ,  width: '70%', paddingTop:'7%' , paddingTop:25 , marginTop:10 ,marginLeft:'15%', height: 70, justifyContent: 'center'}}>
            <Text style={styles.tableGridText}>Среда</Text>
            </Row>
            </TouchableOpacity>
            <TouchableOpacity style={{width: '100%'}} onPress={() => navigation.dispatch(StackActions.push('Расписание->Студент', {group: route.params.group, dayofweek: 'чт'}))}>
            <Row style={{backgroundColor: '#a6caf0' , width: '70%', paddingTop:'7%' , marginTop:10 ,marginLeft:'15%', height: 70, justifyContent: 'center'}}>
            <Text style={styles.tableGridText}>Четверг</Text>
            </Row>
            </TouchableOpacity>
            <TouchableOpacity style={{width: '100%'}} onPress={() => navigation.dispatch(StackActions.push('Расписание->Студент', {group: route.params.group, dayofweek: 'пт'}))}>
            <Row style={{backgroundColor: '#c4e2f2' ,  width: '70%', paddingTop:'7%' , marginTop:10 ,marginLeft:'15%', height: 70, justifyContent: 'center'}}>
            <Text style={styles.tableGridText}>Пятница</Text>
            </Row>
            </TouchableOpacity>
            <TouchableOpacity style={{width: '100%'}} onPress={() => navigation.dispatch(StackActions.push('Расписание->Студент', {group: route.params.group, dayofweek: 'сб'}))}>
            <Row style={{backgroundColor: '#a6caf0' ,  width: '70%', paddingTop:'7%' , marginTop:10 ,marginLeft:'15%', height: 70, justifyContent: 'center'}}>
            <Text style={styles.tableGridText}>Суббота</Text>
            </Row>
            </TouchableOpacity>
            <TouchableOpacity style={{width: '100%'}} onPress={() => navigation.dispatch(StackActions.push('Расписание->Студент->общ', {group: route.params.group, dayofweek: ''}))}>
            <Row style={{backgroundColor: '#c4e2f2' ,  width: '70%', paddingTop:'7%' , marginTop:10 ,marginLeft:'15%', height: 70, justifyContent: 'center'}}>
            <Text style={styles.tableGridText}>Расписание на всю неделю</Text>
            </Row>
            </TouchableOpacity>
            <Row style={{backgroundColor: 'white' ,  width: '100%', paddingTop:30, marginTop:10 , height: 100, justifyContent: 'center'}}>
            </Row>
        </Grid>
    </View>
    );
}
export const TeacherPageMonday = (props) => {
    class Exensions extends Component{
        constructor(props){
            super(props);
            this.state = ({
                paraOne: '',
                paraTwo: '',
                paraThree: '',
                paraFour: '',
                dayofweek: '',
            })
        }
        componentDidMount(){
            console.log(this.state);
            this.Exens();
        }
        Exens = () =>{
            //'https://cors-anywhere.herokuapp.com/'
            axios.
            post(
                'https://raspisanie-nggtki.000webhostapp.com/rasp_teach.php',
                JSON.stringify({
                    userlastname: props.route.params.lastname,
                    dayweek: props.route.params.dayofweek,
                }),
            ).then((response) => {
                if(props.route.params.dayofweek == 'пн'){
                    this.setState({
                        dayofweek: 'Понедельник'
                    })
                }else if(props.route.params.dayofweek == 'вт'){
                    this.setState({
                        dayofweek: 'Вторник'
                    })
                }else if(props.route.params.dayofweek == 'ср'){
                    this.setState({
                        dayofweek: 'Среда'
                    })
                }else if(props.route.params.dayofweek == 'чт'){
                    this.setState({
                        dayofweek: 'Четверг'
                    })
                }else if(props.route.params.dayofweek == 'пт'){
                    this.setState({
                        dayofweek: 'Пятница'
                    })
                }else if(props.route.params.dayofweek == 'сб'){
                    this.setState({
                        dayofweek: 'Суббота'
                    })
                }
                if(response.data[0]){
                    this.setState({
                        paraOne: ' № '+response.data[0][0]+'. |'+' '+response.data[0][2].replace(/\r?\n/g, " | ") +'. |'+' '+ response.data[0][4]+'. |'+' '+ response.data[0][3]
                    })
                }
                if(response.data[1]){
                    this.setState({
                        paraTwo: ' № '+response.data[1][0]+'. |'+' '+response.data[1][2].replace(/\r?\n/g, " | ")+'. |'+' '+ response.data[1][4]+'. |'+' '+ response.data[1][3]
                    })
                }
                if(response.data[2]){
                    this.setState({
                        paraThree: ' № '+response.data[2][0]+'. |'+' '+response.data[2][2].replace(/\r?\n/g, " | ")+'. |'+' '+ response.data[2][4]+'. |'+' '+ response.data[2][3]
                    })
                }
                if(response.data[3]){
                    this.setState({
                        paraFour: ' № '+response.data[3][0]+'. |'+' '+response.data[3][2].replace(/\r?\n/g, " | ")+'. |'+' '+ response.data[2][4]+'. |'+' '+ response.data[2][3]
                    })
                }
            })
        }
        render(){
            return (
                <View style={styles.textDayView} >
                    <Text style={{textAlign: 'center', alignItems: 'flex-start', paddingBottom:5, fontSize: 24, marginBottom:15,borderBottomWidth :2,borderBottomColor: '#c4e2f2'}}>{this.state.dayofweek}</Text>
                    {this.state.paraOne !== '' && <Text style={{backgroundColor: '#c4e2f2' ,textAlign: 'center',width:'90%' ,padding:5, fontSize: 24, marginBottom:15,borderWidth :2,borderColor: '#a6caf0'}}>{this.state.paraOne}</Text>}
                    {this.state.paraTwo !== '' && <Text style={{backgroundColor: '#c4e2f2' ,textAlign: 'center',width:'90%' ,padding:5, fontSize: 24, marginBottom:15,borderWidth :2,borderColor: '#a6caf0'}}>{this.state.paraTwo}</Text>}
                    {this.state.paraThree !== '' && <Text style={{backgroundColor: '#c4e2f2' ,textAlign: 'center',width:'90%' ,padding:5, fontSize: 24, marginBottom:15,borderWidth :2,borderColor: '#a6caf0'}}>{this.state.paraThree}</Text> }
                 {this.state.paraFour !== '' && <Text style={{backgroundColor: '#c4e2f2' ,textAlign: 'center',width:'90%' ,padding:5, fontSize: 24, marginBottom:15,borderWidth :2,borderColor: '#a6caf0'}}>{this.state.paraFour}</Text> }
                </View>
            );
        }
    }
    return(
        <ScreenContainer>
            <Exensions />
       </ScreenContainer>
    )
};
export const StudentPageMonday = (props) => {
    console.log(props);
    class Exensions extends Component{
        constructor(props){
            super(props);
            this.state = ({
                paraOne: '',
                paraTwo: '',
                paraThree: '',
                paraFour: '',
                dayofweek: '',
            })
        }
        componentDidMount(){
            this.Exens();
        }
        Exens = () =>{
            //'https://cors-anywhere.herokuapp.com/'
            axios.
            post(
                'https://cors-anywhere.herokuapp.com/'+'https://raspisanie-nggtki.000webhostapp.com/rasp_stud.php',
                JSON.stringify({
                    group: props.route.params.group,
                    dayweek: props.route.params.dayofweek,
                }),
            ).then((response) => {
                if(props.route.params.dayofweek == 'пн'){
                    this.setState({
                        dayofweek: 'Понедельник'
                    })
                }else if(props.route.params.dayofweek == 'вт'){
                    this.setState({
                        dayofweek: 'Вторник'
                    })
                }else if(props.route.params.dayofweek == 'ср'){
                    this.setState({
                        dayofweek: 'Среда'
                    })
                }else if(props.route.params.dayofweek == 'чт'){
                    this.setState({
                        dayofweek: 'Четверг'
                    })
                }else if(props.route.params.dayofweek == 'пт'){
                    this.setState({
                        dayofweek: 'Пятница'
                    })
                }else if(props.route.params.dayofweek == 'сб'){
                    this.setState({
                        dayofweek: 'Суббота'
                    })
                }
                if(response.data[0]){
                    this.setState({
                        paraOne: ' № '+response.data[0][0]+'. |'+' '+response.data[0][2].replace(/\r?\n/g, " | ") +'. |'+' '+ response.data[0][3]
                    })
                }
                if(response.data[1]){
                    this.setState({
                        paraTwo: ' № '+response.data[1][0]+'. |'+' '+response.data[1][2].replace(/\r?\n/g, " | ")+'. |'+' '+ response.data[1][3]
                    })
                }
                if(response.data[2]){
                    this.setState({
                        paraThree: ' № '+response.data[2][0]+'. |'+' '+response.data[2][2].replace(/\r?\n/g, " | ")+'. |'+' '+ response.data[2][3]
                    })
                }
                if(response.data[3]){
                    this.setState({
                        paraFour: ' № '+response.data[3][0]+'. |'+' '+response.data[3][2].replace(/\r?\n/g, " | ")+'. |'+' '+ response.data[2][3]
                    })
                }
                console.log(response);

            })
        }
        render(){
            return (
                <View style={styles.textDayView} >
                    <Text style={{textAlign: 'center', alignItems: 'flex-start', paddingBottom:5, fontSize: 24, marginBottom:15,borderBottomWidth :2,borderBottomColor: '#c4e2f2'}}>{this.state.dayofweek}</Text>
                    {this.state.paraOne !== '' && <Text style={{backgroundColor: '#c4e2f2' ,textAlign: 'center',width:'90%' ,padding:5, fontSize: 24, marginBottom:15,borderWidth :2,borderColor: '#a6caf0'}}>{this.state.paraOne}</Text>}
                    {this.state.paraTwo !== '' && <Text style={{backgroundColor: '#c4e2f2' ,textAlign: 'center',width:'90%' ,padding:5, fontSize: 24, marginBottom:15,borderWidth :2,borderColor: '#a6caf0'}}>{this.state.paraTwo}</Text>}
                    {this.state.paraThree !== '' && <Text style={{backgroundColor: '#c4e2f2' ,textAlign: 'center',width:'90%' ,padding:5, fontSize: 24, marginBottom:15,borderWidth :2,borderColor: '#a6caf0'}}>{this.state.paraThree}</Text> }
                 {this.state.paraFour !== '' && <Text style={{backgroundColor: '#c4e2f2' ,textAlign: 'center',width:'90%' ,padding:5, fontSize: 24, marginBottom:15,borderWidth :2,borderColor: '#a6caf0'}}>{this.state.paraFour}</Text> }
                </View>
            );
        }
    }
    return(
        <ScreenContainer>
            <Exensions />
       </ScreenContainer>
    )
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
  export const AllRasp = (props) => {
    class Exensions extends Component{
        constructor(props){
            super(props);
            this.state = ({
                paraOne: '',
                paraTwo: '',
                paraThree: '',
                paraFour: '',
                dayofweek: '',
            })
        }
        componentDidMount(){
            console.log(this.state);
            this.Exens();
        }
        Exens = () =>{
            //'https://cors-anywhere.herokuapp.com/'
            axios.
            post(
                'https://cors-anywhere.herokuapp.com/'+'https://raspisanie-nggtki.000webhostapp.com/rasp_stud.php',
                JSON.stringify({
                     group: props.route.params.group,
                    dayweek: props.route.params.dayofweek,
                }),
            ).then((response) => {
                if(props.route.params.dayofweek == 'пн'){
                    this.setState({
                        dayofweek: 'Понедельник'
                    })
                }else if(props.route.params.dayofweek == 'вт'){
                    this.setState({
                        dayofweek: 'Вторник'
                    })
                }else if(props.route.params.dayofweek == 'ср'){
                    this.setState({
                        dayofweek: 'Среда'
                    })
                }else if(props.route.params.dayofweek == 'чт'){
                    this.setState({
                        dayofweek: 'Четверг'
                    })
                }else if(props.route.params.dayofweek == 'пт'){
                    this.setState({
                        dayofweek: 'Пятница'
                    })
                }else if(props.route.params.dayofweek == 'сб'){
                    this.setState({
                        dayofweek: 'Суббота'
                    })
                }
                console.log(response);
                for (let index = 0; index < response.data.length; index++) {
                    this.setState({
                        para+index: response.data[index]
                
                    })
                    
                }
                console.log(response);
            })
        }
        render(){
            return (
                <View style={styles.textDayView} >
                    <Text style={{textAlign: 'center', alignItems: 'flex-start', paddingBottom:5, fontSize: 24, marginBottom:15,borderBottomWidth :2,borderBottomColor: '#c4e2f2'}}>{this.state.dayofweek}</Text>
                    {this.state.paraOne !== '' && <Text style={{backgroundColor: '#c4e2f2' ,textAlign: 'center',width:'90%' ,padding:5, fontSize: 24, marginBottom:15,borderWidth :2,borderColor: '#a6caf0'}}>{this.state.paraOne}</Text>}
                    {this.state.paraTwo !== '' && <Text style={{backgroundColor: '#c4e2f2' ,textAlign: 'center',width:'90%' ,padding:5, fontSize: 24, marginBottom:15,borderWidth :2,borderColor: '#a6caf0'}}>{this.state.paraTwo}</Text>}
                    {this.state.paraThree !== '' && <Text style={{backgroundColor: '#c4e2f2' ,textAlign: 'center',width:'90%' ,padding:5, fontSize: 24, marginBottom:15,borderWidth :2,borderColor: '#a6caf0'}}>{this.state.paraThree}</Text> }
                 {this.state.paraFour !== '' && <Text style={{backgroundColor: '#c4e2f2' ,textAlign: 'center',width:'90%' ,padding:5, fontSize: 24, marginBottom:15,borderWidth :2,borderColor: '#a6caf0'}}>{this.state.paraFour}</Text> }
                </View>
            );
        }
    }
    return(
        <ScreenContainer>
            <Exensions />
       </ScreenContainer>
    )
};