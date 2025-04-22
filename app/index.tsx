import { Text, View, Image, Button } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "../styles/style";
import React from "react";

export default function Index() {
  return (
    <View
      style={styles.container}
    >
      <Text style={[styles.title, {margin:10}]}>Hello, Farah Adillah</Text>
      <View style={{ width: '95%', height: 350 }}>
        <LinearGradient
          colors={['#ff7e5f', '#feb47b']}
          style={{ flex: 1, borderRadius: 5 }}
        >
          <Image
            source={require("../assets/images/farahdin-2.png")}
            style={{ width: '100%', height: '100%', borderRadius: 5, opacity: 0.95, }}
          />
        </LinearGradient>
        <Text style={[styles.title, { fontSize: 18, top: -120, textAlign: "center", fontWeight: '500' }]}>Live Chat</Text>
        <Text style={[styles.title, { fontSize: 12, top: -119, textAlign: "center", fontWeight: '300' }]}>Everything about your future and more...</Text>
        <View style={[styles.button,{ padding: 0, top: -90, width: '60%', height: 38, borderRadius: 10, alignSelf: "center" }]}>
          <Button
            title="Start Chat"
            onPress={() => console.log("Chat started")}
            color='black'            
          />
        </View>
      </View>
    </View>
  );
}
