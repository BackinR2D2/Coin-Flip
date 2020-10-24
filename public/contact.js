const btn = document.querySelector('button')
const msg = document.querySelector('.msg')
btn.addEventListener('click', (e) => {
    e.preventDefault()
    const options = {
        title: document.querySelector('input').value,
        message: document.querySelector('textarea').value
    }

    if (options.message === '') {
        msg.textContent = 'Cannot send empty message'
        return setTimeout(() => {
            msg.textContent = ''
        }, 2000)
    } else {
        fetch('/contact', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                title: options.title,
                message: options.message
            })
        })
            .then((res) => res.json())
            .then((result) => {
                document.querySelector('input').value = ''
                document.querySelector('textarea').value = ''
                if (result.includes('OK') === true) {
                    swal("Thanks for the feedback!", "Email has been sent!", "success");
                } else {
                    swal("Oops!", "Something went wrong! Try again please", "error");
                }
            })
            .catch((err) => {
                swal("Oops!", "Something went wrong, Try again please.", "error");
            })
    }

})
