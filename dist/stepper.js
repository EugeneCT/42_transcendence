"use strict";
function getElementById(id) {
    const element = document.getElementById(id);
    if (!element) {
        throw new Error(`Element with id "${id}" not found`);
    }
    return element;
}
class SinglePlayerManager {
    constructor() {
        this.playerNameInput = getElementById('playerNameInput');
        this.registerBtn = getElementById('registerBtn');
        this.step1Content = getElementById('step1Content');
        this.step2Content = getElementById('step2Content');
        this.step1Icon = getElementById('step1Icon');
        this.step2Icon = getElementById('step2Icon');
        this.welcomePlayerName = getElementById('welcomePlayerName');
        this.startGameBtn = getElementById('startGameBtn');
        this.gameCanvas = getElementById('gameCanvas');
        this.initializeEventListeners();
    }
    initializeEventListeners() {
        //this shit activates single player modal
        getElementById('singlePlayerBtn').addEventListener('click', () => {
            console.log('single player button clicked!');
            getElementById('gameModeSelection').classList.add('hidden');
            getElementById('singlePlayerStepper').classList.remove('hidden');
        });
        //this will initialize the back button
        getElementById('backToModes').addEventListener('click', () => {
            console.log('single player BACK BUTTON clicked!');
            getElementById('singlePlayerStepper').classList.add('hidden');
            getElementById('gameModeSelection').classList.remove('hidden');
        });
        //this is validation for player's name
        this.playerNameInput.addEventListener('input', () => {
            const name = this.playerNameInput.value.trim();
            this.registerBtn.disabled = name.length === 0;
        });
        this.registerBtn.addEventListener('click', () => {
            const playerName = this.playerNameInput.value.trim();
            console.log('Registering player: ', playerName);
            if (playerName) {
                this.updateStepToCompleted(this.step1Icon);
                this.updateStepToActive(this.step2Icon);
                this.step1Content.classList.add('hidden');
                this.step2Content.classList.remove('hidden');
                this.welcomePlayerName.textContent = playerName;
            }
        });
        this.startGameBtn.addEventListener('click', () => {
            console.log('starting game for: ', this.welcomePlayerName.textContent);
            getElementById('singlePlayerStepper').classList.add('hidden');
            this.gameCanvas.classList.remove('hidden');
        });
    }
    updateStepToCompleted(icon) {
        icon.classList.remove('bg-yellow-500', 'text-black');
        icon.classList.add('bg-green-500', 'text-white');
        icon.innerHTML = '✓';
    }
    updateStepToActive(icon) {
        icon.classList.remove('bg-gray-300', 'text-gray-600');
        icon.classList.add('bg-yellow-500', 'text-black');
        const parentElement = icon.parentElement;
        if (parentElement) {
            const lastSpan = parentElement.querySelector('span:last-child');
            if (lastSpan) {
                lastSpan.classList.remove('text-gray-400');
            }
        }
    }
}
document.addEventListener('DOMContentLoaded', () => {
    new SinglePlayerManager();
});
