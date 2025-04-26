import { View, Text,TextInput } from 'react-native'
import React, { useState } from 'react'
import { styles } from '@/styles/style'
import { COLORS } from '@/assets/constatns/theme';
import { SelectList } from 'react-native-dropdown-select-list';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

const primbonOption = [
    {key:1, value:"Arti nama"}, 
    {key:2, value:"Tafsir Mimpi"},
    {key:3, value:"Jodoh"},
    {key:4, value:"Tanggal Jadi"},
    {key:5, value:"Ramalan Jodoh"},
    {key:6, value:"Rejeki Weton"},
    {key:7, value:"Kecocokan Nama"},
    {key:8, value:"Hari Baik"},
    {key:9, value:"Hari Larangan"}
]
export default function primbon() {
  const [selectedValue, setSelectedValue] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(true);
      const [text, setText] = useState('');

      const onChange = (event: any, selectedDate: Date | undefined) => {
        const currentDate = selectedDate || date;
        // setShowPicker(false);
        setDate(currentDate);
        setText(currentDate.toLocaleDateString()); //Format date as needed
      };

      const showDatepicker = () => {
        setShowPicker(true);
      };
  return (
    <View style={[styles.container, { }]}>
        <View style={styles.inputSection}>
            {/* <SelectList 
                data={primbonOption}
                setSelected={setSelectedValue}
                onSelect={() => console.log(selectedValue)}
                boxStyles={{borderRadius: 5, backgroundColor: COLORS.white}}
                dropdownStyles={{borderRadius: 5, backgroundColor: COLORS.white}}
            />
            <Text style={[styles.title, {  }]}>Selected: {selectedValue}</Text> */}
            {/* <Text style={[styles.title, {  }]}>Select:</Text>
            <Picker style={[styles.input, {}]}
                selectedValue={selectedValue}
                onValueChange={(item, index) =>
                    setSelectedValue(item)
                }
            >
                {primbonOption.map((item, index) => (
                    <Picker.Item key={index} style={[styles.input, {color:COLORS.white}]} label={item.value} value={item.key.toString()} />
                ))}
            </Picker> */}
            {/* <View style={{ marginTop: 10 }}>
                {["Arti Nama", "Tafsir Mimpi", "Jodoh", "Tanggal Jadi", "Ramalan Jodoh", "Rejeki Weton", "Kecocokan Nama", "Hari Baik", "Hari Larangan"].map((item, index) => (
                <Text key={index} style={{ padding: 5, textAlign: 'left' }}>
                    {item}
                </Text>
                ))}
            </View> */}
            <Text style={[styles.labelInput, {  }]}>Name :</Text>
            <TextInput 
                placeholder='Input Name'
                placeholderTextColor={COLORS.grey}
                style={[styles.input, {width: 250}]} 
            />
            <Text style={[styles.labelInput, {  }]}>Birthdate :</Text>
            {showPicker && (
                <DateTimePicker
                    style={[styles.input, {borderWidth: 0, padding: 0, marginLeft: -10 }]}
                    aria-labelledby='white'
                    aria-label='white'
                    textColor={COLORS.white}
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                    accentColor={COLORS.primary}
                />
            )}
            <Text style={[styles.labelInput, {  }]}>Birthplace :</Text>
            <TextInput 
                placeholder='Input Birthplace'
                placeholderTextColor={COLORS.grey}
                style={[styles.input, {width: 250}]} 
            />
        </View>
    </View>
  )
}