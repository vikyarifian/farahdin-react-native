import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { styles } from '@/styles/style'
import { COLORS } from '@/assets/constatns/theme';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

const topics = [
    { key: 1, topicID: "Arti nama", topicEN: "Name Meaning", icon: "finger-print" },
    { key: 2, topicID: "Tafsir Mimpi", topicEN: "Dream Interpretation", icon: "bed-outline" },
    { key: 3, topicID: "Jodoh", topicEN: "Match", icon: "heart-outline" },
    { key: 4, topicID: "Tanggal Jadi", topicEN: "Important Date", icon: "calendar-number-outline" },
    { key: 5, topicID: "Ramalan Jodoh", topicEN: "Soulmate Prediction", icon: "male-female-outline" },
    { key: 6, topicID: "Rejeki Weton", topicEN: "Weton Fortune", icon: "dice-outline" },
    { key: 7, topicID: "Kecocokan Nama", topicEN: "Name Compatibility", icon: "body-outline" },
    { key: 8, topicID: "Hari Baik", topicEN: "Good Day", icon: "sunny-outline" },
    { key: 9, topicID: "Hari Larangan", topicEN: "Prohibited Day", icon: "thunderstorm-outline" }
];

export default function primbon(props:any) {
    const [topic, setTopic] = useState(0);
    const [viewTopic, setViewTipic] = useState(true);
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(true);
    const [text, setText] = useState('');
    const [data, setData] = useState({
        name: props.user?.fullname || '',
        birthday: props.user?.birthday || new Date(),
        birthplace: props.user?.birthplace || '',
    })

    const onChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    // setShowPicker(false);
    setDate(currentDate);
    setText(currentDate.toLocaleDateString()); //Format date as needed
    };

  return (
    <View style={[styles.container, { }]}>
        {viewTopic?
            <>
            <Text style={styles.title}>{props.lang === 'ID' ? 'Pilih Topik':'Choose Topic'} : </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', padding: 8, justifyContent: 'center', }}>
                {topics?.map((a, i) => (
                    <TouchableOpacity 
                        onPress={()=>{setTopic(a.key);setViewTipic(false)}}
                        style={[styles.contentCard, { justifyContent: 'flex-start', alignItems: 'center', padding: 8 }]} key={i}>
                        <Text key={i} style={{ fontFamily: 'Ionicons', top: 14 }}>
                            <Ionicons name={a.icon as keyof typeof Ionicons.glyphMap} size={34} color={COLORS.primary} />
                        </Text>
                        <Text style={{ color: COLORS.white, textAlign: 'center', top: 18, fontSize: 12 }}>{(props?.lang === 'ID' ? a.topicID : a.topicEN)}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            </>
        :
            <View style={styles.inputSection}>
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.title}>{topics.filter(a => a.key === topic)[0]?.[(props.lang==='ID'?'topicID':'topicEN')] || ''}</Text>
                </View>
                {[1,2].includes(topic)?
                    <><Text style={[styles.labelInput, {  }]}>Name :</Text>
                    <TextInput 
                        placeholder='Input Name'
                        placeholderTextColor={COLORS.grey}
                        style={[styles.input, {width: 250}]} 
                        value={data.name}
                    /></>:null
                }
                <Text style={[styles.labelInput, {  }]}>Birthdate :</Text>
                {showPicker && (
                    <DateTimePicker
                        style={[styles.input, {borderWidth: 0, padding: 0, marginLeft: -10 }]}
                        aria-labelledby='white'
                        aria-label='white'
                        textColor={COLORS.white}
                        testID="dateTimePicker"
                        value={data.birthday}
                        mode="date"
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                        accentColor={COLORS.primary}
                    />
                )}
                <Text style={[styles.labelInput, {  }]}>Birthplace :</Text>
                <TextInput 
                    placeholder='Input Birthplace'
                    placeholderTextColor={COLORS.grey}
                    style={[styles.input, {width: 250}]} 
                    value={data.birthplace}
                />
            </View>
        }
    </View>
  )
}