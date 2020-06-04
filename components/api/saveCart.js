import { localhost } from '../localhost';

const saveCart = (productId, quantity, currencyUomId, productStoreId) => (
    fetch(`http://${localhost}/rest/s1/pop/cart/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ "productId": productId, "quantity": quantity, "currencyUomId": currencyUomId, "productStoreId": productStoreId })
    })
    .then(res => res.json())
);

export default saveCart;
