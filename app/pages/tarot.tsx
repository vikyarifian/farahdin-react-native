import { View, Text, ImageBackground, TouchableOpacity, Image, Dimensions } from 'react-native'
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
    { key: 1, topicID: "Cinta", topicEN: "Love", numberCard: 22, icon: "heart-outline" },
    { key: 2, topicID: "Cinta Sejati", topicEN: "True Love", numberCard: 2, icon: "male-female-outline" },
    { key: 3, topicID: "Malaikat", topicEN: "Angel", numberCard: 22, icon: "eye-outline" },
    { key: 4, topicID: "Kehidupan Lampau", topicEN: "Past Lives", numberCard: 22, icon: "accessibility-outline" },
];


const shuffle = (number:number) => {
    const cards = Array.from({ length: 22 }, (_, i) => i + 1).sort(() => Math.random() - 0.5);
    return cards.slice(0, number);
} 
    
export default function tarot(props:any) {
    const [shuffleCard,setShuffleCard] = useState(shuffle(22));
    const [selectedCard, setSelectedCard] = useState(0);
    const [selectedPartnerCard, setSelectedPartnerCard] = useState(0);
    const [viewSelectedCard, setViewSelectedCard] = useState(0);
    const [viewSelectedPartnerCard, setViewSelectedPartnerCard] = useState(0);
    const [topic, setTopic] = useState(0);
    const [result, setResult] = useState<string[]>([]);
    const [viewTopic, setViewTopic] = useState(true);
    const [viewResult, setViewResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPicker, setShowPicker] = useState(true);
    const [date, setDate] = useState(new Date());
    const [data, setData] = useState({
        firstName: props.user?.fullname.split(' ')[0] || '',
    })
    
    const pickCard = async () => {
        if (selectedCard != 0 && topic != 2) {
            setViewResult(true);
            setShuffleCard(shuffle(22));
            setSelectedCard(0);
            setResult([]);
        } {
            if (selectedCard != 0 && selectedPartnerCard != 0) {
                setLoading(true)
                try {
                    let $;
                    let htmlString;
                    let translateContent;
                    let content
                    const formData = new FormData();
                    formData.append('CardNumber_1_numericalint', viewSelectedCard.toString());
                    formData.append('CardNumber_2_numericalint', viewSelectedPartnerCard.toString());

                    const res = await fetch(`https://www.horoscope.com/us/tarot/tarot-true-love.aspx`, {
                        method: "POST",
                        headers: {"Content-Type": "application/x-www-form-urlencoded",
                        },
                        body: formData
                    });

                    htmlString = await res.text();
                    $ = cheerio.load(htmlString);
                    content = $(".grid").text().split('Your Reading')[1].split('Is it true love')[0].trimStart();
                    
                    if (props.lang==='ID') {
                        translateContent = await translate(content,'en','id');
                        setResult(translateContent);
                    } else {
                        setResult(content.split('\n'))
                    }
                    setShuffleCard(shuffle(2));
                    setSelectedCard(0);
                    setSelectedPartnerCard(0);
                    setTimeout(() => {
                        setLoading(false);
                        setViewResult(true);
                    }, 10);
                } catch (error) {
                    console.log("Error fetching or parsing: ", error);
                    setLoading(false)
                }
            }
        }
    }

    const generate = async () => {
        let $;
        let body;
        let htmlString;
        let translateContent;
        let content
        setLoading(true);
        try {
            let $;
            let htmlString;
            let translateContent;
            let content
            let url;
            let split = ['. ','. ']
            const formData = new FormData();
            formData.append('CardNumber_1_numericalint', viewSelectedCard.toString());

            switch (topic) {
                case 1:
                    url = `https://www.horoscope.com/us/tarot/tarot-daily-love.aspx`
                    split = ['Daily Love Tarot Reading','True Love Tarot Reading']
                    break;
                case 3:
                    url = `https://www.horoscope.com/us/tarot/tarot-angel.aspx`
                    split = ['Angel Tarot Reading','Guardian Angel Tarot']
                    break;
                case 4:
                    url = `https://www.horoscope.com/us/tarot/tarot-past-lives.aspx`
                    split = ['Past Lives Tarot','Crystal Ball Tarot']
                    break;
                default:
                    url = `https://www.horoscope.com/us/tarot/tarot-daily-love.aspx`
                    split = ['Daily Love Tarot Reading','True Love Tarot Reading']
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
                       .split(split[1])[0].trimStart();
            
            if (props.lang==='ID') {
                translateContent = await translate(content,'en','id');
                setResult(translateContent);
            } else {
                setResult(content.split('\n'))
            }
            setShuffleCard(shuffle(22));
            setSelectedCard(0);
            setSelectedPartnerCard(0);
            setTimeout(() => {
                setLoading(false);
                setViewResult(true);
            }, 10);
        } catch (error) {
            console.log("Error fetching or parsing: ", error);
            setLoading(false)
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
                            onPress={()=>{setTopic(a.key);setViewTopic(false);setShuffleCard(shuffle(a.numberCard))}}
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
                <View style={[styles.inputSection, {padding:0, margin:0}]}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.title}>{topics.filter(a => a.key === topic)[0]?.[(props.lang==='ID'?'topicID':'topicEN')] || ''}</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={[styles.labelInput, { padding: 10 }]}>{(props.lang==='ID'?'Pilih Kartu':'Pick a Card')}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', top: 30, justifyContent: 'center', padding: 10 }}>
                        {shuffleCard.map((a,i) => (
                                <TouchableOpacity 
                                    key={a} 
                                    onPress={() => {
                                            if (topic != 2) {
                                                setSelectedCard(a)
                                                setViewSelectedCard(a);
                                            } else {
                                                setSelectedCard(i==0?a:selectedCard)
                                                setViewSelectedCard(i==0?a:selectedCard);
                                                setSelectedPartnerCard(i==1?a:selectedPartnerCard)
                                                setViewSelectedPartnerCard(i==1?a:selectedPartnerCard);
                                            }
                                        } 
                                    }
                                    style={{
                                        minHeight: (topic!=2?100:180), 
                                        width: (width * 0.9) / shuffleCard.length, 
                                        marginLeft: -1, 
                                        transform: [{ translateY: selectedCard === a && topic != 2 ? -30 : 0 }]
                                    }}
                                >
                                    <ImageBackground
                                        style={[styles.backgroundImage, { width: (topic!=2?60:100), maxHeight: (topic!=2?100:180), alignSelf: 'center' }]}
                                        source={{uri:(topic==2?(i==0?(selectedCard==0?'https://www.horoscope.com/images-US/tarot/back/true-love-your-card.png':`https://www.horoscope.com/images-US/tarot/card_150x285-Aquatic-Horoscope-${selectedCard}.jpg`)
                                                                    :(selectedPartnerCard==0?'https://www.horoscope.com/images-US/tarot/back/true-love-partners-card.png':`https://www.horoscope.com/images-US/tarot/card_150x285-Aquatic-Horoscope-${selectedPartnerCard}.jpg`)):
                                                    'https://www.horoscope.com/images-US/tarot/back/tarot-card.png')}} // Path to your image              
                                        resizeMode="contain"
                                        borderRadius={5}
                                    >
                                        {/* <Text style={{ color: COLORS.white, fontSize: 16, fontWeight: 'bold' }}>{a}</Text> */}
                                    </ImageBackground>
                                </TouchableOpacity>
                            ))}
                    </View>
                    <TouchableOpacity disabled={loading} style={[styles.button, { alignSelf: 'center', marginTop: 40 }]} onPress={() => pickCard()}>
                        <View style={{ width: 90, height: 20, justifyContent: 'center' }}>
                            {loading ? 
                                <Loader size={'medium'} width={80} color={COLORS.white} style={{ width: 80, top: 5, height: 20, alignSelf: 'center' }} /> 
                            : 
                                <Text style={{ color: 'black', alignSelf: 'center', fontSize: 18, fontWeight: '500' }}>
                                    {(props.lang === 'ID' ? (topic!=2?'Pilih':'Baca') : (topic!=2?'Pick':'Read'))}
                                </Text>
                            }
                        </View>
                    </TouchableOpacity>
                    <Result visible={viewResult} onRequestClose={() => setViewResult(false)} title={'Tarot'} 
                        subTitle={topics.filter(a => a.key === topic)[0]?.[(props.lang==='ID'?'topicID':'topicEN')] || ''}>
                        <View style={{padding:10,justifyContent:'flex-start'}}>
                            {
                                topic!=2?
                                    <Image style={{width: width*0.88, height: 200, resizeMode: 'contain', 
                                                    backgroundColor:COLORS.background
                                                }} 
                                        source={{uri:`https://www.horoscope.com/images-US/tarot/card_150x285-${topic==1?'Aquatic-Horoscope':(topic==3?'Angels-Horoscope':'PastLife-Horoscope')}-${viewSelectedCard}.jpg`}}/>
                                :
                                    <View style={{  alignSelf: 'center', flexDirection: 'row' }}>
                                        <Image style={{width: width*0.88/2, height: 200, resizeMode: 'contain', 
                                                        backgroundColor:COLORS.background
                                                    }} 
                                                    source={{uri:`https://www.horoscope.com/images-US/tarot/card_150x285-Aquatic-Horoscope-${viewSelectedCard}.jpg`}}/>
                                        <Image style={{width: width*0.88/2, height: 200, resizeMode: 'contain', 
                                                        backgroundColor:COLORS.background
                                                    }} 
                                                    source={{uri:`https://www.horoscope.com/images-US/tarot/card_150x285-Aquatic-Horoscope-${viewSelectedPartnerCard}.jpg`}}/>
                                    </View>
                            }
                            </View>
                        {result.length==0?
                            <TouchableOpacity disabled={loading} style={[styles.button, { alignSelf: 'center', marginTop: 20 }]} onPress={() => generate()}>
                            <View style={{ width: 90, height: 20, justifyContent: 'center' }}>
                                {loading ? 
                                    <Loader size={'medium'} width={80} color={COLORS.white} style={{ width: 80, top: 5, height: 20, alignSelf: 'center' }} /> 
                                : 
                                    <Text style={{ color: 'black', alignSelf: 'center', fontSize: 18, fontWeight: '500' }}>
                                        {(props.lang === 'ID' ? 'Baca Kartu' : 'Read Card')}
                                    </Text>
                                }
                            </View>
                        </TouchableOpacity>
                        :null}
                        {result.map((a, i) => (
                            <Text key={i} style={[styles.resultText, { textAlign: 'justify' }]}>{(a.trimStart().trimEnd()!=='.' && a.trimStart().trimEnd()!=='' && a.trimStart().trimEnd()!=='\n'?a.trimStart():'')}</Text>
                        ))}
                    </Result>

                </View>
            }
        </View>
    )
}