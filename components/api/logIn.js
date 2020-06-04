import { localhost } from '../localhost';

const logIn = (email, password) => (
    fetch(`http://${localhost}/rest/s1/pop/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ "username":email, "password":password })
    })
    .then(res => res.json())
    .catch(err => console.log(err))
);

export default logIn;
