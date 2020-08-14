const submitBtn = document.querySelector('button[type=submit]')
const username = document.querySelector('input')
const email = document.querySelectorAll('input')[1]
const password = document.querySelectorAll('input')[2]
const situation = document.querySelector('.situation')
submitBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const user = {
        username: username.value,
        email: email.value,
        password: password.value,
    }
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            username: user.username,
            email: user.email,
            password: user.password
        })
    })
        .then((resp) => resp.json())
        .then((result) => {
            if (result.msg === 'OK') {
                window.location.href = '/home'
            } else {
                displayMsg(result.msg)
            }
        })
        .catch((err) => {
            displayMsg('Some error occured! We\'re sorry, try again later.')
        })
})

function displayMsg(msg) {
    situation.textContent = msg
    return setTimeout(() => {
        situation.textContent = ''
    }, 2000)
}