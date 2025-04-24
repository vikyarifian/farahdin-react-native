import AsyncStorage from '@react-native-async-storage/async-storage';

export const setItem = async (key: string, value: any): Promise<void> => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('Error setting item:', error);
    }
};

export const getItem = async (key: string): Promise<any | null> => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value != null ? JSON.parse(value) : null;
    } catch (error) {
        console.error('Error getting item:', error);
        return null;
    }
};