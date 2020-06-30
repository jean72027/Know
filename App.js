import React , { useState, useRef, useContext }from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Animated,
    ScrollView,
    FlatList,
    AsyncStorage,
    Image,
    Dimensions
} from "react-native";
import albumData from "./json/enneadDATA.json"
import Button from "./screen/Page3"
import AlbumDetail from "./screen/cardDetail"
import CanoDetail from "./screen/canoDetail"
import { StoreProvider, StoreContext } from './store'

 
const { width } = Dimensions.get("window");
 
const App = () =>  {

    const {enneadState, kanoState} = useContext(StoreContext);
    const [ennead, setEnnead] = enneadState;
    const [kano, setKano] = kanoState;

    const translateX = useRef(new Animated.Value(0)).current;
    const translateXTabOne = useRef(new Animated.Value(0)).current;
    const translateXTabTwo = useRef(new Animated.Value(width)).current;
    const [xTabOne, setXTabOne] = useState(0);
    const [xTabTwo, setXTabTwo] = useState(0);
    const [active, setActive] = useState(0);
    const [translateY, setTranslateY] = useState(0);
 

    const handleSlide = type => {
        Animated.spring(translateX, {
            toValue: type,
            duration: 100
        }).start();
        if (active === 0) {
            Animated.parallel([
                Animated.spring(translateXTabOne, {
                    toValue: 0,
                    duration: 100
                }).start(),
                Animated.spring(translateXTabTwo, {
                    toValue: width,
                    duration: 100
                }).start(),
              
            ]);
        } else {
            Animated.parallel([
                Animated.spring(translateXTabOne, {
                    toValue: -width,
                    duration: 100
                }).start(),
                Animated.spring(translateXTabTwo, {
                    toValue: 0,
                    duration: 100
                }).start(),
               
            ]);
        }
    };
 
        
        // 0628加      
        return (
          
                <View style={{ flex: 1,backgroundColor: "#F2E6D8",height:6277 }}>
                    <View
                        style={{
                            width: "90%",
                            marginLeft: "auto",
                            marginRight: "auto"
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                marginTop: 40,
                                marginBottom: 20,
                                height: 54,
                                position: "relative"
                            }}
                        >
                            <Animated.View
                                style={{
                                    position: "absolute",
                                    width: 95,
                                    height:41,
                                    marginLeft:44,
                                    backgroundColor:"white",
                                    borderRadius: 21,
                                    top: 0,
                                    left: 0,

                                    transform: [
                                        {
                                            translateX
                                        }
                                    ]
                                }}
                            >
                                <Image source={"./assets/bubble.png"}/>
                            </Animated.View>
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginTop:-15,
                                    
                                }}
                                onLayout={event =>setXTabOne(event.nativeEvent.layout.x)}
                                onPress={() => {
                                    setActive(0);
                                    handleSlide(xTabOne)
                                }}
                            >
    
    
                                <Text
                                    style={{
                                        color: active === 0 ? "#4E5C69" : "#4E5C69",
                                        fontWeight:'bold',
                                        fontSize:15,
                                    }}
                                >
                                    九柱神
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginTop:-15,
                                
                                }}
                                onLayout={event => setXTabTwo(event.nativeEvent.layout.x)}
                                onPress={() =>{
                                    setActive(1);
                                    handleSlide(xTabTwo)
                                }}
                            >
                                <Text
                                    style={{
                                        color: active === 0 ? "#4E5C69" : "#4E5C69",
                                        fontWeight:'bold'
                                    }}
                                >
                                    卡諾皮克罐
                                </Text>
                            </TouchableOpacity>
                            
                        </View>
                    <View style={{height:4569,}}>
                        <ScrollView
                        >
                            <Animated.View
                                style={{
                                    justifyContent: "center",
                                    alignItems: "center",
                                    transform: [
                                        {
                                            translateX: translateXTabOne
                                        }
                                    ]
                                }}
                                onLayout={event => setTranslateY(event.nativeEvent.layout.height)}
                            >
        {/* 0623add */}
                            
                                <FlatList 
                                    data={kano} 
                                    keyExtractor={item=>item.title} 
                                    renderItem={({item}) => <CanoDetail album={item} key={item.title}/>}
                                    style={{
                                        height:4500,
                                        marginTop:-15
                                    }}
                                />



                                {/* 0623add */}
                            </Animated.View>
                                    
                            <Animated.View
                                style={{
                                    justifyContent: "center",
                                    alignItems: "center",
                                    transform: [
                                        {
                                            translateX: translateXTabTwo
                                        },
                                        {
                                            translateY: -translateY
                                        }
                                    ]
                                }}
                            >

                            <FlatList 
                                data={ennead} 
                                keyExtractor={item=>{
                                
                                    return item.title
                                }} 
                                renderItem={({item}) => <AlbumDetail album={item} key={item.title} />}
                                style={{
                                    height:5000,
                                    marginTop:-15
                                }}
                                />
                            
                            </Animated.View>
  

                        </ScrollView>
                        </View>
                    </View>
                </View>
            
        );
}
export default ()　=> {
    return (
        <StoreProvider>
            <App />
        </StoreProvider>
    )
};
