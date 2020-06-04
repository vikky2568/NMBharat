

const search = (key) => (
    fetch(``, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        }
    })
        .then(res => res.json())
        .catch(() => console.log('No data'))
);

export default search;
