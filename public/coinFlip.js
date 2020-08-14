let headScore = Number(document.querySelector('.heads').innerText)
let tailScore = Number(document.querySelector('.tails').innerText)
const heads = document.querySelector('.heads')
const tails = document.querySelector('.tails')
const btn = document.querySelector('#flip')
const card = document.querySelector('.card')
const front = document.querySelector('img')
const back = document.querySelector('#tails')
btn.addEventListener('click', () => {
    const options = ['heads', 'tails']
    const index = Math.floor(Math.random() * 2)
    let value = options[index]
    if (value === 'tails') {
        card.classList.toggle('flipped')
        front.setAttribute('src', 'coin_tails.png')
        back.setAttribute('src', 'coin_heads.png')
        setTimeout(() => {
            btn.style.pointerEvents = 'auto'
            tailScore += 1
            tails.textContent = tailScore
        }, 1200)
        btn.style.pointerEvents = 'none'
    } else if (value === 'heads') {
        card.classList.toggle('flipped')
        front.setAttribute('src', 'coin_heads.png')
        back.setAttribute('src', 'coin_tails.png')
        setTimeout(() => {
            btn.style.pointerEvents = 'auto'
            headScore += 1
            heads.textContent = headScore
        }, 1200)
        btn.style.pointerEvents = 'none'
    }

})