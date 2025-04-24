import { Button, Modal, Text, View, TouchableOpacity, ImageBackground, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { styles } from "../../styles/style";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/assets/constatns/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import * as Svg from 'react-native-svg';
import { setItem, getItem } from "../../utils/AsyncStorage";

const langEn = () => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingBottom: 10, paddingRight: 2, width: 30, paddingLeft: 3 }}>
      <Svg.Svg width="20" height="20" viewBox="0 0 20 20" >
        <Svg.G clipPath="url(#clip0_1203_54858)">
        <Svg.Path d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z" fill="#F0F0F0"/>
        <Svg.Path d="M9.56641 10.0003H20.0012C20.0012 9.09773 19.8809 8.22336 19.6567 7.3916H9.56641V10.0003Z" fill="#D80027"/>
        <Svg.Path d="M9.56641 4.78254H18.5334C17.9213 3.78363 17.1386 2.9007 16.226 2.17383H9.56641V4.78254Z" fill="#D80027"/>
        <Svg.Path d="M9.99828 20.0001C12.3518 20.0001 14.5149 19.1866 16.2231 17.8262H3.77344C5.48164 19.1866 7.6448 20.0001 9.99828 20.0001Z" fill="#D80027"/>
        <Svg.Path d="M1.46699 15.2171H18.5315C19.023 14.4152 19.4041 13.5386 19.6548 12.6084H0.34375C0.594414 13.5386 0.975547 14.4152 1.46699 15.2171Z" fill="#D80027"/>
        <Svg.Path d="M4.63219 1.56164H5.54348L4.69582 2.17746L5.01961 3.17391L4.17199 2.55809L3.32437 3.17391L3.60406 2.31309C2.85773 2.93477 2.20359 3.66313 1.66453 4.47469H1.95652L1.41695 4.86668C1.33289 5.00691 1.25227 5.14937 1.175 5.29395L1.43266 6.08695L0.951953 5.7377C0.832461 5.99086 0.723164 6.24973 0.624922 6.51398L0.908789 7.38773H1.95652L1.10887 8.00356L1.43266 9L0.585039 8.38418L0.0773047 8.75309C0.0264844 9.1616 0 9.57769 0 10H10C10 4.47719 10 3.82609 10 0C8.02453 0 6.18301 0.573047 4.63219 1.56164ZM5.01961 9L4.17199 8.38418L3.32437 9L3.64816 8.00356L2.80051 7.38773H3.84824L4.17199 6.39129L4.49574 7.38773H5.54348L4.69582 8.00356L5.01961 9ZM4.69582 5.09051L5.01961 6.08695L4.17199 5.47113L3.32437 6.08695L3.64816 5.09051L2.80051 4.47469H3.84824L4.17199 3.47824L4.49574 4.47469H5.54348L4.69582 5.09051ZM8.60656 9L7.75895 8.38418L6.91133 9L7.23512 8.00356L6.38746 7.38773H7.4352L7.75895 6.39129L8.0827 7.38773H9.13043L8.28277 8.00356L8.60656 9ZM8.28277 5.09051L8.60656 6.08695L7.75895 5.47113L6.91133 6.08695L7.23512 5.09051L6.38746 4.47469H7.4352L7.75895 3.47824L8.0827 4.47469H9.13043L8.28277 5.09051ZM8.28277 2.17746L8.60656 3.17391L7.75895 2.55809L6.91133 3.17391L7.23512 2.17746L6.38746 1.56164H7.4352L7.75895 0.565195L8.0827 1.56164H9.13043L8.28277 2.17746Z" fill="#0052B4"/>
        </Svg.G>
        <Svg.Defs>
        <Svg.ClipPath id="clip0_1203_54858">
        <Svg.Rect width="20" height="20" fill="white"/>
        </Svg.ClipPath>
        </Svg.Defs>
      </Svg.Svg>
      <Text style={{color:'white', paddingLeft: 5, justifyContent: 'flex-end' }}>EN</Text>
    </View>
  )
}

const langId = () => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingBottom: 10, paddingRight: 2, width: 30, paddingLeft:0 }}>
      <Svg.Svg width="20" height="20" viewBox="0 0 20 20">
        <Svg.G clipPath="url(#clip0_1203_54192)">
        <Svg.Path d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z" fill="#F0F0F0"/>
        <Svg.Path d="M0 10C0 4.47719 4.47719 0 10 0C15.5228 0 20 4.47719 20 10" fill="#A2001D"/>
        </Svg.G>
        <Svg.Defs>
        <Svg.ClipPath id="clip0_1203_54192">
        <Svg.Rect width="20" height="20" fill="white"/>
        </Svg.ClipPath>
        </Svg.Defs>
      </Svg.Svg>
      <Text style={{color:'white', paddingLeft: 5 }}>ID</Text>
    </View>
  )
}
export default function index() {
  const {user}= useUser();
  const [modalVisible, setModalVisible] = useState(false);
  const [lang, setLang] = useState<string | null>(null);

  React.useEffect(() => {
    const fetchLang = async () => {
      const storedLang = await getItem('lang');
      setLang(storedLang);
      if (!storedLang) {
        setLang('EN'); // Default to 'EN' if no language is stored
      }
    };
    fetchLang();
  }, [getItem('lang')]);
  
  const [isVisible, setIsVisible] = useState(false);
  const toggleDropdown = () => {
    setIsVisible(!isVisible);
  };
  
  const handleSelect = async (option: string)  => {
    setLang(option);
    setItem('lang',option);
    toggleDropdown();
  };

  const getGreetingTime = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      return (lang==="ID"?"Selamat pagi":"Good morning");
    } else if (currentHour >= 12 && currentHour < 17) {
      return (lang==="ID"?"Selamat siang":"Good afternoon");
    } else if (currentHour >= 17 && currentHour < 21) {
      return (lang==="ID"?"Selamat sore":"Good evening");
    } else {
      return (lang==="ID"?"Selamat malam":"Good night");
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, {alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}]}>
        <View style={{ width: 30 }} />
        <Text style={{ fontFamily: 'Javassoul', color: COLORS.primary, fontSize: 28, top: 0, letterSpacing: 2, fontWeight: 'bold' }}>Farahdin</Text>
        {/* <TouchableOpacity style={styles.button} onPress={toggleDropdown}>
          <Text>{'EN'}</Text>
        </TouchableOpacity> */}
        <Modal visible={isVisible} transparent animationType='none' style={{backgroundColor: COLORS.background}}>
          <TouchableOpacity style={{flex: 0, top: 80,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent',}} onPress={toggleDropdown} activeOpacity={1}
          >
            <View 
              style={{backgroundColor: COLORS.surface,
                      paddingTop: 5,
                      borderRadius: 5,
                      width: 60,alignSelf:'flex-end'
                    }}
            >
              {(lang === 'ID' ?
                <TouchableOpacity
                  key={'EN'}
                  style={{paddingRight: 10,
                          borderBottomWidth: 0,
                          width: 'auto',
                          alignSelf:'flex-end'
                        }}
                  onPress={() => handleSelect('EN')}
                >
                  {langEn()}
                </TouchableOpacity>
              :
                <TouchableOpacity
                  key={'ID'}
                  style={{
                    paddingRight: 10,
                    borderBottomWidth: 0,
                    alignSelf:'flex-end'}}
                  onPress={() => handleSelect('ID')}
                >
                  {langId()}
                </TouchableOpacity>
              )}
            </View>
          </TouchableOpacity>
        </Modal>
        <TouchableOpacity onPress={toggleDropdown}>
          {(lang === 'ID' ?
          langId()
         :
         langEn()
           )}
          
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps='handled'
        contentOffset={{ x: 0, y: 0 }} // Set initial scroll position to the top
      >  
        <Text style={[styles.title, {margin:0}]}>{getGreetingTime()}, {(user?.fullName?.split(' ')[0] ?? 'Guest')}</Text>
        {/* <Link style={{ color: 'white' }} href={"/profile"}>Profile</Link> */}
        <View
          style={{ flex: 1, padding: 5, width: '100%', minHeight: 400, maxHeight: '100%' }}
        >
          <ImageBackground
            style={styles.backgroundImage}
            source={require('../../assets/images/farahdin-5.png')} // Path to your image              
            resizeMode="cover" // or 'cover', 'stretch', 'contain', 'repeat', 'center'
          >
            <Text style={[styles.title, { fontSize: 19, textAlign: "center", fontWeight: '500', top: 20 }]}>{(lang === 'ID' ?'Ngobrol Langsung':'Live Chat')}</Text>
            <Text style={[styles.title, { fontSize: 14, textAlign: "center", fontWeight: '200', top: 15 }]}>{(lang === 'ID' ?'Semua tentang masa depan Anda dan banyak lagi...':'Everything about your future and more...')}</Text>
            <View style={[styles.button, { padding: 0, top: 30, width: '50%', height: 38, borderRadius: 10, alignSelf: "center" }]}>
            <TouchableOpacity style={{ padding: 8 }} onPress={() => setModalVisible(true)}>
              <Text style={{ color: 'black', alignSelf: 'center', fontSize: 18 }} >{(lang === 'ID' ?'Mulai Obrolan':'Start Chat')}</Text>
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
