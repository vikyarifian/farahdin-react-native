import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from '@/styles/style';
import { authStyles } from '@/styles/auth.styles';
import { COLORS } from '@/assets/constatns/theme';
import { Ionicons } from '@expo/vector-icons';
import { useSSO } from '@clerk/clerk-expo';
import { router } from 'expo-router';
import * as Svg from 'react-native-svg';

export default function login() {
  const {startSSOFlow} = useSSO()
  const handleGoogleSignIn = async () => {
    try {
        const {createdSessionId,setActive} = await startSSOFlow({strategy:"oauth_google"})
        if (setActive && createdSessionId) {
            setActive({session: createdSessionId});
            router.replace("/(tabs)")
        }
    } catch (error) {
        console.log("OAuth error:", error)
    }
  }

  return (
    <View style={styles.container}>
      <View style={authStyles.brandSection}>
        <View style={authStyles.logoContrainer}>
            <Image source={require("../../assets/images/logo.png")} style={{ width:180, height:180 }}></Image>
        </View>
        <Text style={styles.appName}>farahdin</Text>
      </View>
      <View style={authStyles.loginSection}>
        <TouchableOpacity
            style={authStyles.googleButton}
            onPress={handleGoogleSignIn}
            activeOpacity={0.9}
        >
            <View style={authStyles.googleIconContainer}>
                {/* <Ionicons name="logo-google" size={20} color={COLORS.surface} /> */}
                <Svg.Svg height="100%" width="100%" viewBox="0 0 48 48" >
                  <Svg.Path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                  <Svg.Path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                  <Svg.Path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                  <Svg.Path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                  <Svg.Path fill="none" d="M0 0h48v48H0z" />
              </Svg.Svg>
            </View>
            <Text style={authStyles.googleButtonText}>Continue with Google</Text>
        </TouchableOpacity>        
        <Text style={authStyles.termsText}>By continuing, you agree to our Terms and Privacy Policy</Text>
      </View>
    </View>
  );
}