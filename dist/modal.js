"use strict";
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
snakeButton.addEventListener('click', () => {
    showModal(snakeModal);
    // Load snake game script dynamically
    const script = document.createElement('script');
    script.type = 'module';
    script.src = './dist/snake/main.js';
    document.head.appendChild(script);
});
pongButton.addEventListener('click', () => {
    showModal(pongModal);
    // Load pong game script dynamically
    const script = document.createElement('script');
    script.type = 'module';
    script.src = './dist/pong/main.js';
    document.head.appendChild(script);
});
