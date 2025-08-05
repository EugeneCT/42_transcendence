interface Player {
    name: string;
}

interface Team {
    player1: string;
    player2: string;
}

interface TournamentPlayers {
    player1: string;
    player2: string;
    player3: string;
    player4: string;
}

function getElementById<T extends HTMLElement> (id: string): T {
    const element = document.getElementById(id) as T;
    if(!element) {
        throw new Error(`Element with id "${id}" not found`);   
    }
    return element;
}

class SinglePlayerManager {
    private playerNameInput: HTMLInputElement;
    private registerBtn: HTMLButtonElement;
    private step1Content: HTMLElement;
    private step2Content: HTMLElement;
    private step1Icon: HTMLElement;
    private step2Icon: HTMLElement;
    private welcomePlayerName: HTMLElement;
    private startGameBtn: HTMLButtonElement;
    private gameCanvas: HTMLElement;

    constructor() {
        this.playerNameInput = getElementById<HTMLInputElement>('playerNameInput');
        this.registerBtn = getElementById<HTMLButtonElement>('registerBtn');        
        this.step1Content = getElementById<HTMLElement>('step1Content');
        this.step2Content = getElementById<HTMLElement>('step2Content');
        this.step1Icon = getElementById<HTMLElement>('step1Icon');
        this.step2Icon = getElementById<HTMLElement>('step2Icon');
        this.welcomePlayerName = getElementById<HTMLElement>('welcomePlayerName');
        this.startGameBtn = getElementById<HTMLButtonElement>('startGameBtn');        
        this.gameCanvas = getElementById<HTMLElement>('gameCanvas');

        this.initializeEventListeners();
    }
    private initializeEventListeners(): void {
        //this shit activates single player modal
        getElementById<HTMLButtonElement>('singlePlayerBtn').addEventListener('click', () => {
            console.log('single player button clicked!');
            getElementById<HTMLElement>('gameModeSelection').classList.add('hidden');
            getElementById<HTMLElement>('singlePlayerStepper').classList.remove('hidden');
        });

        //this will initialize the back button
        getElementById<HTMLButtonElement>('backToModes').addEventListener('click', () => {
            console.log('single player BACK BUTTON clicked!');
            getElementById<HTMLElement>('singlePlayerStepper').classList.add('hidden');
            getElementById<HTMLElement>('gameModeSelection').classList.remove('hidden');
        });

        //this is validation for player's name
        this.playerNameInput.addEventListener('input', () => {
            const name: string = this.playerNameInput.value.trim();
            this.registerBtn.disabled = name.length === 0;
        });

        this.registerBtn.addEventListener('click', () => {
            const playerName: string = this.playerNameInput.value.trim();
            console.log('Registering player: ', playerName);
            if(playerName)
            {
                this.updateStepToCompleted(this.step1Icon);
                this.updateStepToActive(this.step2Icon);

                this.step1Content.classList.add('hidden');
                this.step2Content.classList.remove('hidden');

                this.welcomePlayerName.textContent = playerName;
            }
        });
        this.startGameBtn.addEventListener('click', () => {
            console.log('starting game for: ', this.welcomePlayerName.textContent);
            getElementById<HTMLElement>('singlePlayerStepper').classList.add('hidden');
            this.gameCanvas.classList.remove('hidden');
        });
    }
    private updateStepToCompleted(icon: HTMLElement) : void{
        icon.classList.remove('bg-yellow-500', 'text-black');
        icon.classList.add('bg-green-500', 'text-white');
        icon.innerHTML = '✓';
    } 

    private updateStepToActive(icon: HTMLElement) : void{
        icon.classList.remove('bg-gray-300', 'text-gray-600');
        icon.classList.add('bg-yellow-500', 'text-black');

        const parentElement = icon.parentElement;
        if(parentElement)
        {
            const lastSpan = parentElement.querySelector('span:last-child');
            if (lastSpan){
                lastSpan.classList.remove('text-gray-400');
            }
        }
    }
}



document.addEventListener('DOMContentLoaded', () => {
    new SinglePlayerManager();

});
