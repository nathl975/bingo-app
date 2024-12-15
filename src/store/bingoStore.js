import {createStore} from 'vuex';

export default createStore({
    state() {
        return {
            gameStarted: window.localStorage.getItem('gameState') !== null,
            currentNumber: window.localStorage.getItem('gameState') ? JSON.parse(window.localStorage.getItem('gameState')).currentNumber : null,
            numbersDrawn: window.localStorage.getItem('gameState') ? JSON.parse(window.localStorage.getItem('gameState')).numbersDrawn : [],
        };
    },
    getters: {
        currentNumber(state) {
            return state.currentNumber;
        },
        numbersDrawn(state) {
            return state.numbersDrawn;
        },
        numbersDrawnCount(state) {
            return state.numbersDrawn.length;
        },
        isNumberDrawn(state) {
            return (number) => {
                return state.numbersDrawn.includes(number);
            };
        },
        currentNumberWithLetter(state) {
            const letters = ['B', 'I', 'N', 'G', 'O'];
            if (state.currentNumber >= 1 && state.currentNumber <= 75) {
                const index = Math.floor((state.currentNumber - 1) / 15);
                return letters[index] + state.currentNumber;
            }

            return state.currentNumber;
        },
        isGameStarted(state) {
            return state.gameStarted;
        },
        hasNumbersDrawn(state) {
            return state.numbersDrawn.length > 0;
        }
    },
    mutations: {
        addNumber(state, number) {
            state.currentNumber = number;

            state.numbersDrawn.push(number);

            window.localStorage.setItem('gameState', JSON.stringify({
                'currentNumber': state.currentNumber,
                'numbersDrawn': state.numbersDrawn,
            }));
        },
        startGame(state) {
            window.localStorage.setItem('gameState', JSON.stringify({
                'currentNumber': null,
                'numbersDrawn': [],
            }));

            state.gameStarted = true;
        },
        resetGame(state) {
            window.localStorage.clear();

            state.gameStarted = false;
            state.currentNumber = null;
            state.numbersDrawn = [];
        }
    },
    actions: {
        drawNumber({ commit, state }) {
            let number;
            do {
                number = Math.floor(Math.random() * 75) + 1;
            } while (state.numbersDrawn.includes(number));

            commit('addNumber', number);
        },
        resetGame({ commit }) {
            commit('resetGame');
        },
        startGame({ commit }) {
            commit('startGame');
        }
    }
});