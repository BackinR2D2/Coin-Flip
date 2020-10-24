const logout = document.querySelectorAll('.button')[2]
logout.addEventListener('click', (e) => {
    e.preventDefault()
    fetch('/logout', {
        method: 'DELETE'
    })
        .then((resp) => resp.json())
        .then((result) => {
            if (result.msg === 'OK') {
                window.location.href = '/login'
            }
        })
        .catch((err) => {
            swal("Oops!", "Something went wrong! Try again please", "error");
        })
})