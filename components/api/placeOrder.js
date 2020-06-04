import getToken from './getToken';
import { localhost } from '../localhost';
const placeOrder = () => (
    getToken()
            .then(token =>
    fetch(`http://${localhost}/rest/s1/pop/cart/place`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'api_key': token
        },
    })
        .then(res => res.json())
        .catch((error) => console.log(error))
)
);
export default placeOrder;
