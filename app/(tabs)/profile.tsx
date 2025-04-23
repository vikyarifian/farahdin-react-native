import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useClerk, useUser } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'

export default function profile() {
  // Use `useClerk()` to access the `signOut()` function
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
    <View>
      <Text>Profile Screen {user?.fullName || 'Guest'}</Text>
      <TouchableOpacity onPress={handleSignOut}>
        <Text style={{marginTop:50}}>Sign out</Text>
      </TouchableOpacity>
    </View>
  )
}