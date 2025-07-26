import { selectGame } from "./menu.js";
document.addEventListener('DOMContentLoaded', () => {
    const pongButton = document.getElementById('pongButton');
    const snakeButton = document.getElementById('snakeButton');
    const pongModal = document.getElementById('pongModal');
    const snakeModal = document.getElementById('snakeModal');
    const closePongModal = document.getElementById('closePongModal');
    const closeSnakeModal = document.getElementById('closeSnakeModal');
    function showModal(modal) {
        modal.style.display = 'block';
    }
    function hideModal(modal) {
        modal.style.display = 'none';
    }
    // pongButton.addEventListener('click', (): void => {showModal(pongModal)});
    // snakeButton.addEventListener('click', (): void =>{showModal(snakeModal)})
    closePongModal.addEventListener('click', () => { hideModal(pongModal); });
    closeSnakeModal.addEventListener('click', () => { hideModal(snakeModal); });
    pongButton.addEventListener('click', () => {
        const mode = document.getElementById('gameMode').value;
        const player1 = document.getElementById('player1').value;
        const player2 = document.getElementById('player2').value;
        const player3 = document.getElementById('player3').value;
        const player4 = document.getElementById('player4').value;
        if (player1 !== '' && player2 !== '' && player3 !== '' && player4 !== '') {
            console.log(`starting game mode: ${mode}`);
            console.log(`starting game: ${player1} vs ${player2}`);
            showModal(pongModal);
            selectGame('pong', mode);
        }
    });
    snakeButton.addEventListener('click', () => {
        showModal(snakeModal);
        // selectGame('snake');
    });
});
