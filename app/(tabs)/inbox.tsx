import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import { useUser } from '@clerk/clerk-expo';
import { styles } from '@/styles/style';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/assets/constatns/theme';
import { getItem } from "../../utils/AsyncStorage";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function inbox() {
  
  const messages = useQuery(api.inboxes.getInboxes)
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
          <View style={styles.content}>
              <View style={styles.container}>
                {/* <View style={styles2.topAlignedView}>
                  <Text>This View is aligned to the top</Text>
                </View> */}
                {/* <View style={styles2.bottomView}>
                  {messages?.map((a, i) => (
                    <Text key={i}>{a.messageID}</Text>
                  ))}
                  <Text>Other content</Text>
                </View> */}
            </View>
          </View>
        </ScrollView>
      </View>      
    </View>
  )
}

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column', // Ensure items are stacked vertically
    backgroundColor: '#fff',
  },
  topAlignedView: {
    alignItems: 'flex-start', // Align content to the top horizontally
    justifyContent: 'flex-start', // Align content to the top vertically
    backgroundColor: 'lightblue',
    padding: 20,
  },
  bottomView: {
    flex: 1,
    backgroundColor: 'lightgray',
    padding: 20,
  },
});