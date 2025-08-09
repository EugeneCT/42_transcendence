import { selectGame } from "./menu.js";

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

function getElementById<T extends HTMLElement>(id: string): T {
  const element = document.getElementById(id) as T;
  if (!element) {
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
    this.playerNameInput = getElementById<HTMLInputElement>("playerNameInput");
    this.registerBtn = getElementById<HTMLButtonElement>("registerBtn");
    this.step1Content = getElementById<HTMLElement>("step1Content");
    this.step2Content = getElementById<HTMLElement>("step2Content");
    this.step1Icon = getElementById<HTMLElement>("step1Icon");
    this.step2Icon = getElementById<HTMLElement>("step2Icon");
    this.welcomePlayerName = getElementById<HTMLElement>("welcomePlayerName");
    this.startGameBtn = getElementById<HTMLButtonElement>("startGameBtn");
    this.gameCanvas = getElementById<HTMLElement>("gameCanvas");

    this.initializeEventListeners();
  }
  private initializeEventListeners(): void {
    //this shit activates single player modal
    getElementById<HTMLButtonElement>("singlePlayerBtn").addEventListener(
      "click",
      () => {
        console.log("single player button clicked!");
        getElementById<HTMLElement>("gameModeSelection").classList.add(
          "hidden"
        );
        getElementById<HTMLElement>("singlePlayerStepper").classList.remove(
          "hidden"
        );
      }
    );

    //this will initialize the back button
    getElementById<HTMLButtonElement>("backToModes").addEventListener(
      "click",
      () => {
        console.log("single player BACK BUTTON clicked!");
        getElementById<HTMLElement>("singlePlayerStepper").classList.add(
          "hidden"
        );
        getElementById<HTMLElement>("gameModeSelection").classList.remove(
          "hidden"
        );
      }
    );

    //this is validation for player's name
    this.playerNameInput.addEventListener("input", () => {
      const name: string = this.playerNameInput.value.trim();
      this.registerBtn.disabled = name.length === 0;
    });

    this.registerBtn.addEventListener("click", () => {
      const playerName: string = this.playerNameInput.value.trim();
      console.log("Registering player: ", playerName);
      if (playerName) {
        this.updateStepToCompleted(this.step1Icon);
        this.updateStepToActive(this.step2Icon);

        this.step1Content.classList.add("hidden");
        this.step2Content.classList.remove("hidden");

        this.welcomePlayerName.textContent = playerName;
      }
    });
    this.startGameBtn.addEventListener("click", async() => {
      console.log("starting game for: ", this.welcomePlayerName.textContent);
      getElementById<HTMLElement>("singlePlayerStepper").classList.add( "hidden");
      this.gameCanvas.classList.remove("hidden");
      const playerName = this.welcomePlayerName.textContent || "Player 1";
      await selectGame('pong', 'ai', [playerName]);

    });
  }
  private updateStepToCompleted(icon: HTMLElement): void {
    icon.classList.remove("bg-yellow-500", "text-black");
    icon.classList.add("bg-green-500", "text-white");
    icon.innerHTML = "✓";
  }

  private updateStepToActive(icon: HTMLElement): void {
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
  private player1Input: HTMLInputElement;
  private player2Input: HTMLInputElement;
  private player3Input: HTMLInputElement;
  private player4Input: HTMLInputElement;
  private registerTeamAbtn: HTMLButtonElement;
  private registerTeamBbtn: HTMLButtonElement;
  private TeamAcontent: HTMLElement;
  private TeamBcontent: HTMLElement;
  private start2V2content: HTMLElement;
  private Team1Icon: HTMLElement;
  private Team2Icon: HTMLElement;
  private start2V2Icon: HTMLElement;
  private teamAPlayer1: HTMLElement;
  private teamAPlayer2: HTMLElement;
  private teamBPlayer1: HTMLElement;
  private teamBPlayer2: HTMLElement;
  private start2v2GameBtn: HTMLButtonElement;

  constructor() {
    this.player1Input = getElementById<HTMLInputElement>("player1Input");
    this.player2Input = getElementById<HTMLInputElement>("player2Input");
    this.player3Input = getElementById<HTMLInputElement>("player3Input");
    this.player4Input = getElementById<HTMLInputElement>("player4Input");

    this.registerTeamAbtn =
      getElementById<HTMLButtonElement>("registerTeamAbtn");
    this.registerTeamBbtn =
      getElementById<HTMLButtonElement>("registerTeamBbtn");
    this.TeamAcontent = getElementById<HTMLElement>("teamAcontent");
    this.TeamBcontent = getElementById<HTMLElement>("teamBcontent");

    this.start2V2content = getElementById<HTMLElement>("start2V2content");

    this.Team1Icon = getElementById<HTMLElement>("team1Icon");
    this.Team2Icon = getElementById<HTMLElement>("team2Icon");
    this.start2V2Icon = getElementById<HTMLElement>("start2V2Icon");

    this.teamAPlayer1 = getElementById<HTMLElement>("teamAPlayer1");
    this.teamAPlayer2 = getElementById<HTMLElement>("teamAPlayer2");
    this.teamBPlayer1 = getElementById<HTMLElement>("teamBPlayer1");
    this.teamBPlayer2 = getElementById<HTMLElement>("teamBPlayer2");
    this.start2v2GameBtn = getElementById<HTMLButtonElement>("start2v2GameBtn");

    this.initializeEventListeners();
  }
  private initializeEventListeners(): void {
    getElementById<HTMLButtonElement>("twoVsTwoBtn").addEventListener(
      "click",
      () => {
        console.log("2v2 clicked");
        getElementById<HTMLElement>("gameModeSelection").classList.add(
          "hidden"
        );
        getElementById<HTMLElement>("twoVersusTwoStepper").classList.remove(
          "hidden"
        );
      }
    );

    getElementById<HTMLElement>("backToModesFrom2v2").addEventListener(
      "click",
      () => {
        console.log("back to modes from 2v2 clicked");
        getElementById<HTMLElement>("twoVersusTwoStepper").classList.add(
          "hidden"
        );
        getElementById<HTMLElement>("gameModeSelection").classList.remove(
          "hidden"
        );
      }
    );

    this.player1Input.addEventListener("input", () => this.validateTeamA());
    this.player2Input.addEventListener("input", () => this.validateTeamA());
    this.player3Input.addEventListener("input", () => this.validateTeamB());
    this.player4Input.addEventListener("input", () => this.validateTeamB());

    this.registerTeamAbtn.addEventListener("click", () => {
      console.log(
        "Team A registered:",
        this.player1Input.value,
        this.player2Input.value
      );
      this.updateStepToCompleted(this.Team1Icon);
      this.updateStepToActive(this.Team2Icon);

      this.TeamAcontent.classList.add("hidden");
      this.TeamBcontent.classList.remove("hidden");
    });

    this.registerTeamBbtn.addEventListener("click", () => {
      console.log(
        "Team B registered:",
        this.player3Input.value,
        this.player4Input.value
      );
      this.updateStepToCompleted(this.Team2Icon);
      this.updateStepToActive(this.start2V2Icon);

      this.TeamBcontent.classList.add("hidden");
      this.start2V2content.classList.remove("hidden");

      this.teamAPlayer1.textContent = this.player1Input.value;
      this.teamAPlayer2.textContent = this.player2Input.value;
      this.teamBPlayer1.textContent = this.player3Input.value;
      this.teamBPlayer2.textContent = this.player4Input.value;
    });
    this.start2v2GameBtn.addEventListener("click", async () => {
      console.log("Starting 2v2 game!");
      console.log(
        "Team A:",
        this.teamAPlayer1.textContent,
        this.teamAPlayer2.textContent
      );
      console.log(
        "Team B:",
        this.teamBPlayer1.textContent,
        this.teamBPlayer2.textContent
      );

      getElementById<HTMLElement>("twoVersusTwoStepper").classList.add(
        "hidden"
      );
      getElementById<HTMLElement>("gameCanvas").classList.remove("hidden");

      const players = [
        this.teamAPlayer1.textContent || "Player 1",
        this.teamAPlayer2.textContent || "Player 2",
        this.teamBPlayer1.textContent || "Player 3",
        this.teamBPlayer2.textContent || "Player 4",
      ];
     await selectGame('pong', '2v2', players);
    });
  }
  private validateTeamA(): void {
    const p1: string = this.player1Input.value.trim();
    const p2: string = this.player2Input.value.trim();
    const isValid: boolean = p1.length > 0 && p2.length > 0 && p1 !== p2;
    this.registerTeamAbtn.disabled = !isValid;
  }
  private validateTeamB(): void {
    const p1: string = this.player1Input.value.trim();
    const p2: string = this.player2Input.value.trim();
    const p3: string = this.player3Input.value.trim();
    const p4: string = this.player4Input.value.trim();

    const isValid: boolean =
      p3.length > 0 &&
      p4.length > 0 &&
      p3 !== p4 &&
      p3 !== p1 &&
      p3 !== p2 &&
      p4 !== p1 &&
      p4 !== p2;
    this.registerTeamBbtn.disabled = !isValid;
  }
  private updateStepToCompleted(icon: HTMLElement): void {
    icon.classList.remove("bg-yellow-500", "text-black");
    icon.classList.add("bg-green-500", "text-white");
    icon.innerHTML = "✓";
  }
  private updateStepToActive(icon: HTMLElement): void {
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
  private tournamentInputs: HTMLInputElement[];
  private registerButtons: HTMLButtonElement[];
  private stepsContents: HTMLElement[];
  private stepIcons: HTMLElement[];
  private showPlayerElements: HTMLElement[];
  private startTournamentGameBtn: HTMLButtonElement;

  constructor() {
    this.tournamentInputs = [
      getElementById<HTMLInputElement>("tournamentPlayer1Input"),
      getElementById<HTMLInputElement>("tournamentPlayer2Input"),
      getElementById<HTMLInputElement>("tournamentPlayer3Input"),
      getElementById<HTMLInputElement>("tournamentPlayer4Input"),
    ];
    this.registerButtons = [
      getElementById<HTMLButtonElement>("registerTournamentPlayer1Btn"),
      getElementById<HTMLButtonElement>("registerTournamentPlayer2Btn"),
      getElementById<HTMLButtonElement>("registerTournamentPlayer3Btn"),
      getElementById<HTMLButtonElement>("registerTournamentPlayer4Btn"),
    ];
    this.stepsContents = [
      getElementById<HTMLElement>("tournamentStep1Content"),
      getElementById<HTMLElement>("tournamentStep2Content"),
      getElementById<HTMLElement>("tournamentStep3Content"),
      getElementById<HTMLElement>("tournamentStep4Content"),
      getElementById<HTMLElement>("tournamentStep5Content"),
    ];
    this.stepIcons = [
      getElementById<HTMLElement>("tournament1Icon"),
      getElementById<HTMLElement>("tournament2Icon"),
      getElementById<HTMLElement>("tournament3Icon"),
      getElementById<HTMLElement>("tournament4Icon"),
      getElementById<HTMLElement>("startTournamentIcon"),
    ];
    this.showPlayerElements = [
      getElementById<HTMLElement>("tournamentShowPlayer1"),
      getElementById<HTMLElement>("tournamentShowPlayer2"),
      getElementById<HTMLElement>("tournamentShowPlayer3"),
      getElementById<HTMLElement>("tournamentShowPlayer4"),
    ];
    this.startTournamentGameBtn = getElementById<HTMLButtonElement>(
      "startTournamentGameBtn"
    );
    this.initializeEventListeners();
  }
  private initializeEventListeners(): void {
    getElementById<HTMLButtonElement>(
      "backToModesFromTournament"
    ).addEventListener("click", () => {
      console.log("back from tournament clicked!");
      getElementById<HTMLElement>("gameModeSelection").classList.remove(
        "hidden"
      );
      getElementById<HTMLElement>("tournamentStepper").classList.add("hidden");
    });

    getElementById<HTMLButtonElement>("tournamentBtn").addEventListener(
      "click",
      () => {
        console.log("tournament button clicked!");
        getElementById<HTMLElement>("gameModeSelection").classList.add(
          "hidden"
        );
        getElementById<HTMLElement>("tournamentStepper").classList.remove(
          "hidden"
        );
      }
    );
    this.tournamentInputs.forEach((input, index) => {
      input.addEventListener("input", () =>
        this.validateTournamentPlayer(index)
      );
    });
    this.registerButtons.forEach((button, index) => {
      button.addEventListener("click", () =>
        this.registerTournamentPlayer(index)
      );
    });
    this.startTournamentGameBtn.addEventListener("click", async () => {
      console.log("Starting tournament!");
      console.log("Players:", this.showPlayerElements[0].textContent, this.showPlayerElements[1].textContent, this.showPlayerElements[2].textContent, this.showPlayerElements[3].textContent);
      getElementById<HTMLElement>('tournamentStepper').classList.add('hidden');
      getElementById<HTMLElement>('gameCanvas').classList.remove('hidden');

      const players = [
        this.showPlayerElements[0].textContent || "Player 1",
        this.showPlayerElements[1].textContent || "Player 2",
        this.showPlayerElements[2].textContent || "Player 3",
        this.showPlayerElements[3].textContent || "Player 4",
      ];
      await selectGame('pong', 'tournament', players);
    });
  }
  private validateTournamentPlayer(playerIndex: number): void {
    const currentPlayerName: string =
      this.tournamentInputs[playerIndex].value.trim();
    const previousPlayerNames: string[] = [];
    for (let i = 0; i < playerIndex; i++) {
      previousPlayerNames.push(this.tournamentInputs[i].value.trim());
    }
    const isValid: boolean =
      currentPlayerName.length > 0 &&
      !previousPlayerNames.includes(currentPlayerName);
    this.registerButtons[playerIndex].disabled = !isValid;
  }
  //implement button code T_T
  private registerTournamentPlayer(playerIndex: number): void {
    const playerName: string = this.tournamentInputs[playerIndex].value;
    console.log(`player ${playerIndex + 1} registered:`, playerName);

    this.updateStepToCompleted(this.stepIcons[playerIndex]); ///////////////////////////////////////

    this.stepsContents[playerIndex].classList.add("hidden");

    if (playerIndex < 3) {
      this.updateStepToActive(this.stepIcons[playerIndex + 1]);
      this.stepsContents[playerIndex + 1].classList.remove("hidden");
    } else {
      this.updateStepToActive(this.stepIcons[4]);
      this.stepsContents[4].classList.remove("hidden");

      this.tournamentInputs.forEach((input, index) => {
        this.showPlayerElements[index].textContent = input.value;
      });
    }
  }

  private updateStepToCompleted(icon: HTMLElement): void {
    icon.classList.remove("bg-yellow-500", "text-black");
    icon.classList.add("bg-green-500", "text-white");
    icon.innerHTML = "✓";
  }
  private updateStepToActive(icon: HTMLElement): void {
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
