import { View, Text, Button, Modal, TouchableOpacity } from 'react-native'
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
  }

const CustomModal: React.FC<ModalProps> = ({
    visible,
    children,
    onRequestClose,
    transparent = false,
    animationType = 'none',
    customBackdrop,
    title,
  }) => {
  return (
    <Modal
        visible={visible}
        style={[styles.container,{justifyContent: 'flex-start',}]}
        animationType="none" // or 'fade', 'none'
        transparent={true} // optional, for a transparent background
        onRequestClose={onRequestClose} // handle back button on Android
    >
    <View style={[styles.contentContainer, {paddingTop: 40, borderRadius: 10}]}>
        <View style={[styles.header, { backgroundColor: COLORS.background }]}>
          <TouchableOpacity onPress={onRequestClose}>
              <Ionicons name='arrow-back' size={22} color={COLORS.primary}/>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{title}</Text>
          <View style={{ width: 28 }} />
        </View>
        <View style={{ flex: 1, backgroundColor: COLORS.background, padding: 10, borderRadius: 10, }}>
            {children}
        </View>
    </View>
    
    </Modal>
  )
}

export default CustomModal;