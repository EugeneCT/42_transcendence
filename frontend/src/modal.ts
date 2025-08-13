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


snakeButton.addEventListener('click', (): void => {
    showModal(snakeModal);
    
    // // Load snake game script dynamically
    // const script = document.createElement('script');
    // script.type = 'module';
    // script.src = './dist/snake/main.js';
    // document.head.appendChild(script);
});

pongButton.addEventListener('click', (): void => {
    showModal(pongModal);
    
    // // Load pong game script dynamically
    // const script = document.createElement('script');
    // script.type = 'module';
    // script.src = './dist/pong/main.js';
    // document.head.appendChild(script);
});
