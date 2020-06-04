

const getCollection = (page) => (
    fetch(``, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
    })
        .then(res => res.json())
        .catch(() => [])
);
export default getCollection;
