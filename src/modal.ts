import { selectGame } from "./menu.js";

document.addEventListener('DOMContentLoaded', () => {
    const pongButton: HTMLButtonElement = document.getElementById('pongButton') as HTMLButtonElement;
    const snakeButton: HTMLButtonElement = document.getElementById('snakeButton') as HTMLButtonElement;

    const pongModal: HTMLDivElement = document.getElementById('pongModal') as HTMLDivElement;
    const snakeModal: HTMLDivElement = document.getElementById('snakeModal') as HTMLDivElement;

    const closePongModal: HTMLButtonElement = document.getElementById('closePongModal') as HTMLButtonElement;
    const closeSnakeModal: HTMLButtonElement = document.getElementById('closeSnakeModal') as HTMLButtonElement;

    function showModal(modal: HTMLDivElement): void
    {
        modal.style.display = 'block';
    }

    function hideModal(modal: HTMLDivElement): void
    {
        modal.style.display = 'none';
    }

    // pongButton.addEventListener('click', (): void => {showModal(pongModal)});
    // snakeButton.addEventListener('click', (): void =>{showModal(snakeModal)})

    closePongModal.addEventListener('click', (): void => {hideModal(pongModal)});
    closeSnakeModal.addEventListener('click', (): void =>{hideModal(snakeModal)})
    

    pongButton.addEventListener('click', (): void => {
        const mode = (document.getElementById('gameMode') as HTMLInputElement).value;
        let players: string[] = [];
        players.push((document.getElementById('player1') as HTMLInputElement).value);
        players.push((document.getElementById('player2') as HTMLInputElement).value);
        players.push((document.getElementById('player3') as HTMLInputElement).value);
        players.push((document.getElementById('player4') as HTMLInputElement).value);

        if (players.indexOf('') === -1) {
            showModal(pongModal);
            selectGame('pong', mode as 'tournament' | 'ai' | '2v2', players);
        }
    });


    snakeButton.addEventListener('click', (): void => {
        showModal(snakeModal);
        // selectGame('snake');
    });


});
