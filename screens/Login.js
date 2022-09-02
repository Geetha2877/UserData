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

//import SantaAnimation from '../components/SantaClaus.js';
import db from '../config';
import firebase from 'firebase';
import {SafeAreaProvider} from 'react-native-safe-area-context'



export default class LoginScreen extends Component{
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

 

userLogin = (emailId, password)=>{
   firebase.auth().signInWithEmailAndPassword(emailId, password)
   .then(()=>{
     this.props.navigation.navigate('Create')
   })
   .catch((error)=> {
     var errorCode = error.code;
     var errorMessage = error.message;
     return Alert.alert(errorMessage)
   })
 }

 modifyData=()=>{
  db.collection('users').where('email_id',"==",this.state.emailId).get()
      .then((snapShot)=>{
        snapShot.forEach((doc)=>{
          db.collection('users').doc(doc.id).update({
              "first_name":firstName,
              "last_name":lastName,
              "age":age,
              "hobbies":hobbies,
              "topic":topic,
              "image":image
          })
        })
      })
  }
    
  render(){
    return(
      <SafeAreaProvider>
      <View style={styles.container}>
        
        
        <View style={{justifyContent:'center', alignItems:'center'}}>
         
          <Text style={styles.title}>USER APP</Text>
        </View>
        <View>
            <TextInput
            style={styles.loginBox}
            placeholder="abc@example.com"
            keyboardType ='email-address'
            onChangeText={(text)=>{
              this.setState({
                emailId: text
              })
            }}
          />
          <TextInput
          style={styles.loginBox}
          secureTextEntry = {true}
          placeholder="enter Password"
          onChangeText={(text)=>{
            this.setState({
              password: text
            })
          }}
        />
        <TouchableOpacity
           style={[styles.button,{marginBottom:20, marginTop:20}]}
           onPress = {()=>{
            this.userLogin(this.state.emailId, this.state.password)
            
           }}
           >
           <Text style={styles.buttonText}>Login</Text>
         </TouchableOpacity>

         <TouchableOpacity
           style={styles.button}
           onPress={()=>this.props.navigation.navigate("SignupScreen")}
           >
           <Text style={styles.buttonText}>SignUp</Text>
         </TouchableOpacity>

         <TouchableOpacity
           style={[styles.button,{marginTop:20}]}
           onPress={()=>this.props.navigation.navigate('ResetPassword')}
           >
           <Text style={styles.buttonText}>Reset Password</Text>
         </TouchableOpacity>
      </View>
    </View>
    </SafeAreaProvider>
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
   width:"50%",
   borderRadius:20,
   justifyContent:'center',
   alignItems:'center',
   backgroundColor:"#00d0ff",
   marginRight:30,
   marginLeft : 350,
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