import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from '@/styles/style';
import { authStyles } from '@/styles/auth.styles';
import { COLORS } from '@/assets/constatns/theme';
import { Ionicons } from '@expo/vector-icons';
import { useSSO } from '@clerk/clerk-expo';
import { router } from 'expo-router';

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
                <Ionicons name="logo-google" size={20} color={COLORS.surface} />
            </View>
            <Text style={authStyles.googleButtonText}>Continue with Google</Text>
        </TouchableOpacity>        
        <Text style={authStyles.termsText}>By continuing, you agree to our Terms and Privacy Policy</Text>
      </View>
    </View>
  );
}