import { BOARD_HEIGHT, BOARD_WIDTH, FONT, MAX_SCORE } from './settings.js';

export abstract class BaseGameEngine {
	ctx: CanvasRenderingContext2D;
	board!: BaseBoard;
	keys: Set<string>;

	keyDownHandler = (event: KeyboardEvent) => {
		this.keys.add(event.key.toLowerCase()); 
		console.log('pressing key:', event.key.toLowerCase());
	};

	keyUpHandler = (event: KeyboardEvent) => {
		this.keys.delete(event.key.toLowerCase());
	};

	constructor(ctx: CanvasRenderingContext2D) {
		this.ctx = ctx;
		this.keys = new Set<string>;
		document.addEventListener('keydown', this.keyDownHandler);
		document.addEventListener('keyup', this.keyUpHandler);
	}

	refresh() {
		this.ctx.clearRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
		this.board.drawBlankCanvas();
	};

	abstract move(): void;
	abstract checkWin(): void;

	protected async countDown(leftName: string, rightName: string): Promise<void> {
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
				// print count down
				this.ctx.shadowBlur = 5;
				this.ctx.shadowColor = 'black';
				this.ctx.textAlign = 'center';
				
				this.ctx.font = `${fontSize}px ${FONT}`;
				this.ctx.fillStyle = 'yellow';
				this.ctx.fillText(numbers[index], BOARD_WIDTH/2, BOARD_HEIGHT/2 + 200);

				// print names
				this.ctx.font = `50px ${FONT}`;
				this.ctx.fillText("<< " + leftName, BOARD_WIDTH/2, BOARD_HEIGHT/2 - 200);
				this.ctx.fillText('vs', BOARD_WIDTH/2, BOARD_HEIGHT/2 - 140);
				this.ctx.fillText(rightName + " >>", BOARD_WIDTH/2, BOARD_HEIGHT/2 - 80);
				
				this.ctx.shadowBlur = 0;
				this.ctx.shadowColor = 'transparent';
				
				requestAnimationFrame(animate);
			}

			animate();
		})
	}
	
protected async getWins(name: string): Promise<number> {
  const res = await fetch(`http://localhost:7774/wins/${encodeURIComponent(name)}`);
  console.log(`Response status: ${res.status}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch wins for ${name}: ${res.statusText}`);
  }

  const text = await res.text(); // Read raw text
  console.log('Raw response text:', text);

  try {
    const data: { username: string; wins: number } = JSON.parse(text);
    return data.wins;
  } catch (e) {
    console.error('JSON parse error:', e);
    throw new Error('Failed to parse JSON from getWins response');
  }
}
// POST win for a user
protected async  postWin(name: string, port: number): Promise<void> {
	const res = await fetch(`http://localhost:${port}/win`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ username: name }),
	});
	if (!res.ok) {
		throw new Error(`Failed to post win for ${name}: ${res.statusText}`);
	}
}


	protected async printWinner(name: string) {
		this.refresh();
		this.ctx.font = `100px ${FONT}`;
		this.ctx.fillStyle = 'yellow';
		this.ctx.shadowColor = 'black';
		this.ctx.shadowBlur = 5;
		this.ctx.textAlign = 'center';
		this.ctx.fillText(`${name}`, BOARD_WIDTH/2, BOARD_HEIGHT/2 - 150);
		this.ctx.fillText('WIN 🎉', BOARD_WIDTH/2, BOARD_HEIGHT/2 - 50);

		this.ctx.shadowBlur = 0;
		this.ctx.shadowColor = 'transparent';
	}
	protected async printTotalWin(totalWin:number) {
		this.ctx.font = `50px ${FONT}`;
		this.ctx.fillStyle = 'yellow';
		this.ctx.shadowColor = 'black';
		this.ctx.shadowBlur = 5;
		this.ctx.textAlign = 'center';
	
		this.ctx.fillText('Total WIN : ', BOARD_WIDTH/2, BOARD_HEIGHT/2 +50);
		this.ctx.fillText(`${String(totalWin)}`, BOARD_WIDTH/2, BOARD_HEIGHT/2 + 150);

		this.ctx.shadowBlur = 0;
		this.ctx.shadowColor = 'transparent';
	}

	protected async printTie() {
		this.refresh();
		this.ctx.font = `100px ${FONT}`;
		this.ctx.fillStyle = 'yellow';
		this.ctx.shadowColor = 'black';
		this.ctx.shadowBlur = 5;
		this.ctx.textAlign = 'center';
		this.ctx.fillText(`TIE 😑`, BOARD_WIDTH/2, BOARD_HEIGHT/2 - 150);
		this.ctx.shadowBlur = 0;
		this.ctx.shadowColor = 'transparent';
	}

	protected async gameLoop(): Promise<string> {
		return new Promise(resolve => {
			const loop = () => {
				this.refresh();
				this.move();
				this.checkWin();

				if (this.board.leftScore === MAX_SCORE && this.board.rightScore === MAX_SCORE) {
					resolve('tie');
					return;
				} else if (this.board.leftScore === MAX_SCORE) {
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
	// Timeout helper for a single Promise
	timeoutPromise<T>(promise: Promise<T>, ms: number): Promise<T | null> {
	return new Promise((resolve) => {
		const timer = setTimeout(() => resolve(null), ms);
		promise
		.then((res) => {
			clearTimeout(timer);
			resolve(res);
		})
		.catch(() => {
			clearTimeout(timer);
			resolve(null);
		});
	});
	}

	async start(leftName: string, rightName: string): Promise<string> {
		console.log("start scores:", this.board.leftScore, this.board.rightScore);
		await this.countDown(leftName, rightName);
		
		const resolve = await this.gameLoop();
		let winCount: number;
		let postResult: void | null;

		switch (resolve) {
			case 'left':
				await this.printWinner(leftName);


				postResult = await this.timeoutPromise(this.postWin(leftName, 7774), 2000);

				if (postResult !== null) {
				// Only run these if postWin succeeded within 2 seconds
					const winCount = await this.getWins(leftName);
					await this.printTotalWin(winCount);
				} else {
				// Skip silently or add fallback here
				console.warn('postWin timed out or failed, skipping win count update');
				}

				await this.sleep(3000);

				return leftName;
			case 'right':

				await this.printWinner(rightName);

		

				postResult = await this.timeoutPromise(this.postWin(rightName, 7774), 2000);

				if (postResult !== null) {
				// Only run these if postWin succeeded within 2 seconds
					const winCount = await this.getWins(rightName);
					await this.printTotalWin(winCount);
				} else {
				// Skip silently or add fallback here
				console.warn('postWin timed out or failed, skipping win count update');
				}

				await this.sleep(3000);
				return rightName;
			default:
				console.log("scores:", this.board.leftScore, this.board.rightScore);
				await this.printTie();
				await this.sleep(3000);
				return '';
		}
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
		this.ctx.shadowColor = 'black';
		this.ctx.shadowBlur = 5;
		this.ctx.textAlign = 'center';
		this.ctx.font = `50px ${FONT}`;
		this.ctx.fillText(this.leftScore.toString(), BOARD_WIDTH / 4, 50);
		this.ctx.fillText(this.rightScore.toString(), BOARD_WIDTH / 4 * 3, 50);
		this.ctx.shadowBlur = 0;
		this.ctx.shadowColor = 'transparent';
	}
}
