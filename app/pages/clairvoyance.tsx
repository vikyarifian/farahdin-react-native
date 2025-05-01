import { View, Text, ImageBackground, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { styles } from '@/styles/style'
import { COLORS } from '@/assets/constatns/theme';
import { Ionicons } from '@expo/vector-icons';
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

export default function clairvoyance(props:any) {
    
    const [topic, setTopic] = useState(0);
    const [result, setResult] = useState<string[]>([]);
    const [viewTopic, setViewTopic] = useState(true);
    const [viewResult, setViewResult] = useState(false);
    const [circleSize, setCircleSize] = useState(150);
    return (
        <View style={[styles.container, { }]}>
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
                <><View style={[styles.inputSection, {height: 20, justifyContent: 'flex-start'}]}>
                    <View style={{ alignItems: 'center', }}>
                        <Text style={styles.title}>{topics.filter(a => a.key === topic)[0]?.[(props.lang==='ID'?'topicID':'topicEN')] || ''}</Text>
                    </View>
                </View>
                <View style={[styles.inputSection, {height: height*0.5, justifyContent: 'center'}]}>
                    <TouchableOpacity
                        onPressIn={() => {
                            let start = Date.now();
                            const interval = setInterval(() => {
                                const elapsed = Date.now() - start;
                                if (elapsed >= 5000) {
                                    clearInterval(interval);
                                    setCircleSize(150); // Reset to original size
                                } else {
                                    const newSize = 150 + 100 * Math.sin((elapsed / 5000) * Math.PI * 3);
                                    setCircleSize(newSize);
                                }
                            }, 16); // Roughly 60 FPS
                        }}
                        onPressOut={() => setCircleSize(150)} // Reset size when released
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
                        {/* <Text style={{ color: COLORS.white, fontSize: 18 }}>
                            {props.lang === 'ID' ? 'Tekan Saya' : 'Press Me'}
                        </Text> */}
                    </TouchableOpacity>
                </View>
                </>
            }
        </View>
    )
}