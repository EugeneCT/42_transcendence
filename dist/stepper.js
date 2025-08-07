var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { selectGame } from "./menu.js";
function getElementById(id) {
    const element = document.getElementById(id);
    if (!element) {
        throw new Error(`Element with id "${id}" not found`);
    }
    return element;
}
class SinglePlayerManager {
    constructor() {
        this.playerNameInput = getElementById("playerNameInput");
        this.registerBtn = getElementById("registerBtn");
        this.step1Content = getElementById("step1Content");
        this.step2Content = getElementById("step2Content");
        this.step1Icon = getElementById("step1Icon");
        this.step2Icon = getElementById("step2Icon");
        this.welcomePlayerName = getElementById("welcomePlayerName");
        this.startGameBtn = getElementById("startGameBtn");
        this.gameCanvas = getElementById("gameCanvas");
        this.initializeEventListeners();
    }
    initializeEventListeners() {
        //this shit activates single player modal
        getElementById("singlePlayerBtn").addEventListener("click", () => {
            console.log("single player button clicked!");
            getElementById("gameModeSelection").classList.add("hidden");
            getElementById("singlePlayerStepper").classList.remove("hidden");
        });
        //this will initialize the back button
        getElementById("backToModes").addEventListener("click", () => {
            console.log("single player BACK BUTTON clicked!");
            getElementById("singlePlayerStepper").classList.add("hidden");
            getElementById("gameModeSelection").classList.remove("hidden");
        });
        //this is validation for player's name
        this.playerNameInput.addEventListener("input", () => {
            const name = this.playerNameInput.value.trim();
            this.registerBtn.disabled = name.length === 0;
        });
        this.registerBtn.addEventListener("click", () => {
            const playerName = this.playerNameInput.value.trim();
            console.log("Registering player: ", playerName);
            if (playerName) {
                this.updateStepToCompleted(this.step1Icon);
                this.updateStepToActive(this.step2Icon);
                this.step1Content.classList.add("hidden");
                this.step2Content.classList.remove("hidden");
                this.welcomePlayerName.textContent = playerName;
            }
        });
        this.startGameBtn.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
            console.log("starting game for: ", this.welcomePlayerName.textContent);
            getElementById("singlePlayerStepper").classList.add("hidden");
            this.gameCanvas.classList.remove("hidden");
            const playerName = this.welcomePlayerName.textContent || "Player 1";
            yield selectGame('pong', 'ai', [playerName]);
        }));
    }
    updateStepToCompleted(icon) {
        icon.classList.remove("bg-yellow-500", "text-black");
        icon.classList.add("bg-green-500", "text-white");
        icon.innerHTML = "✓";
    }
    updateStepToActive(icon) {
        icon.classList.remove("bg-gray-300", "text-gray-600");
        icon.classList.add("bg-yellow-500", "text-black");
        const parentElement = icon.parentElement;
        if (parentElement) {
            const lastSpan = parentElement.querySelector("span:last-child");
            if (lastSpan) {
                lastSpan.classList.remove("text-gray-400");
            }
        }
    }
}
class TwoVsTwoManager {
    constructor() {
        this.player1Input = getElementById("player1Input");
        this.player2Input = getElementById("player2Input");
        this.player3Input = getElementById("player3Input");
        this.player4Input = getElementById("player4Input");
        this.registerTeamAbtn =
            getElementById("registerTeamAbtn");
        this.registerTeamBbtn =
            getElementById("registerTeamBbtn");
        this.TeamAcontent = getElementById("teamAcontent");
        this.TeamBcontent = getElementById("teamBcontent");
        this.start2V2content = getElementById("start2V2content");
        this.Team1Icon = getElementById("team1Icon");
        this.Team2Icon = getElementById("team2Icon");
        this.start2V2Icon = getElementById("start2V2Icon");
        this.teamAPlayer1 = getElementById("teamAPlayer1");
        this.teamAPlayer2 = getElementById("teamAPlayer2");
        this.teamBPlayer1 = getElementById("teamBPlayer1");
        this.teamBPlayer2 = getElementById("teamBPlayer2");
        this.start2v2GameBtn = getElementById("start2v2GameBtn");
        this.initializeEventListeners();
    }
    initializeEventListeners() {
        getElementById("twoVsTwoBtn").addEventListener("click", () => {
            console.log("2v2 clicked");
            getElementById("gameModeSelection").classList.add("hidden");
            getElementById("twoVersusTwoStepper").classList.remove("hidden");
        });
        getElementById("backToModesFrom2v2").addEventListener("click", () => {
            console.log("back to modes from 2v2 clicked");
            getElementById("twoVersusTwoStepper").classList.add("hidden");
            getElementById("gameModeSelection").classList.remove("hidden");
        });
        this.player1Input.addEventListener("input", () => this.validateTeamA());
        this.player2Input.addEventListener("input", () => this.validateTeamA());
        this.player3Input.addEventListener("input", () => this.validateTeamB());
        this.player4Input.addEventListener("input", () => this.validateTeamB());
        this.registerTeamAbtn.addEventListener("click", () => {
            console.log("Team A registered:", this.player1Input.value, this.player2Input.value);
            this.updateStepToCompleted(this.Team1Icon);
            this.updateStepToActive(this.Team2Icon);
            this.TeamAcontent.classList.add("hidden");
            this.TeamBcontent.classList.remove("hidden");
        });
        this.registerTeamBbtn.addEventListener("click", () => {
            console.log("Team B registered:", this.player3Input.value, this.player4Input.value);
            this.updateStepToCompleted(this.Team2Icon);
            this.updateStepToActive(this.start2V2Icon);
            this.TeamBcontent.classList.add("hidden");
            this.start2V2content.classList.remove("hidden");
            this.teamAPlayer1.textContent = this.player1Input.value;
            this.teamAPlayer2.textContent = this.player2Input.value;
            this.teamBPlayer1.textContent = this.player3Input.value;
            this.teamBPlayer2.textContent = this.player4Input.value;
        });
        this.start2v2GameBtn.addEventListener("click", () => {
            console.log("Starting 2v2 game!");
            console.log("Team A:", this.teamAPlayer1.textContent, this.teamAPlayer2.textContent);
            console.log("Team B:", this.teamBPlayer1.textContent, this.teamBPlayer2.textContent);
            getElementById("twoVersusTwoStepper").classList.add("hidden");
            getElementById("gameCanvas").classList.remove("hidden");
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
        const isValid = p3.length > 0 &&
            p4.length > 0 &&
            p3 !== p4 &&
            p3 !== p1 &&
            p3 !== p2 &&
            p4 !== p1 &&
            p4 !== p2;
        this.registerTeamBbtn.disabled = !isValid;
    }
    updateStepToCompleted(icon) {
        icon.classList.remove("bg-yellow-500", "text-black");
        icon.classList.add("bg-green-500", "text-white");
        icon.innerHTML = "✓";
    }
    updateStepToActive(icon) {
        icon.classList.remove("bg-gray-300", "text-gray-600");
        icon.classList.add("bg-yellow-500", "text-black");
        const parentElement = icon.parentElement;
        if (parentElement) {
            const lastSpan = parentElement.querySelector("span:last-child");
            if (lastSpan) {
                lastSpan.classList.remove("text-gray-400");
            }
        }
    }
}
class TournamentManager {
    constructor() {
        this.tournamentInputs = [
            getElementById("tournamentPlayer1Input"),
            getElementById("tournamentPlayer2Input"),
            getElementById("tournamentPlayer3Input"),
            getElementById("tournamentPlayer4Input"),
        ];
        this.registerButtons = [
            getElementById("registerTournamentPlayer1Btn"),
            getElementById("registerTournamentPlayer2Btn"),
            getElementById("registerTournamentPlayer3Btn"),
            getElementById("registerTournamentPlayer4Btn"),
        ];
        this.stepsContents = [
            getElementById("tournamentStep1Content"),
            getElementById("tournamentStep2Content"),
            getElementById("tournamentStep3Content"),
            getElementById("tournamentStep4Content"),
            getElementById("tournamentStep5Content"),
        ];
        this.stepIcons = [
            getElementById("tournament1Icon"),
            getElementById("tournament2Icon"),
            getElementById("tournament3Icon"),
            getElementById("tournament4Icon"),
            getElementById("startTournamentIcon"),
        ];
        this.showPlayerElements = [
            getElementById("tournamentShowPlayer1"),
            getElementById("tournamentShowPlayer2"),
            getElementById("tournamentShowPlayer3"),
            getElementById("tournamentShowPlayer4"),
        ];
        this.startTournamentGameBtn = getElementById("startTournamentGameBtn");
        this.initializeEventListeners();
    }
    initializeEventListeners() {
        getElementById("backToModesFromTournament").addEventListener("click", () => {
            console.log("back from tournament clicked!");
            getElementById("gameModeSelection").classList.remove("hidden");
            getElementById("tournamentStepper").classList.add("hidden");
        });
        getElementById("tournamentBtn").addEventListener("click", () => {
            console.log("tournament button clicked!");
            getElementById("gameModeSelection").classList.add("hidden");
            getElementById("tournamentStepper").classList.remove("hidden");
        });
        this.tournamentInputs.forEach((input, index) => {
            input.addEventListener("input", () => this.validateTournamentPlayer(index));
        });
        this.registerButtons.forEach((button, index) => {
            button.addEventListener("click", () => this.registerTournamentPlayer(index));
        });
        this.startTournamentGameBtn.addEventListener("click", () => {
            console.log("Starting tournament!");
            console.log("Players:", this.showPlayerElements[0].textContent, this.showPlayerElements[1].textContent, this.showPlayerElements[2].textContent, this.showPlayerElements[3].textContent);
            getElementById('tournamentStepper').classList.add('hidden');
            getElementById('gameCanvas').classList.remove('hidden');
        });
    }
    validateTournamentPlayer(playerIndex) {
        const currentPlayerName = this.tournamentInputs[playerIndex].value.trim();
        const previousPlayerNames = [];
        for (let i = 0; i < playerIndex; i++) {
            previousPlayerNames.push(this.tournamentInputs[i].value.trim());
        }
        const isValid = currentPlayerName.length > 0 &&
            !previousPlayerNames.includes(currentPlayerName);
        this.registerButtons[playerIndex].disabled = !isValid;
    }
    //implement button code T_T
    registerTournamentPlayer(playerIndex) {
        const playerName = this.tournamentInputs[playerIndex].value;
        console.log(`player ${playerIndex + 1} registered:`, playerName);
        this.updateStepToCompleted(this.stepIcons[playerIndex]); ///////////////////////////////////////
        this.stepsContents[playerIndex].classList.add("hidden");
        if (playerIndex < 3) {
            this.updateStepToActive(this.stepIcons[playerIndex + 1]);
            this.stepsContents[playerIndex + 1].classList.remove("hidden");
        }
        else {
            this.updateStepToActive(this.stepIcons[4]);
            this.stepsContents[4].classList.remove("hidden");
            this.tournamentInputs.forEach((input, index) => {
                this.showPlayerElements[index].textContent = input.value;
            });
        }
    }
    updateStepToCompleted(icon) {
        icon.classList.remove("bg-yellow-500", "text-black");
        icon.classList.add("bg-green-500", "text-white");
        icon.innerHTML = "✓";
    }
    updateStepToActive(icon) {
        icon.classList.remove("bg-gray-300", "text-gray-600");
        icon.classList.add("bg-yellow-500", "text-black");
        const parentElement = icon.parentElement;
        if (parentElement) {
            const lastSpan = parentElement.querySelector("span:last-child");
            if (lastSpan) {
                lastSpan.classList.remove("text-gray-400");
            }
        }
    }
}
document.addEventListener("DOMContentLoaded", () => {
    new SinglePlayerManager();
    new TwoVsTwoManager();
    new TournamentManager();
});
