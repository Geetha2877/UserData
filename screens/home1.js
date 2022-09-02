import React, { useRef,PureComponent ,useState} from 'react'
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
TextInput,
Alert,alert
} from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';
import { RFValue } from "react-native-responsive-fontsize"
import { Avatar } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { Camera } from 'expo-camera';
import { FlashMode } from 'expo-camera/build/Camera.types';
import db from '../config';
import firebase from 'firebase';
import GetLocation from 'react-native-get-location'

function Home (){

   
    const cameraRef = useRef();
    const camera = useRef(null)
    //var showCamera= false
    var userId =firebase.auth().currentUser.email

    const [previewHobby, setPreviewHobby] = useState("Choose your Hobby");
    const [dropdownHeight, setDropdownHeight] = useState(40);
    const [image, setImage] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [hobbies, setHobbies] = useState("");
    const [age, setAge] = useState();
    const [topic, setTopic] = useState("");
    const [location, setLocation] = useState("");
    var [showCamera, setShowCamera]=useState(false)
    

  const selectPicture = async () => {
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!cancelled) {
      setImage(uri)
    }
  };

 const deleteData=()=>{
  db.collection('userInfo').where('user_id',"==",userId).get()
  .then((snapShot)=>{
    snapShot.forEach((doc)=>{
      doc.ref.delete()
    })
  })
}
const modifyData=(firstName,lastName,age,hobbies,image,topic)=>{
  db.collection('userInfo').where('user_id',"==",userId).get()
  .then((snapShot)=>{

    snapShot.forEach((doc)=>{
      console.log(doc.data())
      doc.ref.update({
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

  
   const takePicture = async () => {

    try {
        const options = { quality: 0.5, base64: true };
        const data = await cameraRef.current.takePictureAsync(options)
        setImage(data.uri)
        console.log(data.uri, '<<<<<<<<<<<<<<<<<<<<<');
        setShowCamera(false)
    } catch (error) {
        console.log(error, "ERROR <<<<<<<<<<<<<")
    }
  }
 
  const openCamera=()=>{
    setShowCamera(true)
  }
  const addUser = async(firstName,lastName,age,hobbies,topic,image)=>{


    db.collection('userInfo').add({
        "user_id": firebase.auth().currentUser.email,
        "first_name":firstName,
        "last_name":lastName,
        "age":age,
        "hobbies":hobbies,
        "topic":topic,
        "image":image
       
    })
   
    
  }


  const findCoordinates = () => {
   
    

    navigator.geolocation.getCurrentPosition(
      position => {
        const location = JSON.stringify(position);
        console.log(position)

        setLocation(location)
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };
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
                setFirstName(text)
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder ={"Last Name"}
                maxLength ={8}
                onChangeText={(text)=>{
                    setLastName(text)
                  }}
                
              />
              <TextInput
                style={styles.formTextInput}
                placeholder ={"Age"}
                maxLength ={10}
                keyboardType={'numeric'}
                onChangeText={(text)=>{
                  setAge(text)
                }}
            />
                 <TextInput
                style={styles.formTextInput}
                placeholder ={"Enter the Topic for discussion"}
                maxLength ={20}
        
                onChangeText={(text)=>{
                  setTopic(text)
                }}
            />
            <View style={{flexDirection:"row",marginLeft:10,marginTop:20}}>
              
            <Text 
            style={{marginTop:10,fontSize:20,fontWeight:"bold",color:"red",
            }}>Hobbies</Text>
            
             <View style={{ height: RFValue({dropdownHeight}) }}>
                <DropDownPicker
                  items={[
                
                    {label: "Music" , value:"Music"},
                    {  label: "Gardening",value:"Gardening" },
                    
                  ]}
                  defaultValue="Music"
                  containerStyle={{
                    height: 40,
                    width:300,
                    borderRadius: RFValue(20),
                    marginBottom: RFValue(20),
                    marginHorizontal: RFValue(10),
                    
                  }}
                  onOpen={() => {
                     setDropdownHeight(170);
                  }}
                  onClose={() => {
                    setDropdownHeight(40);
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
                  onChangeItem={(item) =>{item.value,
                  setHobbies(item)
                  }
                 
                  }
                />
             
        <TouchableOpacity style={styles.registerButton} onPress={findCoordinates()}>
          <Text style={{align:"center"}}>Find My Coords?</Text>
         
        </TouchableOpacity>
        <Text>{location}</Text>
      

              </View>
              </View>
              <View style={{ marginleft:0,marginTop:50,flex:1, flexDirection:"row"}}>
      
      <Button color="green" title="Choose" Photo onPress={()=>selectPicture()} />
   
  
       
        </View>
        <View style={{ marginleft:0,marginTop:10,flex:1, flexDirection:"row"}}>
        <Button color="green" title="Open Camera" onPress={()=>openCamera()} />
        </View>
   
    
    {showCamera===true?(   
        <View style={styles.container2}>
   
        <Camera ref={cameraRef} style={styles.preview} >
        <Text style={styles.capture} ></Text>
                    </Camera>
                    

                    
                    
                    </View>
    ):null
}

      
      

        
        
        
                    <TouchableOpacity  onPress={()=>{takePicture()}}>
                    <Text style={styles.capture} >[CAPTURE]</Text>
                        </TouchableOpacity>
      

        
       

      <View>
      <Image style={{width:100,height:100}}source={{uri:image}}/>
      </View>
              
              <View style={styles.modalBackButton}>
                <TouchableOpacity
                  style={styles.registerButton}
                  onPress={()=>
                   {addUser(firstName,lastName,age,hobbies,topic,image)
                
                  }}
                >
                <Text style={styles.registerButtonText}>REGISTER</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.registerButton}
                  onPress={()=>
                   {modifyData(firstName,lastName,age,hobbies,topic,image)
                
                  }}
                >
                <Text style={styles.registerButtonText}>MODIFY</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.registerButton}
                  onPress={()=>
                   {deleteData()
                
                  }}
                >
                <Text style={styles.registerButtonText}>DELETE</Text>
                </TouchableOpacity>
                
              </View>

              </KeyboardAvoidingView>
            </ScrollView>
          </View>


        
    )
    
    
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
    alignItems: 'center',
    height:100,
    Width:150
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

  export default Home