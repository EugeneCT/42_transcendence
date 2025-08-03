export const BOARD_WIDTH = 800;
export const BOARD_HEIGHT = 600;

export const MAX_SCORE = 3;


// --- PONG SETTINGS ---

export const PADDLE_WIDTH = 20;
export const PADDLE_HEIGHT = 100;
export const PADDLE_MOVE_SPEED = 10;

// define the left and right goals. Game over if ball passes this line.
export const GOAL_BUFFER = 50;
export const LEFT_GOAL_X = GOAL_BUFFER;
export const RIGHT_GOAL_X = BOARD_WIDTH - GOAL_BUFFER;

export const BALL_RADIUS = 10;
export const BALL_START_SPEED = 5;
export const BALL_MAX_SPEED = 20;


// --- SNAKE SETTINGS ---

export const TILE_SIZE = 40;						// length in pixels of each tile square
export const TILES_X = BOARD_WIDTH / TILE_SIZE;		// number of tiles in x axis. Needs to be odd number for the alternate tile colors
export const TILES_Y = BOARD_HEIGHT / TILE_SIZE;	// number of tiles in y axis. Needs to be odd number for the alternate tile colors

export const REFRESH_TIME_MS = 500;


// --- SERVER SETTINGS ---
export const BASE_URL = 'http://localhost:8000';
export const OAUTH_CLIENT_ID = '811465816616-rvc89rg2o97d9to1431q0c11jl45avk3.apps.googleusercontent.com';
