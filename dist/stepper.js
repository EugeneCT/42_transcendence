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
class TwoVsTwoManager {
    constructor() {
        this.player1Input = getElementById('player1Input');
        this.player2Input = getElementById('player2Input');
        this.player3Input = getElementById('player3Input');
        this.player4Input = getElementById('player4Input');
        this.registerTeamAbtn = getElementById('registerTeamAbtn');
        this.registerTeamBbtn = getElementById('registerTeamBbtn');
        this.TeamAcontent = getElementById('teamAcontent');
        this.TeamBcontent = getElementById('teamBcontent');
        this.start2V2content = getElementById('start2V2content');
        this.Team1Icon = getElementById('team1Icon');
        this.Team2Icon = getElementById('team2Icon');
        this.start2V2Icon = getElementById('start2V2Icon');
        this.teamAPlayer1 = getElementById('teamAPlayer1');
        this.teamAPlayer2 = getElementById('teamAPlayer2');
        this.teamBPlayer1 = getElementById('teamBPlayer1');
        this.teamBPlayer2 = getElementById('teamBPlayer2');
        this.start2v2GameBtn = getElementById('start2v2GameBtn');
        this.initializeEventListeners();
    }
    initializeEventListeners() {
        getElementById('twoVsTwoBtn').addEventListener('click', () => {
            console.log('2v2 clicked');
            getElementById('gameModeSelection').classList.add('hidden');
            getElementById('twoVersusTwoStepper').classList.remove('hidden');
        });
        getElementById('backToModesFrom2v2').addEventListener('click', () => {
            console.log('back to modes from 2v2 clicked');
            getElementById('twoVersusTwoStepper').classList.add('hidden');
            getElementById('gameModeSelection').classList.remove('hidden');
        });
        this.player1Input.addEventListener('input', () => this.validateTeamA());
        this.player2Input.addEventListener('input', () => this.validateTeamA());
        this.player3Input.addEventListener('input', () => this.validateTeamB());
        this.player4Input.addEventListener('input', () => this.validateTeamB());
        this.registerTeamAbtn.addEventListener('click', () => {
            console.log('Team A registered:', this.player1Input.value, this.player2Input.value);
            this.updateStepToCompleted(this.Team1Icon);
            this.updateStepToActive(this.Team2Icon);
            this.TeamAcontent.classList.add('hidden');
            this.TeamBcontent.classList.remove('hidden');
        });
        this.registerTeamBbtn.addEventListener('click', () => {
            console.log('Team B registered:', this.player3Input.value, this.player4Input.value);
            this.updateStepToCompleted(this.Team2Icon);
            this.updateStepToActive(this.start2V2Icon);
            this.TeamBcontent.classList.add('hidden');
            this.start2V2content.classList.remove('hidden');
            this.teamAPlayer1.textContent = this.player1Input.value;
            this.teamAPlayer2.textContent = this.player2Input.value;
            this.teamBPlayer1.textContent = this.player3Input.value;
            this.teamBPlayer2.textContent = this.player4Input.value;
        });
        this.start2v2GameBtn.addEventListener('click', () => {
            console.log('Starting 2v2 game!');
            console.log('Team A:', this.teamAPlayer1.textContent, this.teamAPlayer2.textContent);
            console.log('Team B:', this.teamBPlayer1.textContent, this.teamBPlayer2.textContent);
            getElementById('twoVersusTwoStepper').classList.add('hidden');
            getElementById('gameCanvas').classList.remove('hidden');
        });
    }
    validateTeamA() {
        const p1 = this.player1Input.value.trim();
        const p2 = this.player2Input.value.trim();
        const isValid = p1.length > 0 && p2.length > 0 && p1 !== p2;
        this.registerTeamAbtn.disabled = !isValid;
    }
    validateTeamB() {
        const p1 = this.player1Input.value.trim();
        const p2 = this.player2Input.value.trim();
        const p3 = this.player3Input.value.trim();
        const p4 = this.player4Input.value.trim();
        const isValid = p3.length > 0 && p4.length > 0 && p3 !== p4 && p3 !== p1 && p3 !== p2 && p4 !== p1 && p4 !== p2;
        this.registerTeamBbtn.disabled = !isValid;
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
    new TwoVsTwoManager();
});
