import { View, Text, TextInput, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { styles } from '@/styles/style';
import { COLORS } from '@/assets/constatns/theme';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import * as cheerio from 'cheerio';
import Loader from '@/components/Loader';
import Result from '@/components/Result';
import { translate } from '@/utils/Translate';
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { zodiac } from '@/utils/Zodiac';
import { prop } from 'cheerio/lib/api/attributes';

const topics = [
    { key: 1, topicID: "Kemarin", topicEN: "Yesterday", icon: "arrow-back" },
    { key: 2, topicID: "Hari ini", topicEN: "Today", icon: "today-outline" },
    { key: 3, topicID: "Besok", topicEN: "Tomorrow", icon: "arrow-forward" },
    { key: 4, topicID: "Minggu ini", topicEN: "Weekly", icon: "calendar-outline" },
    { key: 5, topicID: "Bulan ini", topicEN: "Monthly", icon: "calendar-number-outline" },
    { key: 6, topicID: "Kecocokan", topicEN: "Match", icon: "heart-outline" },
];

export default function horoscope(props:any) {
    
    const [topic, setTopic] = useState(0);
    const [result, setResult] = useState<string[]>([]);
    const [viewTopic, setViewTopic] = useState(true);
    const [viewResult, setViewResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPicker, setShowPicker] = useState(true);
    const [date, setDate] = useState(new Date());
    const [data, setData] = useState({
        name: props.user?.fullname || '',
        birthday: (props.user?.birthday==='NaN-NaN-NaN'?new Date():new Date(props.user?.birthday) || new Date()),
        zodiac: props.user?.zodiac,
        date: new Date(),
        partnerZodiac: zodiac(`${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date().getDate().toString().padStart(2, '0')}`),
    })

    function zodiacNumber(zod: string): number {
        const zodiacSigns = [
            "aries", "taurus", "gemini", "cancer", "leo", "virgo",
            "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"
        ];

        const number = zodiacSigns.indexOf(zod.toLowerCase()) + 1;
        return number
    }

    const updateUser = useMutation(api.users.updateUser);

    React.useEffect(() => {
        const updateBirthday = async () => {
            if (props.user.birthday === undefined  || props.user.birthday === 'NaN-NaN-NaN' || new Date(props.user?.birthday).toLocaleString().trim() !== data.birthday.toLocaleString().trim()) {
                const formattedDate = `${data.birthday.getFullYear()}-${(data.birthday.getMonth() + 1).toString().padStart(2, '0')}-${data.birthday.getDate().toString().padStart(2, '0')}`;
                await updateUser({
                    username: props.user.username,
                    birthday: (formattedDate==='NaN-NaN-NaN'?`${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date().getDate().toString().padStart(2, '0')}`:formattedDate),
                    fullname: props.user.fullname || '',
                    email: props.user.email || '',
                    birthplace: props.user.birthplace || '',
                    gender: props.user.gender || '',
                    zodiac: zodiac(formattedDate)
                });
            }
        };
        updateBirthday();
    }, [data.birthday]);
    
    const handleChange = (key: keyof typeof data, value: any) => {
        setData({
            ...data,
            [key]: value
        });
    }
    
    const onChange = (key: string, selectedDate: Date | undefined) => {
        const currentDate = selectedDate || date;
        const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;      
        setData(({
            ...data,
            [key]:currentDate,
            zodiac: key==='birthday'?zodiac(formattedDate):data.zodiac,
            partnerZodiac: key==='date'?zodiac(formattedDate):data.partnerZodiac,
        }))
    };

    const generate = async () => {
        let $;
        let body;
        let htmlString;
        let translateContent;
        let content
        setLoading(true);

        try {
            switch (topic) {
                case 1:
                    const res = await fetch(`https://www.horoscope.com/us/horoscopes/general/horoscope-general-daily-yesterday.aspx?sign=${zodiacNumber(data.zodiac)}`, {
                        method: "GET",
                        // headers: {
                        //     'Content-Type': 'application/json',
                        // },
                    });

                    htmlString = await res.text();
                    $ = cheerio.load(htmlString);
                    content = $(".main-horoscope > p").text()//?.split('<!-- /horoscope-content -->')[0].split('<div class="horoscope-content">')[1];
                    if (props.lang==='ID') {
                        translateContent = await translate(content.split(' - ')[1],'en','id');
                        setResult(translateContent);
                    } else {
                        setResult(content.split(' - ')[1].split('\n'))
                    }
                break
                case 2:
                    const res2 = await fetch(`https://www.horoscope.com/us/horoscopes/general/horoscope-general-daily-today.aspx?sign=${zodiacNumber(data.zodiac)}`, {
                        method: "GET",
                        // headers: {
                        //     'Content-Type': 'application/json',
                        // },
                    });

                    htmlString = await res2.text();
                    $ = cheerio.load(htmlString);
                    content = $(".main-horoscope > p").text()//?.split('<!-- /horoscope-content -->')[0].split('<div class="horoscope-content">')[1];
                    if (props.lang==='ID') {
                        translateContent = await translate(content.split(' - ')[1],'en','id');
                        setResult(translateContent);
                    } else {
                        setResult(content.split(' - ')[1].split('\n'))
                    }
                break
                case 3:
                    const res3 = await fetch(`https://www.horoscope.com/us/horoscopes/general/horoscope-general-daily-tomorrow.aspx?sign=${zodiacNumber(data.zodiac)}`, {
                        method: "GET",
                        // headers: {
                        //     'Content-Type': 'application/json',
                        // },
                    });

                    htmlString = await res3.text();
                    $ = cheerio.load(htmlString);
                    content = $(".main-horoscope > p").text()//?.split('<!-- /horoscope-content -->')[0].split('<div class="horoscope-content">')[1];
                    if (props.lang==='ID') {
                        translateContent = await translate(content.split(' - ')[1],'en','id');
                        setResult(translateContent);
                    } else {
                        setResult(content.split(' - ')[1].split('\n'))
                    }
                break
                case 4:
                    const res4 = await fetch(`https://www.horoscope.com/us/horoscopes/general/horoscope-general-weekly.aspx?sign=${zodiacNumber(data.zodiac)}`, {
                        method: "GET",
                        // headers: {
                        //     'Content-Type': 'application/json',
                        // },
                    });

                    htmlString = await res4.text();
                    $ = cheerio.load(htmlString);
                    content = $(".main-horoscope > p").text()//?.split('<!-- /horoscope-content -->')[0].split('<div class="horoscope-content">')[1];
                    if (props.lang==='ID') {
                        translateContent = await translate(content.split(' - ')[1],'en','id');
                        setResult(translateContent);
                    } else {
                        setResult(content.split(' - ')[1].split('\n'))
                    }
                break
                case 5:
                    const res5 = await fetch(`https://www.horoscope.com/us/horoscopes/general/horoscope-general-monthly.aspx?sign=${zodiacNumber(data.zodiac)}`, {
                        method: "GET",
                        // headers: {
                        //     'Content-Type': 'application/json',
                        // },
                    });

                    htmlString = await res5.text();
                    $ = cheerio.load(htmlString);
                    content = $(".main-horoscope > p").text()//?.split('<!-- /horoscope-content -->')[0].split('<div class="horoscope-content">')[1];
                    if (props.lang==='ID') {
                        translateContent = await translate(content.split(' - ')[1],'en','id');
                        setResult(translateContent);
                    } else {
                        setResult(content.split(' - ')[1].split('\n'))
                    }
                break
                case 6:
                    console.log(`https://www.californiapsychics.com/blog/zodiac-sign-compatibility-blog/${data.zodiac.toLowerCase()}-${data.partnerZodiac.toLowerCase()}-compatibility.html`)
                    const res6 = await fetch(`https://www.californiapsychics.com/blog/zodiac-sign-compatibility-blog/${data.zodiac.toLowerCase()}-${data.partnerZodiac.toLowerCase()}-compatibility.html`, {
                        method: "GET",
                        // headers: {
                        //     'Content-Type': 'application/json',
                        // },
                    });

                    htmlString = await res6.text();
                    content = cheerio.load(htmlString.replaceAll('.</p>','.\n').replaceAll('</p>','\n')).text()
                                .replaceAll('</a>.','').replaceAll('</a>','').replaceAll('</div>','')
                                .split('Matters of the')[0].split('LJ Innes')[2]
                                .replace('</a></p></div></div></div>','').trimStart()
                    if (props.lang==='ID') {
                        translateContent = await translate(content,'en','id');
                        setResult(translateContent);
                    } else {
                        setResult(content.split('\n'))
                    }
                break
            }

            setTimeout(() => {
                setViewResult(true);
                setLoading(false);
            }, 10);
        } catch (error) {
            console.log("Error fetching or parsing: ", error);
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
                            onPress={()=>{setTopic(a.key);setViewTopic(false)}}
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
                            onChange={(event, selectedDate) => onChange('birthday', selectedDate)}
                            accentColor={COLORS.primary}
                        />
                    )}
                    <Text style={[styles.labelInput, {  }]}>{props.lang === 'ID' ? 'Zodiak :':'Zodiac :'}</Text>
                    <TextInput 
                        placeholderTextColor={COLORS.grey}
                        style={[styles.input, {width: 250}]} 
                        value={data.zodiac}
                        editable={false}
                    />
                    {[6].includes(topic)?
                        <>
                        <Text style={[styles.labelInput, {  }]}>{props.lang === 'ID' ? ('Tanggal Lahir Pasangan :'):('Partner Birthdate :')}</Text>
                        {showPicker && (
                            <DateTimePicker
                                style={[styles.input, {borderWidth: 0, padding: 0, marginLeft: -10 }]}
                                aria-labelledby='white'
                                aria-label='white'
                                textColor={COLORS.white}
                                testID="dateTimePicker"
                                value={data.date}
                                mode="date"
                                is24Hour={true}
                                display="default"
                                onChange={(event, selectedDate) => onChange('date', selectedDate)}
                                accentColor={COLORS.primary}
                            />
                        )}
                        
                        <Text style={[styles.labelInput, {  }]}>{props.lang === 'ID' ? 'Zodiak Pasangan :':'Partner Zodiac :'}</Text>
                        <TextInput 
                            placeholderTextColor={COLORS.grey}
                            style={[styles.input, {width: 250}]} 
                            value={data.partnerZodiac}
                            editable={false}
                        />
                        </>
                        :null
                    }
                    <TouchableOpacity disabled={loading} style={styles.button} onPress={() => generate()}>
                        <View style={{ width: 90, height: 20, justifyContent: 'center'}}>
                            {loading ? 
                                <Loader size={'medium'} width={80} color={COLORS.white} style={{ width: 80, top: 5,height: 20, alignSelf: 'center' }} /> 
                            : 
                                <Text style={{ color: 'black', alignSelf: 'center', fontSize: 18, fontWeight: 500}} >{(props.lang === 'ID' ?'Mulai':'Generate')}</Text>
                            }
                        </View>
                    </TouchableOpacity>
                    
                    <Result visible={viewResult} lang={props.lang} onRequestClose={() => setViewResult(false)} title={(props.lang === 'ID' ? 'Horoskop':'Horoscope') } 
                        subTitle={(topics.filter(a => a.key === topic)[0]?.[(props.lang==='ID'?'topicID':'topicEN')] || '')+' - '+data.zodiac+(topic==6?' & '+data.partnerZodiac:'')}>
                        {result.map((a, i) => (
                            <Text key={i} style={[styles.resultText, { textAlign: 'justify' }]}>{(a.trimStart().trimEnd()!=='.'?a.trimStart():'')}</Text>
                        ))}
                    </Result>
                </View>
            }
        </View>
    )
}