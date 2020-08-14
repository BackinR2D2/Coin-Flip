const btn = document.querySelector('button')
const account = document.querySelector('.account')
const changeSection = document.querySelector('.change')
const cancel = document.querySelector('.cancel')
const changeBtn = document.querySelector('.changeBtn')
const usernameInp = document.querySelector('input')
const name = document.querySelector('.username')
const situation = document.querySelector('.situation')
const deleteBtn = document.querySelector('.deleteBtn')

btn.addEventListener('click', () => {
    account.style.display = 'none'
    changeSection.style.display = 'block'
})
cancel.addEventListener('click', () => {
    account.style.display = 'block'
    changeSection.style.display = 'none'
})
changeBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const username = usernameInp.value
    if (username.length <= 6) {
        usernameInp.value = ''
        return
    } else {
        fetch('/account', {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                username: username
            })
        })
            .then((resp) => resp.json())
            .then((result) => {
                if (result.message) {
                    situation.style.display = 'block'
                    situation.textContent = result.message
                    setTimeout(() => {
                        situation.style.display = 'none'
                    }, 3000)
                } else {
                    situation.style.display = 'block'
                    name.textContent = result
                    situation.textContent = 'Updated!'
                    setTimeout(() => {
                        situation.style.display = 'none'
                    }, 3000)
                }
            })
    }
})

deleteBtn.addEventListener('click', async (e) => {
    try {
        e.preventDefault()
        localStorage.setItem('score', 0)
        const deleteAcc = await fetch('/account', {
            method: 'DELETE',
        })
    } catch (error) {
        window.location.href = '/register'
    }

})