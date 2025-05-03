import { View, Text, ScrollView, Modal, TouchableOpacity } from 'react-native'
import React, { ReactNode } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { styles } from "../styles/style";
import { COLORS } from '@/assets/constatns/theme';

interface ModalProps {
    visible: boolean;
    children: ReactNode;
    onRequestClose: () => void;
    transparent?: boolean;
    animationType?: 'none' | 'slide' | 'fade';
    customBackdrop?: ReactNode;
    title: string;
    subTitle: string;
    lang: string;
  }

const Result: React.FC<ModalProps> = ({
    visible,
    children,
    onRequestClose,
    transparent = false,
    animationType = 'none',
    customBackdrop,
    title,
    subTitle,
    lang,
  }) => {
  return (
    <Modal
        visible={visible}
        style={[styles.container,{justifyContent: 'flex-start',}]}
        animationType="slide" // or 'fade', 'none'
        transparent={true} // optional, for a transparent background
        onRequestClose={onRequestClose} // handle back button on Android
    >
        <View style={[styles.contentContainer, {paddingTop: 40, paddingBottom:30, borderRadius: 10}]}>
            <View style={[styles.header, { backgroundColor: COLORS.background }]}>
            <TouchableOpacity onPress={onRequestClose}>
                <Text style={[styles.subtitle, { fontSize: 16, height: 40, top: 5, fontWeight: 400, color: COLORS.primary }]}>{lang==='ID'?'Selesai':'Done'}</Text>
            </TouchableOpacity>
            <View style={{ width: 28 }} />
            </View>
            <View style={[styles.resultContainer, {  }]}>
                <Text style={[styles.title, { fontSize: 24, marginBottom: 0, paddingBottom: 0 }]}>{title}</Text>
                <Text style={[styles.subtitle, { fontSize: 16 }]}>{subTitle}</Text>
                <ScrollView contentContainerStyle={[styles.scrollContent, {flexGrow: 1}]}
                        bounces={false}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps='handled'
                        contentOffset={{ x: 0, y: 0 }} >
                    {children}
                </ScrollView>
            </View>
        </View>
    
    </Modal>
  )
}

export default Result;