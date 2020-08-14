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
                if (result.includes('OK') === false) {
                    msg.textContent = 'Invalid password for your email!'
                    setTimeout(() => {
                        msg.textContent = ''
                    }, 2000)
                } else {
                    msg.textContent = 'Email sent!'
                    setTimeout(() => {
                        msg.textContent = ''
                    }, 2000)
                }
            })
            .catch((err) => {
                msg.textContent = 'Error, I am sorry!'
                setTimeout(() => {
                    msg.textContent = ''
                }, 2000)
            })
    }

})
