import React, { useRef,PureComponent } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Button,
  Dimensions,
  TouchableOpacity,
KeyboardAvoidingView,
TextInput
} from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';
import { RFValue } from "react-native-responsive-fontsize"
import { Avatar } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { Camera } from 'expo-camera';


export default class Home extends PureComponent{

  constructor(props){
    super(props)
    const type = null
    const setType=null
    this.state = {
      previewHobby:"Music",    
      dropdownHeight: 40,
      image:"#"
    }
  }
 

  

  selectPicture = async () => {
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!cancelled) {
      this.setState({image:uri})
    }
  };


  
   takePicture = async () => {

    try {
        const options = { quality: 0.5, base64: true };
        const data = await Camera.takePicture(options);
        console.log(data.uri, '<<<<<<<<<<<<<<<<<<<<<');
    } catch (error) {
        console.log(error, "ERROR <<<<<<<<<<<<<")
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
                placeholder ={"Age"}
                maxLength ={10}
                keyboardType={'numeric'}
                onChangeText={(text)=>{
                  this.setState({
                    contact: text
                  })
                }}
            />
            <View style={{flexDirection:"row",marginLeft:150}}>
              <View >
            <Text 
            style={{marginTop:10,fontSize:20,fontWeight:"bold",color:"red",
            }}>Hobbies</Text>
            </View>
             <View style={{ height: RFValue(this.state.dropdownHeight) }}>
                <DropDownPicker
                  items={[
                    { label: "Music", value: "Music" },
                    { label: "Gardening", value: "Gardening" },
                    
                  ]}
                  defaultValue="Music"
                  containerStyle={{
                    height: 40,
                    width:100,
                    borderRadius: RFValue(20),
                    marginBottom: RFValue(20),
                    marginHorizontal: RFValue(10),
                    
                  }}
                  onOpen={() => {
                    this.setState({ dropdownHeight: 170 });
                  }}
                  onClose={() => {
                    this.setState({ dropdownHeight: 40 });
                  }}
                  style={{ backgroundColor: "transparent" }}
                  itemStyle={{
                    justifyContent: "flex-start"
                  }}
                  dropDownStyle={{
                    backgroundColor: "yellow"
                  }}
                  labelStyle={
                    
                      styles.dropdownLabel
                  }
                  arrowStyle={
                  
                     
                      styles.dropdownLabel
                  }
                  onChangeItem={item =>
                    this.setState({
                      previewHobby: item.value
                    })
                  }
                />


              </View>
              </View>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      
        <Button title="Choose Photo" onPress={()=>this.selectPicture()} />
                
        <View style={styles.container2}>
        <Camera ref={cam=>{this.camera = cam;}} style={styles.preview} >
        <Text style={styles.capture} onPress={()=>{this.takePicture.bind(this)}}>[CAPTURE]</Text>
                    </Camera>
                    </View>
                    <TouchableOpacity >
                    <Text style={styles.capture} onPress={()=>{this.takePicture()}}>[CAPTURE]</Text>
                        </TouchableOpacity>
       

        <Avatar
            rounded
            source={{
              uri: this.state.image,
            }}
            size="medium"
           
            containerStyle={styles.imageContainer}
            showEditButton
          />
       
      </View>

     
              
              <View style={styles.modalBackButton}>
                <TouchableOpacity
                  style={styles.registerButton}
                  onPress={()=>
                   this.props.navigation.navigate("LoginScreen")
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
     backgroundColor:'#ff8400',
     alignItems: 'center',
     justifyContent: 'center',
     fontFamily:'Bebas Neue'
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
     margin:20,
     fontWeight:"bold",
   },
   modalContainer:{
     flex:1.0,
     width:"90%",
     borderRadius:20,
     justifyContent:'center',
     alignItems:'center',
     backgroundColor:"#00d0ff",
     marginRight:30,
     marginLeft : 20,
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
    // placeholderTextColor:"black"
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
   },
   dropdownLabel: {
    color: "black",
    width:100,
  },
container1: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button1: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  },
  container2: {
    flex:1,
    flexDirection: 'row',
},
  })