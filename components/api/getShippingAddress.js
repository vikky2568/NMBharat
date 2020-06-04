import getToken from './getToken';
import { localhost } from '../localhost';
const getShippingAddress = () => (
    getToken()
            .then(token =>
    fetch(`http://${localhost}/rest/s1/pop/customer/shippingAddresses`, {
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
export default getShippingAddress;
