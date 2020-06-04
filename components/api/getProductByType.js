

const getProductByType = (typeId, page) => (
    fetch(``, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
    })
        .then(res => res.json())
        .catch(err => console.log(err))
);

export default getProductByType;
