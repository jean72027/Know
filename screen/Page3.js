import React, { useState } from 'react';
import { View, FlatList,StyleSheet,Image,TouchableOpacity,AsyncStorage, Linking,Text } from "react-native"
import heartImage from "../assets/222-2.png"
import heartImageUnfill from "../assets/222.png"
const COUNTER_KEY = "IS_HEART_PRESS";


const buttonscreen = ({ back, navigation }) =>{

const initHeat = async () => {
  try {
      let result = await AsyncStorage.getItem(COUNTER_KEY);
      result = JSON.parse(result);
      if (result != null) {
          setValue(result);
      }
      else{
          setValue(heart);
      }
  }
  catch (error) {
      console.warn(error);
  }
};

const [heart, setHeart] = useState(false); /*宣告useState*/

initHeat();

function renderImage() { /*判斷用哪張圖片渲染*/
  let imgSrc = ''
  if (heart) {
      imgSrc = heartImage;
  }
  else {
      imgSrc = heartImageUnfill;
  }
  return (
      <Image
          style={{ width:60,
            height:60,

      }}
          source={imgSrc}
      />
  );
}



setValue = async (b) => {
  try {
      await AsyncStorage.setItem(COUNTER_KEY, JSON.stringify(b)); /*設定新內容*/
  } 
  catch (error) {
  }
  finally {
      setHeart(b);
  }
};

const plusOneFn = () => { /*給button用的函式*/
  setValue(!heart);
}

return (
  <TouchableOpacity
                    style={{
                    position:"absolute",
                    flex:1,
                    justifyContent: "center",
                    alignItems: "center",
                    }}
                        onPress={plusOneFn}>

                                {renderImage()}

            </TouchableOpacity>
);

}

export default buttonscreen;