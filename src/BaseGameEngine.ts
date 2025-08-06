import { BOARD_HEIGHT, BOARD_WIDTH, MAX_SCORE } from './settings.js';

export abstract class BaseGameEngine {
	ctx: CanvasRenderingContext2D;
	board!: BaseBoard;
	keys: Set<string>;

	keyDownHandler = (event: KeyboardEvent) => {
		this.keys.add(event.key); 
	};

	keyUpHandler = (event: KeyboardEvent) => {
		this.keys.delete(event.key);
	};

	constructor(ctx: CanvasRenderingContext2D) {
		this.ctx = ctx;
		this.keys = new Set<string>;
		document.addEventListener('keydown', this.keyDownHandler);
		document.addEventListener('keyup', this.keyUpHandler);
	}

	destroy() {
		document.removeEventListener('keydown', this.keyDownHandler);
		document.removeEventListener('keyup', this.keyUpHandler);
	}

	refresh() {
		this.ctx.clearRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
		this.board.drawBlankCanvas();
	};

	abstract move(): void;
	abstract checkWin(): void;

	protected async countDown(): Promise<void> {
		const numbers = ['3', '2', '1'];
		let index = 0;
		let fontSize = 20;
		
		return new Promise(resolve => {
			const animate = () => {
				this.refresh();

				fontSize += 3;
				if (fontSize > 200) {
					index++;
					fontSize = 20;
					if (index >= numbers.length) {
						resolve();
						return;
					}
				}
				this.ctx.font = `${fontSize}px trebuchet ms`;
				this.ctx.fillStyle = 'white';
				this.ctx.shadowColor = 'black';
				this.ctx.shadowBlur = 5;
				this.ctx.textAlign = 'center';
				this.ctx.fillText(numbers[index], BOARD_WIDTH/2, BOARD_HEIGHT/2 - 50);
				
				requestAnimationFrame(animate);
			}

			animate();
		})
	}

	protected async gameLoop(): Promise<string> {
		return new Promise(resolve => {
			const loop = () => {
				this.refresh();
				this.move();
				this.checkWin();
				
				if (this.board.leftScore === MAX_SCORE) {
					resolve('left');
					return;
				} else if (this.board.rightScore === MAX_SCORE) {
					resolve('right');
					return;
				}
	
				requestAnimationFrame(loop);
			}
	
			loop();
		})
	}

	protected async printWinner(text: string) {
		this.refresh();
		this.ctx.font = `100px trebuchet ms`;
		this.ctx.fillStyle = 'yellow';
		this.ctx.shadowColor = 'black';
		this.ctx.shadowBlur = 5;
		this.ctx.textAlign = 'center';
		this.ctx.fillText(`${text}`, BOARD_WIDTH/2, BOARD_HEIGHT/2 - 150);
		this.ctx.fillText('WIN🎉', BOARD_WIDTH/2, BOARD_HEIGHT/2 - 50);
	}
	
	async start(leftName: string, rightName: string) {
		await this.countDown();
		const winner = (await this.gameLoop() == 'left') ? leftName : rightName;
		await this.printWinner(winner);
		await this.sleep(3000);
	}

	private sleep = (milliseconds: number) => {
    	return new Promise((resolve) => setTimeout(resolve, milliseconds));
	};
}

export abstract class BaseBoard {
	leftScore: number = 0;
	rightScore: number = 0;

	constructor(protected ctx: CanvasRenderingContext2D) {}

	abstract drawBlankCanvas(): void;

	protected drawScores() {
		this.ctx.fillStyle = 'white';
		this.ctx.textAlign = 'center';
		this.ctx.font = "48px trebuchet ms";
		this.ctx.fillText(this.leftScore.toString(), BOARD_WIDTH / 4, 50);
		this.ctx.fillText(this.rightScore.toString(), BOARD_WIDTH / 4 * 3, 50);
	}
}
