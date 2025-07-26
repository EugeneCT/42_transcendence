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
        let players = [];
        players.push(document.getElementById('player1').value);
        players.push(document.getElementById('player2').value);
        players.push(document.getElementById('player3').value);
        players.push(document.getElementById('player4').value);
        if (players.indexOf('') === -1) {
            showModal(pongModal);
            selectGame('pong', mode, players);
        }
    });
    snakeButton.addEventListener('click', () => {
        showModal(snakeModal);
        // selectGame('snake');
    });
});
