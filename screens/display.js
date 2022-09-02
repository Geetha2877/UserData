
import React from "react";
import {View,Text,StyleSheet,TouchableOpacity,Image} from "react-native";
import {Card,Header} from 'react-native-elements';
import db from '../config';
import firebase from 'firebase';
import { SafeAreaProvider } from "react-native-safe-area-context";


export default class Display extends React.Component{

    constructor(props){
        super(props),
        this.state={
       userId:firebase.auth().currentUser.email,
       firstName:"",
       lastName:"",
       age:"",
       hobbies:"",
       image:"",
       topic:"",
       data:[]
        }
    }
   
   



    renderDictionary() {
       const data = this.state
       console.log(data)
       return (data.map(user => {
        <Card key={user.user_id} FirstName={user.first_name} LastName={user.last_name} />
      }));
       
      }

    getUserDetails=()=>{
       
        db.collection('userInfo').where('user_id',"==",this.state.userId).get()
        .then(snapshot=>{
           
          snapshot.forEach(doc=>{
            console.log("snapshot",doc.data())
            console.log(doc.data().first_name)
            this.setState({
            firstName:doc.data().first_name,
            lasName:doc.data().last_name,
            age:doc.data().age,
            hobbies:doc.data().hobbies,
            image:doc.data().image,
            topic:doc.data().topic,
            data:doc.data()
          
            })
            console.log(this.state.image)
            console.log(this.state.data)
          })
        })
        
      }

    componentDidMount(){
   
   this.getUserDetails()
   console.log(this.state.firstName)
    }      
    render(){
        const data = this.state.data
        const image = this.state.image

    return(
        <View style={styles.container}>
         
        <SafeAreaProvider>
        <View style={{flex:0.1}}>
        <Header
        //leftComponent={<Icon name='arrow-left' type='feather' color='#696969'
         //onPress={()=>{
         //  this.props.navigation.goBack()
         //}}/>}
         centerComponent={{text:"Display Userinfo",style:{color:'black',fontSize:20,fontWeight:'bold'}}}
         backgroundColor="yellow"
        />
        </View>
       


    <View style={{flex:0.3}}>
      <Card
      title={"Book Information"}
      titleStyle={{fontSize:20,textAlign: 'left',}}
      >
    <Card>

        <Text>First Name :{this.state.firstName}</Text>
    </Card>

    <Card>

        <Text>Last Name :{this.state.firstName}</Text>
    </Card>
    <Card>

        <Text> Age :{this.state.age}</Text>
    </Card>
    <Card>

<Text> Hobbies :{this.state.hobbies.value}</Text>
</Card>
<Card>

<Text> Topic :{this.state.topic}</Text>
</Card>

<Card>
<Text>Photo: </Text>
< Image style = {{alignItems:"center",width:200,height:200}} source ={{uri:image}}/>
</Card>


</Card>

        </View>
        
        </SafeAreaProvider>
        </View>
    )
    
    }


}

const styles = StyleSheet.create({ container: { flex:1, },
    buttonContainer : { marginTop:300,flex:0.3, justifyContent:'center', alignItems:'center' }, 
    button:{ width:200, height:50, justifyContent:'center', alignItems : 'center',
     borderRadius: 10, backgroundColor: 'orange', shadowColor: "#000",
     shadowOffset: { width: 0, height: 8 }, elevation : 16 } })