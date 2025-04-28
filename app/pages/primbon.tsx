import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { styles } from '@/styles/style'
import { COLORS } from '@/assets/constatns/theme';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import * as cheerio from 'cheerio';
import Icon from "react-native-vector-icons/FontAwesome";
import Loader from '@/components/Loader';
import Result from '@/components/Result';
import { translate } from '@/utils/Translate';

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
    const [loveImg, setLoveImg] = useState('');
    const [topic, setTopic] = useState(0);
    const [result, setResult] = useState<string[]>([]);
    const [viewTopic, setViewTopic] = useState(true);
    const [viewResult, setViewResult] = useState(false);
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(true);
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        name: props.user?.fullname || '',
        birthday: props.user?.birthday || new Date(),
        birthplace: props.user?.birthplace || '',
        dream: '',
        partner: '',
    });

    const handleChange = (key:string,value:any) => {
        setData({
            ...data,
            [key]:value
        })
    }
    
    const onChange = (event: any, selectedDate: Date | undefined) => {
        const currentDate = selectedDate || date;
        // setShowPicker(false);
        setDate(currentDate);
        setText(currentDate.toLocaleDateString()); //Format date as needed
    };

    const generate = async () => {
        let $;
        let body;
        let htmlString;
        let transletContent;
        let content
        setLoading(true);
        
        try {
            switch (topic) {
                case 1:
                    const res = await fetch(`https://www.primbon.com/arti_nama.php?nama1=${data.name}&proses=+Submit%21+`, {
                        method: "GET",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        // body: JSON.stringify(data)
                    })
        
                    htmlString = await res.text();
                    $ = cheerio.load(htmlString);
                    body = $("#body").text().split("Nama:")[0];
                    content = body.replace("ARTI NAMA", "").replace("                                ", "")
                                    .replace("(adsbygoogle = window.adsbygoogle || []).push({});","")
                                    .replace(/\n/,"").trimStart().split(/\n/gi)
                                    
                    transletContent = await translate(body.replace("ARTI NAMA", "").replace("                                ", "")
                                            .replace("(adsbygoogle = window.adsbygoogle || []).push({});","")
                                            .replace(/\n/,"").trimStart().replace(/\n/gi,''),'id','en');
                    setResult(props.lang === 'ID' ? content : transletContent);
                    break;
                case 2:
                    const transParam = await translate(data.dream,'auto','id');
                    const params = transParam.join(' ');
                    const res2 = await fetch(`https://www.primbon.com/tafsir_mimpi.php?mimpi=${params}&submit=+Submit+`, {
                        method: "GET",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        // body: JSON.stringify(data)
                    });
                    htmlString = await res2.text();
                    $ = cheerio.load(htmlString);
                    body = $("#body > font > i").text();
                    if (!(/Tidak ditemukan/g.test(body))) {
                        content = $("#body")
                            .text()
                            .split(`Solusi - Menanggulangi akibat dari tafsir mimpi yang buruk`)[0]
                            .split(`Hasil pencarian untuk kata kunci: ${params}`)[1]
                            .replaceAll(".",".\n")
                            .trimStart().split(/\n/gi)
                        transletContent = await translate($("#body")
                            .text()
                            .split(`Solusi - Menanggulangi akibat dari tafsir mimpi yang buruk`)[0]
                            .split(`Hasil pencarian untuk kata kunci: ${params}`)[1]
                            .replaceAll(".",". ")
                            .trimStart(),'id','en');
                    } else {
                        content = [`Tidak ditemukan tafsir mimpi ${params}. Cari dengan kata kunci yang lain..`]
                        transletContent = [`No interpretation of the dream of ${params}. Search with other keywords..`]
                    }
                    
                    setResult(props.lang === 'ID' ? content : transletContent);
                    break;
                case 3:
                    const res3 = await fetch(`https://www.primbon.com/kecocokan_nama_pasangan.php?nama1=${data.name}&nama2=${data.partner}&proses=+Submit%21+`, {
                        method: "GET",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        // body: JSON.stringify(data)
                    });
                    htmlString = await res3.text();
                    $ = cheerio.load(htmlString);
                    setLoveImg('https://www.primbon.com/' + $('#body > img').attr('src'));
                    body = $('#body').text().split(data.partner)[1];
                    content = [((props.lang==='ID'?'Nama: ':'Name: ')+data.name), ((props.lang==='ID'?'Pasangan: ':'Partner: ')+data.partner),'']
                    if (props.lang==='ID') {
                        content.push(body.split('Sisi Negatif Anda: ')[0]+'. ')
                        content.push('Sisi Negatif Anda: '+$('#body').html()?.split('<img border="0"')[0].split('Sisi Negatif Anda:')[1].replaceAll('<br>','').replaceAll('</b>','')+'. ')
                        const bodyHtml = $('#body')?.html();
                        content.push(bodyHtml ? bodyHtml.split('&lt; Hitung Kembali')[0].split('png"><br><br>')[1]?.split('<a href="')[0].replaceAll('<br>','').replaceAll('</b>','') || '' : '');
                        
                        setResult(content);
                    } else  {
                        const bodyHtml = $('#body')?.html();
                        
                        transletContent = await translate(body.split('Sisi Negatif Anda: ')[0]+'. '+
                                            'Sisi Negatif Anda: '+$('#body').html()?.split('<img border="0"')[0].split('Sisi Negatif Anda:')[1].replaceAll('<br>','').replaceAll('</b>','')+'. '+
                                            (bodyHtml ? bodyHtml?.split('&lt; Hitung Kembali')[0].split('png"><br><br>')[1]?.split('<a href="')[0].replaceAll('<br>','').replaceAll('</b>','') || '' : ''),'id','en')
                        
                                            content.push(...transletContent);
                        setResult(content);
                    }

                    break
                default:
                    break;
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
                {[1,3].includes(topic)?
                    <><Text style={[styles.labelInput, {  }]}>{props.lang === 'ID' ? 'Nama :':'Name :'}</Text>
                    <TextInput 
                        placeholder={props.lang === 'ID' ? 'Masukan Nama':'Input Name'}
                        placeholderTextColor={COLORS.grey}
                        style={[styles.input, {width: 250}]} 
                        value={data.name}
                        onChangeText={(value)=>handleChange('name',value)}
                    /></>:null
                }
                {[2].includes(topic)?
                    <><Text style={[styles.labelInput, {  }]}>{props.lang === 'ID' ? 'Mimpi :':'Dream :'}</Text>
                    <TextInput 
                        placeholder={props.lang === 'ID' ? 'Masukan Mimpi':'Input Dream'}
                        placeholderTextColor={COLORS.grey}
                        style={[styles.input, {width: 250}]} 
                        value={data.dream}
                        onChangeText={(value)=>handleChange('dream',value)}
                    /></>:null
                }
                {[3].includes(topic)?
                    <><Text style={[styles.labelInput, {  }]}>{props.lang === 'ID' ? 'Pasangan :':'Partner :'}</Text>
                    <TextInput 
                        placeholder={props.lang === 'ID' ? 'Masukan Nama Pasangan':'Input Partner Name'}
                        placeholderTextColor={COLORS.grey}
                        style={[styles.input, {width: 250}]} 
                        value={data.partner}
                        onChangeText={(value)=>handleChange('partner',value)}
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
                
                <Result visible={viewResult} onRequestClose={() => setViewResult(false)} title={'Primbon'} 
                    subTitle={topics.filter(a => a.key === topic)[0]?.[(props.lang==='ID'?'topicID':'topicEN')] || ''}>
                    {result.map((a, i) => (
                        <Text key={i} style={[styles.resultText, { textAlign: 'justify' }]}>{a.trimStart()}</Text>
                    ))}
                    {topic==3?
                        <View style={{padding:10}}>
                            <Image style={{width: '90%', height: 55, backgroundColor:COLORS.background}} source={{uri:loveImg}}></Image>
                        </View>
                    :null}
                </Result>
            </View>
        }
    </View>
  )
}