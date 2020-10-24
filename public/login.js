const submitBtn = document.querySelector('button[type=submit]')
const username = document.querySelector('input')
const password = document.querySelectorAll('input')[1]
submitBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const user = {
        username: username.value,
        password: password.value
    }
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            username: user.username,
            password: user.password
        })
    })
        .then((resp) => resp.json())
        .then((result) => {
            if (result.msg === 'OK') {
                window.location.href = '/home'
                return
            } else {
                swal("Oops!", `${result.msg}`, "error");
            }
        })
        .catch((err) => {
            swal("Oops!", "Something went wrong, Try again please.", "error");
        })
})