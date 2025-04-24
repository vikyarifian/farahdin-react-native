import { Button, Modal, Text, View, TouchableOpacity, ImageBackground, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { styles } from "../../styles/style";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import * as FlagIcon from 'react-native-ico-flags';
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/assets/constatns/theme';
import { LinearGradient } from 'expo-linear-gradient';

export default function index() {
  const {user}= useUser();
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <View style={[styles.header, {alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}]}>
        <View style={{ width: 28 }} />
        <Text style={{ fontFamily: 'Cookie-Regular', color: COLORS.primary, fontSize: 28, top: -10, }}>farahdin</Text>
        <Icon name='slovenia'/>
        <TouchableOpacity>
          <Ionicons name='arrow-back' size={22} color={COLORS.primary}/>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps='handled'
        contentOffset={{ x: 0, y: 0 }} // Set initial scroll position to the top
      >  
        <Text style={[styles.title, {margin:0}]}>Hello, {user?.fullName || 'Guest'}</Text>
        {/* <Link style={{ color: 'white' }} href={"/profile"}>Profile</Link> */}
        <View
          style={{ flex: 1, padding: 5, width: '100%', minHeight: 400, maxHeight: '100%' }}
        >
          <ImageBackground
            style={styles.backgroundImage}
            source={require('../../assets/images/farahdin-3.png')} // Path to your image              
            resizeMode="cover" // or 'cover', 'stretch', 'contain', 'repeat', 'center'
          >
            <Text style={[styles.title, { fontSize: 19, textAlign: "center", fontWeight: '500', top: 20 }]}>Live Chat</Text>
            <Text style={[styles.title, { fontSize: 14, textAlign: "center", fontWeight: '200', top: 15 }]}>Everything about your future and more...</Text>
            <View style={[styles.button, { padding: 0, top: 30, width: '50%', height: 38, borderRadius: 10, alignSelf: "center" }]}>
            <TouchableOpacity style={{ padding: 8 }} onPress={() => setModalVisible(true)}>
              <Text style={{ color: 'black', alignSelf: 'center', fontSize: 18 }} >Start Chat</Text>
              <Icon name={'angle-right'} size={22} style={{ top: -22, alignSelf: 'flex-end' }}></Icon>
            </TouchableOpacity>            
            </View>
          </ImageBackground>          
        </View>
        <View style={{ width: '95%', height: 400 }}>
          <Modal
            visible={modalVisible}
            style={[styles.container, {backgroundColor: COLORS.background}]}
            animationType="slide" // or 'fade', 'none'
            // transparent={true} // optional, for a transparent background
            onRequestClose={() => setModalVisible(false)} // handle back button on Android
          >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
              <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
                <Text>This is the modal content!</Text>
                <Button title="Close Modal" onPress={() => setModalVisible(false)} />
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </View>
  );
}
