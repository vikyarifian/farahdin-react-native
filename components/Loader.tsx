import { View, ActivityIndicator } from 'react-native'
import { COLORS } from '@/assets/constatns/theme'

export default function Loader(size:any,width:any) {
  return (
    // <View
    //     style={{
    //         flex: 1,
    //         justifyContent: 'center',
    //         alignItems: 'center',
    //         // backgroundColor: COLORS.background
    //     }}
    // >
      <ActivityIndicator size={size} style={{width:width}} color={'black'} />
    // </View>
  )
}