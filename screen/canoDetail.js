import React, { useState, useContext } from 'react';
import { View, FlatList,StyleSheet,Image,TouchableOpacity,AsyncStorage, Linking,Text } from "react-native"
import heartImage from "../assets/222-2.png"
import heartImageUnfill from "../assets/222.png"
import {StoreContext } from '../store'
const COUNTER_KEY = "IS_HEART_PRESS";

const canoDetail  = ({ album, navigation }) => {

    const {enneadState, kanoState} = useContext(StoreContext);
    const [ennead, setEnnead] = enneadState;
    const [kano, setKano] = kanoState;

    // const initHeart = async () => {
    //     try {
    //         let result = await AsyncStorage.getItem(COUNTER_KEY);
    //         result = JSON.parse(result);
    //         if (result != null) {
    //             setValue(result);
    //         }
    //         else{
    //             setValue(heart);
    //         }
    //     }
    //     catch (error) {
    //         console.warn(error);
    //     }
    //   };
      
    //   const [heart, setHeart] = useState(false); /*宣告useState*/
      
    //   initHeart();
      
      function renderImage() { /*判斷用哪張圖片渲染*/
        let imgSrc = ''
        if (album.heart) {
            imgSrc = heartImage;
        }
        else {
            imgSrc = heartImageUnfill;
        }
        return (
            <Image
                style={{ 
                  marginTop:350,
                  marginLeft:270,  
                  width:65,
                  height:65,}}
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
      
      const addFav = () => { /*給button用的函式*/
        /* 要set global state 的地方*/

        const copyKano = [...kano];
        const index = copyKano.findIndex(data => data.title === album.title);
        const targetKano = kano[index];
        targetKano.heart = !targetKano.heart;

        copyKano.splice(index, 1, targetKano);
        setKano(copyKano);

      }

    return (
 
    <View style={styles.card}>
        <View style={styles.postname}>
            <Image style={{width:264,height:212,marginLeft:-10,marginTop:20}} source={{uri: album.pic}}/>
            <Text style={styles.title}>{album.title}</Text>

            <Text style={styles.articletext}>{album.a1}</Text>
            <Text style={styles.articletext}>{album.a2}</Text>
            <Text style={styles.articletext}>{album.a3}</Text>
            <Text style={styles.articletext}>{album.a4}</Text>
            <Text style={styles.articletext}>{album.a5}</Text>
            <Text style={styles.articletext}>{album.a6}</Text>

        </View>


        
        <TouchableOpacity
                    style={{
                    position:"absolute",
                    flex:1,
                    justifyContent: "center",
                    alignItems: "center",
                    }}
                        onPress={addFav}>

                                {renderImage()}

                </TouchableOpacity>  
    </View>
    );

};

const styles = StyleSheet.create({

    card:{
        flexDirection:"row",
        justifyContent:"flex-start",
        backgroundColor:"#F3EFEB",
        borderRadius: 42,
        width:346,
        height:428,
        marginTop:25,
    },

    title:{
        color:"#4E5C69",
        fontSize:16,
        fontWeight:"bold",
        alignItems:"center",
        marginBottom:5,
        marginLeft:-15,
        marginTop:15,
    },

    articletext:{
        color:"#4E5C69",
        fontSize:13,
        alignItems:"center",
        marginLeft:-15,
        marginTop:8,
    
    },
    postname:{
        width:360,
        height:120,
        flexDirection:"column",
        justifyContent:"flex-start",
        alignItems:"center",
    },


});


export default canoDetail;