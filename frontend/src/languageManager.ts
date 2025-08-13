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
    
        this.updateElementText('choose-game-text', t.chooseGame);
        this.updateElementText('snake-button-text', t.snake);
        this.updateElementText('pong-button-text', t.pong);
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