import React ,{Component}from 'react';
import { View, FlatList,StyleSheet,Image,TouchableOpacity, Linking,Text } from "react-native"
import heartImage from "../assets/222-2.png"
import heartImageUnfill from "../assets/222.png"
const COUNTER_KEY = "IS_HEART_PRESS";


var icon = this._ifLiked
? require('../assets/222-2.png')
: require('../assets/222.png');

class Button extends Component{ 

  
    
    constructor(props){ 
      super(props) 
      this.state = { 
        likedQ: false, 
      } 
    } 



    _ifLiked = () => { 
        this.setState({
          likedQ: true, 
        })
      } 
 
  
    render(){ 
     return( 
      <View> 
       <TouchableOpacity
                            onPress={() => this._ifLiked}
                        >
             <Image source={icon}/>               
        </TouchableOpacity>
     </View> 
   )} 
  }

  export default Button;
