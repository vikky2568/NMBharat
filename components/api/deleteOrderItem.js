import { localhost } from '../localhost';
const deleteOrderItem = (orderId, orderItemSeqId) => (
    fetch(`http://${localhost}/rest/s1/pop/cart/deleteOrderItem?orderId=${orderId}&orderItemSeqId=${orderItemSeqId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(res => res.json())
        .catch(error => console.log(error))
);
export default deleteOrderItem;
