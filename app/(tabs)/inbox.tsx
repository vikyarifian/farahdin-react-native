import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import { useUser } from '@clerk/clerk-expo';
import { styles } from '@/styles/style';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/assets/constatns/theme';
import { getItem } from "../../utils/AsyncStorage";

export default function inbox() {

  const router = useRouter();
  const { user } = useUser();
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

  return (
    <View style={styles.container} >
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name='arrow-back' size={22} color={COLORS.primary}/>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{lang === 'ID' ? 'Pesan':'Inbox'}</Text>
          <View style={{ width: 28 }} />
        </View>
        <ScrollView contentContainerStyle={styles.scrollContent}
          bounces={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps='handled'
          contentOffset={{ x: 0, y: 0 }}
        >
          <View style={styles.content}></View>
        </ScrollView>
      </View>      
    </View>
  )
}