import { AsyncStorage } from 'react-native';

const removeToken = async () => {
    try {
        await AsyncStorage.removeItem('@token');
    } catch (error) {
        console.log(error);
    }
};

export default removeToken;
