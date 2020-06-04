import { AsyncStorage } from 'react-native';

const getCart = async () => {
    try {
        const arrCart = await AsyncStorage.getItem('@MyCart');
        return arrCart !== null ? JSON.parse(arrCart) : [];
    } catch (error) {
        return [];
    }
};

export default getCart;