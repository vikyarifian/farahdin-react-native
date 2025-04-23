import { Text, View, TouchableOpacity, Button, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "../../styles/style";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Link } from "expo-router";

export default function index() {
  return (
    <View
      style={styles.container}
    >
      <Text style={[styles.title, {margin:0}]}>Hello, ...</Text>
      {/* <Link style={{ color: 'white' }} href={"/profile"}>Profile</Link> */}
      <View
        style={{ flex: 1, padding: 5, width: '100%', minHeight: 400, maxHeight: '100%' }}
      >
        <ImageBackground
          style={{ flex: 1,
            width: '100%', 
            height: '75%',
            justifyContent: 'center',
            alignItems: 'center', 
            borderRadius: 5, 
            opacity: 0.95, }}
          source={require('../../assets/images/farahdin-2.png')} // Path to your image              
          resizeMode="cover" // or 'cover', 'stretch', 'contain', 'repeat', 'center'
        >
          <Text style={[styles.title, { fontSize: 20, textAlign: "center", fontWeight: '400', top: 20 }]}>Live Chat</Text>
          <Text style={[styles.title, { fontSize: 16, textAlign: "center", fontWeight: '200', top: 15 }]}>Everything about your future and more...</Text>
          <View style={[styles.button,{ padding: 0, top: 30, width: '50%', height: 38, borderRadius: 10, alignSelf: "center" }]}>
            <TouchableOpacity style={{ padding: 8 }}>
              <Text style={{ color: 'black', alignSelf: 'center', fontSize: 18 }}>Start Chat</Text>
              <Icon name={'angle-right'} size={22} style={{ top: -22, alignSelf: 'flex-end' }}></Icon>
            </TouchableOpacity>            
          </View>
        </ImageBackground>
        
      </View>
      <View style={{ width: '95%', height: 350 }}>
        
      </View>
    </View>
  );
}
