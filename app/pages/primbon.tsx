import { View, Text, TextInput, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { styles } from '@/styles/style'
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

const { width } = Dimensions.get("window");

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
    const [image, setImage] = useState('');
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
        birthday: (props.user?.birthday==='NaN-NaN-NaN'?new Date():new Date(props.user?.birthday) || new Date()),
        birthplace: props.user?.birthplace || '',
        dream: '',
        partner: '',
        date: new Date(),
    });

    const handleChange = (key: keyof typeof data, value: any) => {

        setData({
            ...data,
            [key]: value ? value : data[key]
        });
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

    const onChange = (key: string, selectedDate: Date | undefined) => {
        const currentDate = selectedDate || date;
        setData(({
            ...data,
            [key]:currentDate
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
                                    
                    translateContent = await translate(body.replace("ARTI NAMA", "").replace("                                ", "")
                                            .replace("(adsbygoogle = window.adsbygoogle || []).push({});","")
                                            .replace(/\n/,"").trimStart().replace(/\n/gi,''),'id','en');
                    setResult(props.lang === 'ID' ? content : translateContent);
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
                            .text().replace("(adsbygoogle = window.adsbygoogle || []).push({});","")
                            .split(`Solusi - Menanggulangi akibat dari tafsir mimpi yang buruk`)[0]
                            .split(`Hasil pencarian untuk kata kunci: ${params}`)[1]
                            .replaceAll(".",".\n")
                            .trimStart().split(/\n/gi)
                        translateContent = await translate($("#body")
                            .text().replace("(adsbygoogle = window.adsbygoogle || []).push({});","")
                            .split(`Solusi - Menanggulangi akibat dari tafsir mimpi yang buruk`)[0]
                            .split(`Hasil pencarian untuk kata kunci: ${params}`)[1]
                            .replaceAll(".",". ")
                            .trimStart(),'id','en');
                    } else {
                        content = [`Tidak ditemukan tafsir mimpi ${params}. Cari dengan kata kunci yang lain..`]
                        translateContent = [`No interpretation of the dream of ${params}. Search with other keywords..`]
                    }
                    
                    setResult(props.lang === 'ID' ? content : translateContent);
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
                    setImage('https://www.primbon.com/' + $('#body > img').attr('src'));
                    body = $('#body').text().split(data.partner)[1];
                    content = [((props.lang==='ID'?'Nama: ':'Name: ')+data.name), ((props.lang==='ID'?'Pasangan: ':'Partner: ')+data.partner),'']
                    if (props.lang==='ID') {
                        content.push(body.replace("(adsbygoogle = window.adsbygoogle || []).push({});","").split('Sisi Negatif Anda: ')[0]+'. ')
                        content.push('Sisi Negatif Anda: '+$('#body').html()?.replace("(adsbygoogle = window.adsbygoogle || []).push({});","")
                                    .split('<img border="0"')[0].split('Sisi Negatif Anda:')[1].replaceAll('<br>','').replaceAll('</b>','')+'. ')
                        const bodyHtml = $('#body')?.html();
                        content.push(bodyHtml ? bodyHtml.replace("(adsbygoogle = window.adsbygoogle || []).push({});","")
                                    .split('&lt; Hitung Kembali')[0].split('png"><br><br>')[1]?.split('<a href="')[0].replaceAll('<br>','')
                                    .replaceAll('</b>','') || '' : '');
                        
                        setResult(content);
                    } else  {
                        const bodyHtml = $('#body')?.html();
                        
                        translateContent = await translate(body.split('Sisi Negatif Anda: ')[0]+'. '+
                                            'Sisi Negatif Anda: '+$('#body').html()?.split('<img border="0"')[0].split('Sisi Negatif Anda:')[1]
                                                .replace("(adsbygoogle = window.adsbygoogle || []).push({});","").replaceAll('<br>','').replaceAll('</b>','')+'. '+
                                            (bodyHtml ? bodyHtml?.split('&lt; Hitung Kembali')[0].split('png"><br><br>')[1]?.split('<a href="')[0]
                                                .replace("(adsbygoogle = window.adsbygoogle || []).push({});","").replaceAll('<br>','').replaceAll('</b>','') || '' : ''),'id','en')
                        
                                            content.push(...translateContent);
                        setResult(content);
                    }
                    break
                case 4:
                    const res4 = await fetch(`https://www.primbon.com/tanggal_jadian_pernikahan.php?tgl=${data.date.getDate()}&bln=${data.date.getMonth()+1}&thn=${data.date.getFullYear()}&proses=+Submit%21+`, {
                        method: "GET",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        // body: JSON.stringify(data)
                    });

                    htmlString = await res4.text();
                    $ = cheerio.load(htmlString);
                    content = $("#body").text().replace("Karakteristik:", "\nKarakteristik:").replace("Hubungan", "\nHubungan")
                                .replace("(adsbygoogle = window.adsbygoogle || []).push({});","")
                                .replace(/< Hitung Kembali.*$/s, "").split('(adsbygoogle = window.adsbygoogle || []).push({});')[1]
                                .trimStart().replace(/^\s*\n/gm, ".. ").split('. ')
                    if (props.lang==='EN') {
                        translateContent = await translate(content.join('\n'), 'id', 'en')
                        setResult(translateContent);
                    } else {
                        setResult(content)
                    }

                    break
                case 5:
                    const formData = new FormData();
                    formData.append('nama1', data.name);
                    formData.append('tgl1', data.birthday.getDate().toString());
                    formData.append('bln1', (data.birthday.getMonth() + 1).toString());
                    formData.append('thn1', data.birthday.getFullYear().toString());
                    formData.append('nama2', data.partner);
                    formData.append('tgl2', data.date.getDate().toString());
                    formData.append('bln2', (data.date.getMonth() + 1).toString());
                    formData.append('thn2', data.date.getFullYear().toString());
                    formData.append('submit', " RAMALAN JODOH &#62;&#62; ");

                    const res5 = await fetch(`https://primbon.com/ramalan_jodoh.php`, {
                        method: "POST",
                        headers: {"Content-Type": "application/x-www-form-urlencoded",
                        },
                        body: formData
                    });
                    htmlString = await res5.text();
                    $ = cheerio.load(htmlString);
                    content = $('#body').text().replace(/^\s*\n/gm, "").replace(data.name, `\n${data.name}`).replace(/Tgl\. Lahir:/g, "\nTanggal Lahir:")
                                .replace(data.partner, `\n${data.partner}`).replace("Dibawah", "\n\nDibawah").replace(/1\. /g, "\n1. ")
                                .replace(/2\. /g, "\n2. ").replace(/3\. /g, "\n3. ").replace(/4\. /g, "\n4. ").replace(/5\. /g, "\n5. ")
                                .replace(/6\. /g, "\n6. ").replace(/7\. /g, "\n7. ").replace(/8\. /g, "\n8. ").replace(/9\. /g, "\n9. ")
                                .replace(/10\. /g, "\n10. ").replace(/\*/s, "\n\n*").replace(/< Hitung Kembali.*$/s, "")
                                .replace('Konsultasi Hari Baik Akad Nikah >>>','').replace('(adsbygoogle = window.adsbygoogle || []).push({});','')
                                .replace('RAMALAN JODOH','').trimStart().replaceAll('.[','\n [').replace('...','.').replace('..','.')
                                // console.log(content.replace('\n','.. ').split('. ').join('. '))
                    if (props.lang==='EN') {
                        translateContent = await translate(content.replace('\n','. .%.').split('.%.').join('. ').replace('...','.').replace('..','.'), 'id', 'en')
                        setResult(translateContent)
                    } else {
                        setResult(content.split('\n'))
                    }
                    break
                case 6:
                    const formData2 = new FormData();
                    formData2.append('tgl', data.birthday.getDate().toString());
                    formData2.append('bln', (data.birthday.getMonth() + 1).toString());
                    formData2.append('thn', data.birthday.getFullYear().toString());
                    formData2.append('submit', " Submit! ");

                    const res6 = await fetch(`https://primbon.com/rejeki_hoki_weton.php`, {
                        method: "POST",
                        headers: {"Content-Type": "application/x-www-form-urlencoded",
                        },
                        body: formData2
                    });
                    htmlString = await res6.text();
                    $ = cheerio.load(htmlString);
                    setImage('https://www.primbon.com/' + $('#body > span > img').attr('src'));
                    content = $('#body').text().replace(/^\s*\n/gm, "").replace("Hari Lahir:", "\nHari Lahir:")
                            .replace("(adsbygoogle = window.adsbygoogle || []).push({});","")
                            .replace("Seseorang", "\nSeseorang").replace("Fluktuasi", "\n\nFluktuasi")
                            .replace("Hover\n", "").replace(/< Hitung Kembali.*$/s, "")
                    if (props.lang==='EN') {
                        translateContent = await translate(content.replace('\n','. .%.').split('.%.').join('. ').replace('...','.').replace('..','.'), 'id', 'en')
                        setResult(translateContent)
                    } else {
                        setResult(content.split('\n'))
                    }
                    break
                case 7:
                    const formData3 = new FormData();
                    formData3.append('nama', data.name)
                    formData3.append('tgl', data.birthday.getDate().toString());
                    formData3.append('bln', (data.birthday.getMonth() + 1).toString());
                    formData3.append('thn', data.birthday.getFullYear().toString());
                    formData3.append('kirim', " Submit! ");

                    const res7 = await fetch(`https://primbon.com/kecocokan_nama.php`, {
                        method: "POST",
                        headers: {"Content-Type": "application/x-www-form-urlencoded",
                        },
                        body: formData3
                    });
                    htmlString = await res7.text();
                    $ = cheerio.load(htmlString);
                    content = $('#body').text().replace(/^\s*\n/gm, "").replace("Tgl. Lahir:", "\nTanggal Lahir:").replace(/< Hitung Kembali.*$/s, "")
                            .replace("(adsbygoogle = window.adsbygoogle || []).push({});","")
                    
                    if (props.lang==='EN') {
                        translateContent = await translate(content.replace('\n','. .%.').split('.%.').join('. ').replace('...','.').replace('..','.'), 'id', 'en')
                        setResult(translateContent)
                    } else {
                        setResult(content.split('\n'))
                    }
                    break
                case 8:
                    const formData4 = new FormData();
                    formData4.append('tgl', data.birthday.getDate().toString());
                    formData4.append('bln', (data.birthday.getMonth() + 1).toString());
                    formData4.append('thn', data.birthday.getFullYear().toString());
                    formData4.append('submit', " Submit! ");

                    const res8 = await fetch(`https://primbon.com/petung_hari_baik.php`, {
                        method: "POST",
                        headers: {"Content-Type": "application/x-www-form-urlencoded",
                        },
                        body: formData4
                    });
                    htmlString = await res8.text();
                    $ = cheerio.load(htmlString);
                    content = $('#body').text().replace(/^\s*\n/gm, "").replace("Kamarokam", "Kamarokam\n")
                            .replace(data.birthday.getFullYear().toString(), `${data.birthday.getFullYear().toString()}\n`)
                            .replace("Tgl.", "Tanggal")
                            .replace(/< Hitung Kembali.*$/s, "").replace("(adsbygoogle = window.adsbygoogle || []).push({});","")
                    
                    if (props.lang==='EN') {
                        translateContent = await translate(content.replace('\n','. .%.').split('.%.').join('. ').replace('...','.').replace('..','.'), 'id', 'en')
                        setResult(translateContent)
                    } else {
                        setResult(content.split('\n'))
                    }
                    break
                case 9:
                    const formData5 = new FormData();
                    formData5.append('tgl', data.birthday.getDate().toString());
                    formData5.append('bln', (data.birthday.getMonth() + 1).toString());
                    formData5.append('thn', data.birthday.getFullYear().toString());
                    formData5.append('kirim', " Submit! ");

                    const res9 = await fetch(`https://primbon.com/hari_sangar_taliwangke.php`, {
                        method: "POST",
                        headers: {"Content-Type": "application/x-www-form-urlencoded",
                        },
                        body: formData5
                    });
                    htmlString = await res9.text();
                    $ = cheerio.load(htmlString);
                    body = $('#body').text().replace(/^\s*\n/gm, "").replace("Watak", "\nWatak").replace("Kamarokam", "Kamarokam\n")
                            .replace(data.birthday.getFullYear().toString(), `${data.birthday.getFullYear().toString()}\n`)
                            .replace(/< Hitung Kembali.*$/s, "").replace("(adsbygoogle = window.adsbygoogle || []).push({});","")
                            .replace('Termasuk hari','\nTermasuk hari').replace('\n =',' =',)
                    content = body.split('Untuk mengetahui watak hari, masukkan:')[0]+'\n'+
                                body.replace('Referensi','Referensi refrensii').split(' refrensii')[1].split('Catatan:')[0].replace(': Kitab Primbon Jawa','*Referensi: Kitab Primbon Jawa')
                    
                    if (props.lang==='EN') {
                        translateContent = await translate(content.replace('\n','. .%.').split('.%.').join('. ').replace('...','.').replace('..','.'), 'id', 'en')
                        setResult(translateContent)
                    } else {
                        setResult(content.split('\n'))
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
                    {[1,3,5,7].includes(topic)?
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
                    {[5,6,7].includes(topic)?
                        <>
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
                        </>
                    :null}
                    {[3,5].includes(topic)?
                        <><Text style={[styles.labelInput, {  }]}>{props.lang === 'ID' ? 'Pasangan :':'Partner :'}</Text>
                        <TextInput 
                            placeholder={props.lang === 'ID' ? 'Masukan Nama Pasangan':'Input Partner Name'}
                            placeholderTextColor={COLORS.grey}
                            style={[styles.input, {width: 250}]} 
                            value={data.partner}
                            onChangeText={(value)=>handleChange('partner',value)}
                        /></>:null
                    }
                    {[4,5,8,9].includes(topic)?
                        <>
                        <Text style={[styles.labelInput, {  }]}>{props.lang === 'ID' ? ([4,8,9].includes(topic)?'Tanggal :':'Tanggal Lahir Pasangan :'):([4,8,9].includes(topic)?'Date :':'Partner Birthdate :')}</Text>
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
                        </>
                        :null
                    }
                    {/* <Text style={[styles.labelInput, {  }]}>{props.lang === 'ID' ? 'Tempat Lahir :':'Birthplace :'}</Text>
                    <TextInput 
                        placeholder='Input Birthplace'
                        placeholderTextColor={COLORS.grey}
                        style={[styles.input, {width: 250}]} 
                        value={data.birthplace}
                    /> */}
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
                            <Text key={i} style={[styles.resultText, { textAlign: 'justify' }]}>{(a.trimStart().trimEnd()!=='.'?a.trimStart():'')}</Text>
                        ))}
                        {[3,6].includes(topic) ?
                            <View style={{padding:10,justifyContent:'flex-start'}}>
                                <Image style={{width: width*0.9, height: 250, resizeMode: 'contain', backgroundColor:COLORS.background}} source={{uri:image}}></Image>
                            </View>
                        :null}
                    </Result>
                </View>
            }
        </View>
    )
}