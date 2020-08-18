const hideIcon = document.querySelector('ion-icon')
const passInp = document.querySelectorAll('input[name=password]')[0]
hideIcon.addEventListener('click', () => {
    if (passInp.getAttribute('type') === 'password') {
        passInp.setAttribute('type', 'text')
        hideIcon.setAttribute('name', 'eye-off-outline')
    } else {
        passInp.setAttribute('type', 'password')
        hideIcon.setAttribute('name', 'eye-outline')
    }
})