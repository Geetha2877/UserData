import React,{Component}from 'react';
import {
    View,
    Text,
    TextInput,
    Modal,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView} from 'react-native';

import db from '../config';
import firebase from 'firebase';
import {SafeAreaProvider} from 'react-native-safe-area-context'


export default class Signup extends React.Component{
 constructor(){
    super();
    this.state={
      emailId:'',
      password:'',
      firstName:'',
      lastName:'',
      address:'',
      contact:'',
      confirmPassword:'',
      
    }
  }

    
    userSignUp = (emailId, password,confirmPassword) =>{
        if(password !== confirmPassword){
            return Alert.alert("password doesn't match\nCheck your password.")
        }else{
          firebase.auth().createUserWithEmailAndPassword(emailId, password)
          .then(()=>{
            db.collection('users').add({
              first_name:this.state.firstName,
              last_name:this.state.lastName,
              contact:this.state.contact,
              email_id:this.state.emailId,
              address:this.state.address,
              password:this.state.password
            })
            return  Alert.alert(
                 'User Added Successfully',
                 '',
                 [
                   {text: 'OK', onPress: () => this.props.navigation.navigate("LoginScreen")},
                 ]
             );
          })
          .catch((error)=> {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            return Alert.alert(errorMessage)
          });
        }
      }

    render(){
    return(
        <View style={styles.modalContainer}>
      <ScrollView style={{width:'100%'}}>
        <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
        <Text
          style={styles.modalTitle}
          >REGISTRATION</Text>
        <TextInput
          style={styles.formTextInput}
          placeholder ={"First Name"}
          maxLength ={8}
          onChangeText={(text)=>{
            this.setState({
              firstName: text
            })
          }}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Last Name"}
          maxLength ={8}
          onChangeText={(text)=>{
            this.setState({
              lastName: text
            })
          }}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Contact"}
          maxLength ={10}
          keyboardType={'numeric'}
          onChangeText={(text)=>{
            this.setState({
              contact: text
            })
          }}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Email"}
          keyboardType ={'email-address'}
          onChangeText={(text)=>{
            this.setState({
              emailId: text
            })
          }}
        /><TextInput
          style={styles.formTextInput}
          placeholder ={"Password"}
          secureTextEntry = {true}
          onChangeText={(text)=>{
            this.setState({
              password: text
            })
          }}
        /><TextInput
          style={styles.formTextInput}
          placeholder ={"Confirm Password"}
          secureTextEntry = {true}
          onChangeText={(text)=>{
            this.setState({
              confirmPassword: text
            })
          }}
        />
        <View style={styles.modalBackButton}>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={()=>
              this.userSignUp(this.state.emailId, this.state.password, this.state.confirmPassword)
            }
          >
          <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>
        </View>
        
        </KeyboardAvoidingView>
      </ScrollView>
    </View>

)   
    }
    
   }
    const styles = StyleSheet.create({
        container:{
         flex:1,
         backgroundColor:"#f5ce42",
         alignItems: 'center',
         justifyContent: 'center'
       },
      
       title :{
         fontSize:65,
         fontWeight:'300',
         paddingBottom:30,
         color :"#00d0ff"
       },
       loginBox:{
         width: 300,
         height: 40,
         borderBottomWidth: 1.5,
         backgroundColor:"white",
         borderColor : 'black',
         borderRadius:15,
         fontSize: 20,
         margin:10,
         paddingLeft:10
       },
       KeyboardAvoidingView:{
         flex:1,
         justifyContent:'center',
         alignItems:'center'
       },
       modalTitle :{
         justifyContent:'center',
         alignSelf:'center',
         fontSize:30,
         color:'white',
         margin:50,
         fontWeight:"bold",
       },
       modalContainer:{
         flex:1.0,
  
         borderRadius:20,
         justifyContent:'center',
         alignItems:'center',
         backgroundColor:"#00d0ff",
         marginRight:30,
         marginLeft : 30,
         marginTop:80,
         marginBottom:70,
       },
       formTextInput:{
         width:"50%",
         height:35,
         alignSelf:'center',
         borderColor:'black',
         borderRadius:10,
         borderWidth:1,
         marginTop:20,
         padding:10,
         backgroundColor:"white",
         fontWeight:"bold",
         //placeholderTextColor:"black"
       },
       registerButton:{
         width:200,
         height:40,
         alignItems:'center',
         justifyContent:'center',
         borderWidth:1,
         borderRadius:10,
         marginTop:20,
         backgroundColor:"yellow"
       },
       registerButtonText:{
         color:'black',
         fontSize:15,
         fontWeight:'bold'
       },
       cancelButton:{
        width:200,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        borderWidth:1,
        borderRadius:10,
        marginTop:10,
        backgroundColor:"orange"
       },
      
       button:{
         width:300,
         height:50,
         justifyContent:'center',
         alignItems:'center',
         borderRadius:25,
         backgroundColor:"#00d0ff",
         shadowColor: "#000",
         shadowOffset: {
            width: 0,
            height: 8,
         },
         shadowOpacity: 0.30,
         shadowRadius: 10.32,
         elevation: 16,
         padding: 10
      
       },
       buttonText:{
         color:"white",
         fontWeight:'200',
         fontSize:20,
         fontWeight:"bold"
       }
      })