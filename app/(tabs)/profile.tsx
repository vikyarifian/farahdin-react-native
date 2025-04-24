import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { useClerk, useUser } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'
import { styles } from '@/styles/style'
import { EvilIcons, Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/assets/constatns/theme'
import { Image } from 'expo-image';

export default function profile() {

  const router = useRouter();
  const { signOut } = useClerk()
  const {user}= useUser()

  const handleSignOut = async () => {
    try {
      await signOut()
      // Redirect to your desired page
      Linking.openURL(Linking.createURL('/'))
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name='arrow-back' size={22} color={COLORS.primary}/>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <View style={{ width: 28 }} />
        </View> 
        
        <ScrollView contentContainerStyle={styles.scrollContent}
          bounces={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps='handled'
          contentOffset={{ x: 0, y: 100 }}
        >
          <View style={styles.content}>
            <Image
              source={user?.imageUrl ? { uri: user.imageUrl } : require("../../assets/images/react-logo.png")}
              style={{ width: 100, height: 100, borderRadius: 100, alignSelf: 'center', borderBottomWidth: 30 }}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
              {/* <EvilIcons size={28} color={COLORS.primary} name='user' /> */}
              {/* <View style={{ width: 28 }} /> */}
              <Text style={{ fontSize:18, minHeight: 38, color: COLORS.white, alignSelf: 'center' }}>{user?.fullName || 'Guest'}</Text>
              {/* <View style={{ width: 28 }} /> */}
            </View>
            {/* <Text style={{ margin:10 }}></Text>
            <View style={{ flexDirection:'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <EvilIcons size={28} color={COLORS.primary} name='user' />
              <Text style={{ minHeight: 30 }}>{user?.fullName || 'Guest'}</Text>
              <View style={{ width: 28 }} />
            </View>
            <Text style={styles.title}>{user?.fullName || 'Guest'}</Text> */}
            <TouchableOpacity onPress={handleSignOut} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
              <Ionicons name='power' size={22} color={'red'} style={{ marginRight: 6 }} />
              <Text style={{ fontSize:14, color: COLORS.white, alignSelf: 'center' }}>Sign out</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>     
      </View>
    </View>
  )
}