import { AsyncStorage } from 'react-native';

const saveCustomerInfo = async (customerInfo) => {
    try {
        await AsyncStorage.setItem('@customerInfo', JSON.stringify(customerInfo));
    } catch (error) {
        console.log(error);
    }
};

export default saveCustomerInfo;
