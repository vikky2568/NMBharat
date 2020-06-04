import { localhost } from '../localhost';

const register = (firstName, lastName, email, password, rePassword) => (
    fetch(`http://${localhost}/rest/s1/pop/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ "firstName": firstName, "lastName": lastName, "emailAddress": email, "newPassword": password, "newPasswordVerify": rePassword })
    })
    .then(res => res.json())
);

export default register;
