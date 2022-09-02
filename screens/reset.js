import React from "react";
import {
  View,
  Text,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert,
 } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import db from '../config';
import firebase from 'firebase';

export default class Reset extends React.Component{

    constructor(){
        super();
        this.state={
          emailId:'',
          password:'',
          confirmPassword:'',
        }
      }

      resetPassword=()=>{
        if(this.state.password !== this.state.confirmPassword){
          return Alert.alert("password doesn't match\nCheck your password.")
      }else{
        db.collection('users').where('email_id',"==",this.state.emailId).get()
        .then((snapShot)=>{
          snapShot.forEach((doc)=>{
            db.collection('users').doc(doc.id).update({
              "password":this.state.password
            })
          })
        })
          return  Alert.alert(
            'Password updated Successfully',
            '',
            [
              {text: 'OK', onPress: () => this.props.navigation.navigate("LoginScreen")},
            ]
        );
      }
    
    }


      
    render(){
    return(
      <View style={styles.modalContainer}>
      <ScrollView style={{width:'100%'}}>
        <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
        <Text
          style={styles.modalTitle}
          >RESET PASSWORD</Text>
          <TextInput
          style={styles.formTextInput}
          placeholder ={"Email"}
          keyboardType ={'email-address'}
          onChangeText={(text)=>{
            this.setState({
              emailId: text
            })
          }}
        />
        <TextInput
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
             this.resetPassword(this.state.emailId,this.state.password,this.state.confirmPassword)
            }
          >
          <Text style={styles.registerButtonText}>SAVE PASSWORD</Text>
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
           backgroundColor:'#ff8400',
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
           backgroundColor:"yellow",
           borderColor : '#ff8a65',
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
           color:'brown',
           margin:50,
           fontWeight:"bold",
         },
         modalContainer:{
           flex:1.0,
           width:"80%",
           borderRadius:20,
           justifyContent:'center',
           alignItems:'center',
           backgroundColor:"#00d0ff",
           marginRight:30,
           marginLeft : 120,
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
           backgroundColor:"yellow",
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
           backgroundColor:"orange"
         },
         registerButtonText:{
           color:'brown',
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
           color:"red",
           fontWeight:'200',
           fontSize:20,
           fontWeight:"bold"
         }
        })