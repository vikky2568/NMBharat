import getToken from './getToken';
import { localhost } from '../localhost';
const addShippingAddress = (firstName, address1, country, state, city, postalCode, contactNumber) => (
    getToken()
            .then(token =>
    fetch(`http://${localhost}/rest/s1/pop/customer/shippingAddresses`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'api_key': token
        },
        body: JSON.stringify({ "toName":firstName,
        "countryGeoId":country,
        "address1":address1,
        "city": city,
        "stateProvinceGeoId":state,
        "postalCode":postalCode,
        "contactNumber":contactNumber})
    })
        .then(res => res.json())
        .catch(() => [])
)
);
export default addShippingAddress;
