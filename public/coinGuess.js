const saveBtn = document.querySelectorAll('button')[2]
const restartBtn = document.querySelectorAll('button')[3]
const gameBtns = document.querySelectorAll('.gameBtn')
const scoreElement = document.querySelector('#score')
let score = Number(scoreElement.innerText)
const heads = document.querySelector('.heads')
const tails = document.querySelector('.tails')
const card = document.querySelector('.card')
const front = document.querySelector('img')
const back = document.querySelector('#tails')
const headBtn = document.querySelector('.headBtn')
const tailBtn = document.querySelector('.tailBtn')

gameBtns.forEach((gameBtn) => {
    gameBtn.addEventListener('click', function () {
        const options = ['heads', 'tails']
        const index = Math.floor(Math.random() * 2)
        const value = options[index]
        let playerChoice = this.innerText.toLowerCase()
        if (value === 'heads') {
            card.classList.toggle('flipped')
            setTimeout(() => {
                front.setAttribute('src', 'coin_heads.png')
                back.setAttribute('src', 'coin_tails.png')
            }, 400);
            setTimeout(() => {
                headBtn.style.pointerEvents = 'auto'
                tailBtn.style.pointerEvents = 'auto'
            }, 1200)
            headBtn.style.pointerEvents = 'none'
            tailBtn.style.pointerEvents = 'none'
        } else {
            card.classList.toggle('flipped')
            setTimeout(() => {
                front.setAttribute('src', 'coin_tails.png')
                back.setAttribute('src', 'coin_heads.png')
            }, 400);
            setTimeout(() => {
                tailBtn.style.pointerEvents = 'auto'
                headBtn.style.pointerEvents = 'auto'
            }, 1200)
            tailBtn.style.pointerEvents = 'none'
            headBtn.style.pointerEvents = 'none'
        }
        if (playerChoice === value) {
            setTimeout(() => {
                setScore('win')
                updateScore()
            }, 1200)
        } else {
            setTimeout(() => {
                setScore('lose')
                updateScore()
            }, 1200)
        }
    })
})

function updateScore() {
    fetch('/guess-coin', {
        method: 'PATCH',
        body: JSON.stringify({
            score: score
        }),
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then((resp) => resp.json())
        .then((result) => {
            scoreElement.textContent = result
        })
        .catch((err) => {
            console.log(err)
        })
}

function setScore(situation) {
    if (situation === 'win') {
        score += 25
        scoreElement.textContent = score
    } else if (situation === 'lose') {
        score -= 25
        scoreElement.textContent = score
        if (score < 0) {
            score = 0
            scoreElement.textContent = score
        }
    }
}
