const screen = document.getElementById('screen')
const context = screen.getContext('2d')

function createGame() {
    const rocket = new Image()
    rocket.src = './images/rocket2.png'

    const state = {
        player: {rocket, x: 0, y: 0}
    }

    const acceptedMoves = {
        ArrowUp: function() {
            state.player.y -= 7
        },

        ArrowRight: function() {
            state.player.x += 7
        },

        ArrowDown: function() {
            state.player.y += 7
        },

        ArrowLeft: function() {
            state.player.x -= 7
        }
    }

    function movePlayer(command) {
        
        if (acceptedMoves[command.key]) {
            acceptedMoves[command.key]()
        }
    }

    return {
        rocket,
        state,
        movePlayer
    }
}

const game = createGame()

function createKeyboardListener() {
    const state = {
        observers: []
    }

    function subscribe(observerFunction) {
        state.observers.push(observerFunction)
    }

    function notifyAll(command) {
        for (const observerFunction of state.observers) {
            observerFunction(command)
        }
    }

    document.addEventListener('keydown', onKeydown)

    function onKeydown(information) {
        const key = information.key

        const command = {
            key
        }

        notifyAll(command)
    }

    return {
        subscribe
    }
}

const keyboardListener = createKeyboardListener()
keyboardListener.subscribe(game.movePlayer)

function renderScreen() {

    context.fillStyle = 'white'
    context.clearRect(0, 0, 500, 500)

    context.drawImage(game.state.player.rocket, game.state.player.x, game.state.player.y, 50, 50)

    requestAnimationFrame(renderScreen)
}

renderScreen()