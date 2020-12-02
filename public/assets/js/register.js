'use strict'
const registerForm = document.getElementById('register');
const username = registerForm.username;
const email = registerForm.email;
const password = registerForm.pass;

registerForm.onsubmit = (e) => {
    e.preventDefault();
    const url = 'http://localhost:5000/login';
    const registerBody = {
        username: username.value,
        email: email.value,
        pass: password.value,
    }
    let res = fetch(url,{
        method: "POST",
        headers: {
            'content-type': "application/json",
        },
        body: JSON.stringify(registerBody)
    })
    res.then(res => {
        window.location.replace(res.url);
    })
}