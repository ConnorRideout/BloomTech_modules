// 👉 TASK 1 - Understand the existing code 👈
function moduleProject2() {
    // 👇 WORK WORK BELOW THIS LINE 👇
    let startTime = new Date().getTime() // Record start time

    function getTimeElapsed() { // To be used at end of game to get elapsed time
        let currentTime = new Date().getTime()
        return (currentTime - startTime) / 1000
    }

    // Setting up the footer content
    let footer = document.querySelector('footer')
    let currentYear = new Date().getFullYear()
    footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

    let keys = { // To easily check `event.key` on keyboard events
        space: ' ',
        up: 'ArrowUp',
        right: 'ArrowRight',
        down: 'ArrowDown',
        left: 'ArrowLeft',
    }

    // Helper function to grab all squares
    const getAllSquares = () => document.querySelectorAll('.square')

    // Populating the grid with rows and squares
    for (let n = 0; n < 5; n++) {
        // Creating the rows
        let row = document.createElement('div')
        document.querySelector('#grid').appendChild(row)
        row.classList.add('row')
        // Creating the squares
        for (let m = 0; m < 5; m++) {
            let square = document.createElement('div')
            square.classList.add('square')
            row.appendChild(square)
            square.addEventListener('click', (evt) => {
                // 👉 TASK 2 - Use a click handler to target a square 👈
                let oldSelected = document.querySelector('.targeted')
                if (evt.currentTarget !== oldSelected) {
                    oldSelected.classList.remove('targeted')
                    evt.currentTarget.classList.add('targeted')
                }
            })
        }
    }
    document.querySelector('.row:nth-child(3)')
        .children[2].classList.add('targeted') // Initial square being targeted

    // Helper function to obtain 5 random indices (0-24) to put mosquitoes in
    function generateRandomIntegers() {
        let randomInts = []
        while (randomInts.length < 5) {
            let randomInt = Math.floor(Math.random() * 25)
            if (!randomInts.includes(randomInt)) {
                randomInts.push(randomInt)
            }
        }
        return randomInts
    }
    let allSquares = getAllSquares()
    generateRandomIntegers().forEach(randomInt => { // Puts live mosquitoes in 5 random squares
        let mosquito = document.createElement('img')
        mosquito.src = './mosquito.png'
        mosquito.style.transform = `rotate(${Math.floor(Math.random() * 359)}deg) scale(${Math.random() * 0.4 + 0.8})`
        mosquito.dataset.status = 'alive'
        allSquares[randomInt].appendChild(mosquito)
    })

    document.addEventListener('keydown', evt => {
        // 👉 TASK 3 - Use the arrow keys to highlight a new square 👈
        if (evt.key === keys.up) {
            let oldSelected = document.querySelector('.targeted')
            let idx = Array.from(oldSelected.parentElement.children).indexOf(oldSelected)
            let newRow = oldSelected.parentElement.previousElementSibling
            if (newRow) {
                let newSelected = newRow.children[idx]
                oldSelected.classList.remove('targeted')
                newSelected.classList.add('targeted')
            }
        } else if (evt.key === keys.down) {
            let oldSelected = document.querySelector('.targeted')
            let idx = Array.from(oldSelected.parentElement.children).indexOf(oldSelected)
            let newRow = oldSelected.parentElement.nextElementSibling
            if (newRow) {
                let newSelected = newRow.children[idx]
                oldSelected.classList.remove('targeted')
                newSelected.classList.add('targeted')
            }
        } else if (evt.key === keys.left) {
            let oldSelected = document.querySelector('.targeted')
            let newSelected = oldSelected.previousElementSibling
            if (newSelected) {
                oldSelected.classList.remove('targeted')
                newSelected.classList.add('targeted')
            }
        } else if (evt.key === keys.right) {
            let oldSelected = document.querySelector('.targeted')
            let newSelected = oldSelected.nextElementSibling
            if (newSelected) {
                oldSelected.classList.remove('targeted')
                newSelected.classList.add('targeted')
            }
        } else if (evt.key === keys.space) {
            // 👉 TASK 4 - Use the space bar to exterminate a mosquito 👈
            let selected = document.querySelector('.targeted')
            let mosquito = selected.querySelector('img')
            if (mosquito && mosquito.getAttribute('data-status') === 'alive') {
                mosquito.setAttribute('data-status', 'dead')
                selected.style.backgroundColor = 'red'
                // 👉 TASK 5 - End the game 👈
                let livingMosquitos = document.querySelectorAll('img[data-status = alive]')
                if (!livingMosquitos.length) {
                    document.querySelector('p.info')
                        .textContent = `Extermination completed in ${getTimeElapsed()} seconds!`
                    let restartBtn = document.createElement('button')
                    document.querySelector('header h2').appendChild(restartBtn)
                    restartBtn.textContent = 'Restart'
                    restartBtn.addEventListener('click', () => location.reload())
                    restartBtn.focus()
                }
            }
        }
    })
    // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT MODIFY THE CODE BELOW
// ❗ DO NOT MODIFY THE CODE BELOW
// ❗ DO NOT MODIFY THE CODE BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject2 }
else moduleProject2()
