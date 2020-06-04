import { AsyncStorage } from 'react-native';

const addCart = async (arrCart) => {
    try {
        await AsyncStorage.setItem('@MyCart', JSON.stringify(arrCart));
    } catch (error) {
        console.log(error);
    }
};

export default addCart;