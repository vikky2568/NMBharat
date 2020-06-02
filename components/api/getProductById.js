
const getProductByType = (id) => (
    fetch(`http://192.168.122.1:8080/rest/s1/pop/products/${id}`)
            .then(res => res.json())
            .catch(error => console.log(error))
);

export default getProductByType;
