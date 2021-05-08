import AsyncStorage from '@react-native-async-storage/async-storage';

export const setAppStorage = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        throw error;
    }
};

export const getAppStorage = async (key) => {
    try {
        return await AsyncStorage.getItem(key);
    } catch (error) {
        throw error;
    }
};

export const removeAppStorage = async () => {
    try {
        await AsyncStorage.clear();
    } catch (error) {
        throw error;
    }
};

export const removeAppStorageByKey = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
        return true;
    } catch (error) {
        throw error;
    }
};
