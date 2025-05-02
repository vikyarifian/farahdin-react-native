import { View, Text, ImageBackground, TouchableOpacity, Image, Dimensions, TextInput } from 'react-native'
import React, { useState } from 'react'
import { styles } from '@/styles/style'
import { COLORS } from '@/assets/constatns/theme';
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import * as cheerio from 'cheerio';
import Loader from '@/components/Loader';
import Result from '@/components/Result';
import { translate } from '@/utils/Translate';

const { width, height } = Dimensions.get("window");

const topics = [
    { key: 1, topicID: "Umum", topicEN: "General", numberCard: 3, icon: "sparkles-outline" },
    { key: 2, topicID: "Cinta", topicEN: "Love", numberCard: 3, icon: "heart-outline" },
    { key: 3, topicID: "Karir", topicEN: "Career", numberCard: 3, icon: "briefcase-outline" },
    { key: 4, topicID: "Kesehatan", topicEN: "Health", numberCard: 3, icon: "medkit-outline" },
];

const shuffle = (number:number) => {
    const cards = Array.from({ length: 22 }, (_, i) => i + 1).sort(() => Math.random() - 0.5);
    return cards.slice(0, number);
} 

export default function clairvoyance(props:any) {
    
    const [topic, setTopic] = useState(0);
    const [result, setResult] = useState<string[]>([]);
    const [viewTopic, setViewTopic] = useState(true);
    const [viewResult, setViewResult] = useState(false);
    const [circleSize, setCircleSize] = useState(180);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
            name: props.user?.fullname || '',
            birthday: (props.user?.birthday==='NaN-NaN-NaN'?new Date():new Date(props.user?.birthday) || new Date()),
            firstName: props.user?.fullname.split(' ')[0]
    });

    const handleChange = (key: keyof typeof data, value: any) => {
        setData({
            ...data,
            [key]: value ? value : data[key]
        });
    }

    const generate = async () => {
        let $;
        let htmlString;
        let translateContent;
        let content;
        let url;
        let split = ['. ','. '];
        setLoading(true);

        try {
            let cards = shuffle(3);
            const formData = new FormData();
            formData.append('CardNumber_1_numericalint', cards[0].toString());
            formData.append('CardNumber_2_numericalint', cards[1].toString());
            formData.append('CardNumber_3_numericalint', cards[2].toString());
            formData.append('FirstName', data.name.split(' ')[0]);

            switch (topic) {
                case 1:
                    url = `https://www.horoscope.com/us/tarot/tarot-daily.aspx`
                    split = ['Your reading for Today:','2025 Tarot Reading']
                    break;
                default:
                    url = `https://www.horoscope.com/us/tarot/tarot-gems.aspx`
                    split = ['Gems Oracle',"Today's Tip:"]
                    break;
            }
            
            const res = await fetch(url, {
                method: "POST",
                headers: {"Content-Type": "application/x-www-form-urlencoded",
                },
                body: formData
            });

            htmlString = await res.text();
            $ = cheerio.load(htmlString);
            content = $(".grid").text().split(split[0])[1]
                        .split(split[1])[0].trimStart().trimEnd();
            
            switch (topic) {
                case 2:
                    content = content.split('Career: ')[0]
                    break;
                case 3:
                    content = content.replace('Career: ','Career:x Career: ').split('Career:x ')[1]
                                .split('Wellness: ')[0]
                    break;
                case 4:
                    content = content.replace('Wellness: ','Wellness:x Wellness: ').split('Wellness:x ')[1]
                    break;
                    
            }
            
            if (props.lang==='ID') {
                translateContent = await translate(content,'en','id');
                setResult(translateContent);
            } else {
                setResult(content.split('\n'))
            }
            // setTimeout(() => {
                setLoading(false);
                setViewResult(true);
            // }, 1);
        } catch (error) {
            console.log("Error fetching or parsing: ", error);
            setLoading(false);
        }
    }

    return (
        <View style={[styles.container, { height: 100}]}>
            {viewTopic?
                <>
                <Text style={styles.title}>{props.lang === 'ID' ? 'Pilih Topik':'Choose Topic'} : </Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', padding: 8, justifyContent: 'center', }}>
                    {topics?.map((a, i) => (
                        <TouchableOpacity 
                            onPress={()=>{setTopic(a.key);setViewTopic(false)}}
                            style={[styles.contentCard, { justifyContent: 'flex-start', alignItems: 'center', padding: 8, width: 150, height: 150 }]} key={i}>
                            <Text key={i} style={{ fontFamily: 'Ionicons', top: 25 }}>
                                <Ionicons name={a.icon as keyof typeof Ionicons.glyphMap} size={50} color={COLORS.primary} />
                            </Text>
                            <Text style={{ color: COLORS.white, textAlign: 'center', top: 35, fontSize: 18 }}>{(props?.lang === 'ID' ? a.topicID : a.topicEN)}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                </>
            :
                <><View style={[styles.inputSection, {height: 10, justifyContent: 'flex-start'}]}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.title}>{topics.filter(a => a.key === topic)[0]?.[(props.lang==='ID'?'topicID':'topicEN')] || ''}</Text>
                    </View>
                    <Text style={[styles.labelInput, {  }]}>{props.lang === 'ID' ? 'Nama :':'Name :'}</Text>
                        <TextInput 
                            placeholder={props.lang === 'ID' ? 'Masukan Nama':'Input Name'}
                            placeholderTextColor={COLORS.grey}
                            style={[styles.input, {width: 250}]} 
                            value={data.name}
                            onChangeText={(value)=>handleChange('name',value)}
                    />
                    <View style={[styles.inputSection, {height: 50, justifyContent: 'center' }]}>
                        <TouchableOpacity
                            onPressIn={() => {
                                let start = Date.now();
                                const interval = setInterval(() => {
                                    const elapsed = Date.now() - start;
                                    if (elapsed >= 5000) {
                                        clearInterval(interval);
                                        setCircleSize(180); // Reset to original size
                                        generate();
                                    } else {
                                        const newSize = 180 + 80 * Math.sin((elapsed / 5000) * Math.PI * 3);
                                        setCircleSize(newSize);
                                    }
                                }, 16); // Roughly 60 FPS
                            }}
                            onPressOut={() => setCircleSize(180)} // Reset size when released
                            style={{
                                width: circleSize,
                                height: circleSize,
                                borderRadius: circleSize / 2,
                                borderWidth: 1,
                                borderColor: COLORS.primary,
                                backgroundColor: 'transparent',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 10,
                                alignSelf: 'center',
                            }}
                        >
                            <MaterialCommunityIcons name={'crystal-ball'} size={60} color={COLORS.primary} />
                        </TouchableOpacity>
                    </View>
                </View>
                <Result visible={viewResult} onRequestClose={() => setViewResult(false)} title={props.lang === 'ID' ? 'Kewaskitaan':'Clairvoyance'} 
                    subTitle={topics.filter(a => a.key === topic)[0]?.[(props.lang==='ID'?'topicID':'topicEN')] || ''}>
                    {result.map((a, i) => (
                        <Text key={i} style={[styles.resultText, { textAlign: 'justify' }]}>{(a.trimStart().trimEnd()!=='.'?a.trimStart():'')}</Text>
                    ))}
                </Result>
                </>
            }
        </View>
    )
}