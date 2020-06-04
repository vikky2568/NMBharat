import { AsyncStorage } from 'react-native';

const getCustomerInfo = async () => {
    try {
        const customerInfo = await AsyncStorage.getItem('@customerInfo');
        return customerInfo !== null ? JSON.parse(customerInfo) : [];
    } catch (error) {
        return [];
    }
};

export default getCustomerInfo;
