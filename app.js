const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
let time = 0
let score = 0
const colors = ['#2C75FF', '#FFD700', '#A52A2A', '#CD853F', '#808080', '#C0C0C0']

startBtn.addEventListener('click', (event) => {
    event.preventDefault() // отменили хеш в адрс строке
    screens[0].classList.add('up')
})
//делегирование событий
timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt((event.target.getAttribute('data-time')))
        screens[1].classList.add('up')
        startGame(colors)
    }
})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})

function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
    //timeEl.innerHTML = `00:00 ${time}`
}

function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time
        if (current < 10) {
            current = `0${current}`
            // timeEl.innerHTML = `00:${current}`
        }
        setTime(current)
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`

}

function finishGame() {
    //timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Ваш счет: <span class="primary">${score}</span></h1>`
}

function createRandomCircle() {
    const circle = document.createElement('div')
    const size = getRandomNumber(10, 60)
    const {width, height} = board.getBoundingClientRect() // destructuring
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)
    //const index = getRandomColor()

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    //circle.style.color = `${index}`
    board.append(circle)

    circle.addEventListener('mouseover', setColor)
    circle.addEventListener('mouseleave', removeColor)
    board.append(circle)

    function setColor(element) {
        const color = getRandomColor()
        element.style.backgroundColor = color
        element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
    }

    function removeColor(element) {
        element.style.backgroundColor = '#1d1d1d'
        element.style.boxShadow = `0 0 2px #000`
    }

    function getRandomColor() {
        let index = [Math.floor(Math.random() * colors.length)]
        return colors[index]
    }
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

