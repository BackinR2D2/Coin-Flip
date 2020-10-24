const btn = document.querySelector('button')
const account = document.querySelector('.account')
const changeSection = document.querySelector('.change')
const cancel = document.querySelector('.cancel')
const changeBtn = document.querySelector('.changeBtn')
const usernameInp = document.querySelector('input')
const name = document.querySelector('.username')
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
                    swal("Oops!", "Username is taken.", "error");
                } else {
                    name.textContent = result;
                    usernameInp.value = '';
                    account.style.display = 'block';
                    changeSection.style.display = 'none';
                }
            })
            .catch(_ => {
                swal("Oops!", "Something went wrong, Try again please.", "error");
            })
    }
})

deleteBtn.addEventListener('click', async (e) => {
    swal({
        title: "Are you sure?",
        text: "Confirming further will permanently delete your account.",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then(async (willDelete) => {
            if (willDelete) {
                try {
                    e.preventDefault()
                    localStorage.setItem('score', 0)
                    const deleteAcc = await fetch('/account', {
                        method: 'DELETE',
                    })
                    if (deleteAcc.status === 200) {
                        window.location.href = '/register'
                    } else {
                        swal("Oops!", "Something went wrong! Try again please", "error");
                    }
                } catch (error) {
                    swal("Oops!", "Something went wrong! Try again please", "error");
                }
            }
        });

})