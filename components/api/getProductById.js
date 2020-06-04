import { localhost } from '../localhost';

const getProductByType = (id) => (
    fetch(`http://${localhost}/rest/s1/pop/products/${id}`)
            .then(res => res.json())
            .catch(error => console.log(error))
);

export default getProductByType;
