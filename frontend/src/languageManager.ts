import { en } from './languages/en.js'
import { zh } from './languages/zh.js'
import { ms } from './languages/ms.js'

type Language = 'en' | 'zh' | 'ms';
type Translations = typeof en;

class LanguageManager{
    private currentLanguage: Language = 'en';
    private translations: Record<Language, Translations>  ={
        en,
        zh,
        ms
    };

    constructor() {
        this.loadLanguage();
        this.intializeEventListeners();
        this.updatePageLanguage();
    }
    private loadLanguage(): void {
        const saved = localStorage.getItem('ft_transcendence_language') as Language;
        if (saved && ['en', 'zh', 'ms'].includes(saved)){
            this.currentLanguage = saved;
        }
    }
    private saveLanguage(): void {
        localStorage.setItem('ft_transcendence_language', this.currentLanguage);
    }

    private intializeEventListeners():void {
        document.getElementById('lang-en')?.addEventListener('click', ()=>{
            this.switchLanguage('en');
        })
        document.getElementById('lang-zh')?.addEventListener('click', ()=>{
            this.switchLanguage('zh');
        });
        document.getElementById('lang-ms')?.addEventListener('click', ()=>{
            this.switchLanguage('ms');
        });
    }
    private switchLanguage(language: Language): void {
        this.currentLanguage = language;
        this.saveLanguage();
        this.updateButtonStates();
        this.updatePageLanguage();
    }

    private updateButtonStates() : void {
        ['lang-en', 'lang-zh', 'lang-ms'].forEach(id=>{
            const button = document.getElementById(id);
            if (button) {
                button.classList.remove('bg-yellow-500');
                button.classList.add('bg-white');
            }
        });
        const activeButton = document.getElementById(`lang-${this.currentLanguage}`)
        if(activeButton){
            activeButton.classList.remove('bg-white');
            activeButton.classList.add('bg-yellow-500');
        }
    }
    private updatePageLanguage(): void {
        const t = this.translations[this.currentLanguage];
    
    this.updateElementText('transcendance', t.transcendance);
    // Main page content
    this.updateElementText('choose-game-text', t.chooseGame);
    this.updateElementText('snake-button-text', t.snake);
    this.updateElementText('pong-button-text', t.pong);
    
    // Pong game mode buttons
    this.updateElementText('tournament-btn-text', t.tournament);
    this.updateElementText('single-player-btn-text', t.singlePlayer);
    this.updateElementText('two-vs-two-btn-text', t.twoVsTwo);
    
    // Snake game mode buttons (with unique IDs)
    this.updateElementText('snake-tournament-btn-text', t.tournament);
    this.updateElementText('snake-single-player-btn-text', t.singlePlayer);
    this.updateElementText('snake-two-vs-two-btn-text', t.twoVsTwo);
    
    // Stepper content
    this.updateElementText('register-text', t.register);
    this.updateElementText('start-game-text', t.startGame);
    this.updateElementText('enter-name-text', t.enterName);
    this.updateElementText('register-player-text', t.registerPlayer);
    this.updateElementText('welcome-text', t.welcome);
    this.updateElementText('ready-text', t.areYouReady);
    this.updateElementText('start-text', t.start);
    this.updateElementText('back-text', t.back);
    
    // Tournament content
    this.updateElementText('player1-text', t.player1);
    this.updateElementText('player2-text', t.player2);
    this.updateElementText('player3-text', t.player3);
    this.updateElementText('player4-text', t.player4);
    this.updateElementText('tournament-ready-text', t.tournamentReady);
    this.updateElementText('start-tournament-text', t.startTournament);

    // snake Tournament content
    this.updateElementText('snake-player1-text', t.player1);
    this.updateElementText('snake-player2-text', t.player2);
    this.updateElementText('snake-player3-text', t.player3);
    this.updateElementText('snake-player4-text', t.player4);
    //snake stepper content
    this.updateElementText('snake-modal-title-text', t.snake);   
    this.updateElementText('snake-back-button-text', t.back);   
    this.updateElementText('snake-player1-stepper-text', t.player1);   
    this.updateElementText('snake-player2-stepper-text', t.player2);   
    this.updateElementText('snake-player3-stepper-text', t.player3);   
    this.updateElementText('snake-player4-stepper-text', t.player4);   
    this.updateElementText('snake-start-game-text', t.stepperStart);

    
    this.updateElementText('snakeRegisterTournamentPlayer1Btn', t.registerPlayer1);
    this.updateElementText('snakeRegisterTournamentPlayer2Btn', t.registerPlayer2);
    this.updateElementText('snakeRegisterTournamentPlayer3Btn', t.registerPlayer3);
    this.updateElementText('snakeRegisterTournamentPlayer4Btn', t.registerPlayer4);
    
    
    this.updateElementText('snakeTournamentShowPlayer1text', t.player1);
    this.updateElementText('snakeTournamentShowPlayer2text', t.player2);
    this.updateElementText('snakeTournamentShowPlayer3text', t.player3);
    this.updateElementText('snakeTournamentShowPlayer4text', t.player4);

    this.updateElementText('snake-tournament-ready-text', t.tournamentReady);
    this.updateElementText('snake-start-tournament-text', t.startTournament);
    
    // Pong Team registration (2v2)
    this.updateElementText('register-team-a-text', t.registerTeamA);
    this.updateElementText('register-team-b-text', t.registerTeamB);
    this.updateElementText('team-a-text', t.teamA);
    this.updateElementText('team-b-text', t.teamB);
    this.updateElementText('teams-ready-text', t.teamsReady);

    this.updateElementText('2v2-register-team-a-text', t.registerTeamA);
    this.updateElementText('2v2-register-team-b-text', t.registerTeamB);
    this.updateElementText('2v2-start-game-btn', t.startGame);
    
    // Developer cards
    this.updateElementText('backend-developer-text', t.backendDeveloper);
    this.updateElementText('backend-developer-text-2', t.backendDeveloper);
    this.updateElementText('game-developer-text', t.gameDeveloper);
    
    // Input placeholders
    this.updateElementPlaceholder('player-name-input', t.enterNamePlaceholder);
    this.updateElementPlaceholder('snake-player-name-input', t.enterNamePlaceholder);
    this.updateElementPlaceholder('player1Input', t.enterNamePlaceholder);
    this.updateElementPlaceholder('player2Input', t.enterNamePlaceholder);
    this.updateElementPlaceholder('player3Input', t.enterNamePlaceholder);
    this.updateElementPlaceholder('player4Input', t.enterNamePlaceholder);
    this.updateElementPlaceholder('tournamentPlayer1Input', t.enterNamePlaceholder);
    this.updateElementPlaceholder('tournamentPlayer2Input', t.enterNamePlaceholder);
    this.updateElementPlaceholder('tournamentPlayer3Input', t.enterNamePlaceholder);
    this.updateElementPlaceholder('tournamentPlayer4Input', t.enterNamePlaceholder);

    //snake input placeholders
    this.updateElementPlaceholder('snakeTournamentPlayer1Input', t.enterNamePlaceholder);
    this.updateElementPlaceholder('snakeTournamentPlayer2Input', t.enterNamePlaceholder);
    this.updateElementPlaceholder('snakeTournamentPlayer3Input', t.enterNamePlaceholder);
    this.updateElementPlaceholder('snakeTournamentPlayer4Input', t.enterNamePlaceholder);    
        
    }
    private updateElementPlaceholder(id: string, placeholder: string): void {
        const element = document.getElementById(id) as HTMLInputElement;
        if(element){
            element.placeholder = placeholder;
        }
    }
    private updateElementText(id: string, text: string): void {
        const element = document.getElementById(id);
        if(element){
            element.textContent = text;
        }
    }
    // DO NOT DELETE.=Thanks
    // public getTranslations(): Translations{
    //     return (this.translations[this.currentLanguage]);
    // }
    // public translate(key: keyof Translations): string {
    //     return(this.translations[this.currentLanguage][key]);
    // }
}

document.addEventListener ('DOMContentLoaded', ()=>{
    new LanguageManager();
})