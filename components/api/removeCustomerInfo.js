import { AsyncStorage } from 'react-native';

const removeCustomerInfo = async () => {
    try {
        await AsyncStorage.removeItem('@customerInfo');
    } catch (error) {
        console.log(error);
    }
};

export default removeCustomerInfo;
