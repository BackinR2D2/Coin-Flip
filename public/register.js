const registerBtn = document.querySelector('button[type=submit]')
const username = document.querySelector('input')
const email = document.querySelectorAll('input')[1]
const password = document.querySelectorAll('input')[2]
registerBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const user = {
        username: username.value,
        email: email.value,
        password: password.value
    }
    fetch('/register', {
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
            if (result.msg === 'Updated') {
                window.location.href = '/login'
                return
            } else {
                swal("Oops!", `${result.msg}`, "error");
            }
        })
        .catch((err) => {
            swal("Oops!", "Something went wrong, Try again please.", "error");
        })
})