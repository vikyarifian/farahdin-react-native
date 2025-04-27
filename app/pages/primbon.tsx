import { View, Text, TextInput, TouchableOpacity, Button } from 'react-native'
import React, { useState } from 'react'
import { styles } from '@/styles/style'
import { COLORS } from '@/assets/constatns/theme';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import * as cheerio from 'cheerio';
import Icon from "react-native-vector-icons/FontAwesome";
import Loader from '@/components/Loader';

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
    const [loading, setLoading] = useState(false);
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

    const generate = async () => {
        let url = ""
        let mtd = "POST"

        setLoading(true);
        try {
            switch (topic) {
                case 1:
                    url = `https://www.primbon.com/arti_nama.php?nama1=${data.name}&proses=+Submit%21+`
                    mtd = "GET"
                    break;
                default:
                    break;
            }

            const res = await fetch(url, {
                method: mtd,
                headers: {
                    'Content-Type': 'application/json',
                },
                // body: JSON.stringify(data)
            })

            const htmlString = await res.text();
            const $ = cheerio.load(htmlString);
            const isi = $("#body").text().split("Nama:")[0];
            const result = isi.replace(/\n/gi, "").replace("ARTI NAMA", "").replace("                                ", "").replace("(adsbygoogle = window.adsbygoogle || []).push({});","")
            console.log("res "+result)
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        } catch (error) {
            console.error("Error fetching or parsing:", error);
            setLoading(false);
        }
    }

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
                    <><Text style={[styles.labelInput, {  }]}>{props.lang === 'ID' ? 'Nama :':'Name :'}</Text>
                    <TextInput 
                        placeholder='Input Name'
                        placeholderTextColor={COLORS.grey}
                        style={[styles.input, {width: 250}]} 
                        value={data.name}
                    /></>:null
                }
                <Text style={[styles.labelInput, {  }]}>{props.lang === 'ID' ? 'Tanggal Lahir :':'Birthdate :'}</Text>
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
                <Text style={[styles.labelInput, {  }]}>{props.lang === 'ID' ? 'Tempat Lahir :':'Birthplace :'}</Text>
                <TextInput 
                    placeholder='Input Birthplace'
                    placeholderTextColor={COLORS.grey}
                    style={[styles.input, {width: 250}]} 
                    value={data.birthplace}
                />
                <TouchableOpacity disabled={loading} style={styles.button} onPress={() => generate()}>
                    <View style={{ width: 90, height: 20, justifyContent: 'center'}}>
                        {loading ? 
                            <Loader size={'medium'} width={80} color={COLORS.white} style={{ width: 80, top: 5,height: 20, alignSelf: 'center' }} /> 
                        : 
                            <Text style={{ color: 'black', alignSelf: 'center', fontSize: 18, fontWeight: 500}} >{(props.lang === 'ID' ?'Mulai':'Generate')}</Text>
                        }
                    </View>
                </TouchableOpacity>
            </View>
        }
    </View>
  )
}