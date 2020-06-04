

const getOrderHistory = (token) => (
    fetch(``, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ token })
    })
        .then(res => res.json())
        .catch(err => console.log(err))
);
export default getOrderHistory;
