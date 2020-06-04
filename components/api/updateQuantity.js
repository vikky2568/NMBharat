import { localhost } from '../localhost';
const updateQuantity = (orderId, orderItemSeqId, quantity) => (
    fetch(`http://${localhost}/rest/s1/pop/cart/updateProductQuantity`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ "orderId": orderId, "orderItemSeqId": orderItemSeqId, "quantity": quantity })
    })
    .then(res => res.json())
    .catch(error => console.log(error))
);

export default updateQuantity;
