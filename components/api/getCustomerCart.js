import getToken from './getToken';
import { localhost } from '../localhost';
const getCustomerCart = () => (
    getToken()
            .then(token =>
    fetch(`http://${localhost}/rest/s1/pop/cart/info`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'api_key': token
        },
    })
        .then(res => res.json())
        .catch(() => [])
)
);
export default getCustomerCart;
