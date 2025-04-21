import { Text, View, Image} from "react-native";
import { styles } from "../styles/style";

export default function Index() {
  return (
    <View
      style={styles.container}
    >
      <Image
        source={require("../assets/images/farahdin-1.jpg")}
        style={{ width: 100, height: 100 }}
      />
      <Text style={styles.title}>Hello</Text>
    </View>
  );
}
