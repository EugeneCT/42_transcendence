import { buildUrl } from 'build-url-ts';
import { v4 as uuidv4 } from 'uuid';

const BASE_URL = 'http://localhost:8000';
const CLIENT_ID = '811465816616-rvc89rg2o97d9to1431q0c11jl45avk3.apps.googleusercontent.com';

// Client ID: 811465816616-rvc89rg2o97d9to1431q0c11jl45avk3.apps.googleusercontent.com
// Client Secret: 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

// http://localhost:8000/#state=pass-through%20value&access_token=ya29.A0AS3H6NyLIAwimlidukHySqfQWygj1h6svyFNuHt_U5DkbZmnBLnUeIsEE8oG8xuBEKf3jz6mGc_So3fVu4WfMBVoJMOHFUE0yg2QPiR69UVvdeaSbkk2sK4kza2MRB0bYq6ARb0soxhtdLnmcd3fw2RZ50wTzL-HuzzyDLaBhngvX4rvVsUVwR4T7v438rKj5yptCx0aCgYKAbQSARISFQHGX2MirAWxKQ0RMJ1TkLxNvUVrCQ0206&token_type=Bearer&expires_in=3599&scope=https://www.googleapis.com/auth/calendar.readonly%20https://www.googleapis.com/auth/drive.m


const SERVER_URL = 'http://localhost:9000';


// Test to send raw username
async function sendUsername() {
	const response = await fetch(`${SERVER_URL}/send`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			name: 'Test Username',
		})
	})
	if (!response.ok) {
		console.error(`HTTP ${response.status}: ${await response.text()}`);
	}
	const body = await response.json();
	console.log(body);
}


async function startGoogleOauth() {
	const response = await fetch(`${SERVER_URL}/auth/google/start`);
	if (!response.ok) {
		console.error(`HTTP ${response.status}: ${await response.text()}`);
	}
	const body = await response.json();
	console.log(body);
}


async function start2fa() {
	const response = await fetch(`${SERVER_URL}/2fa/start`);
	if (!response.ok) {
		console.error(`HTTP ${response.status}: ${await response.text()}`);
	}
	const body = await response.json();
	console.log(body);
}




function getToken() {
	const url = window.location.href;
	console.log(url);
}

document.addEventListener('DOMContentLoaded', () => {
	const oauthButton: HTMLButtonElement = document.getElementById('oauthButton') as HTMLButtonElement;

	oauthButton.addEventListener('click', (): void => {
		sendUsername();
		
		// backend test
		startGoogleOauth();
		
		// handle oauth redirect
		// handleOauthButtonClick();
	})
})

class OauthSession {
	state: string;	// used to decode the jwt
	nonce: string;	// used to validate the callback

	constructor() {
		this.state = uuidv4();
		this.nonce = uuidv4();
	}

	getOauthUrl() {
		const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
	
		return buildUrl(oauth2Endpoint, {
			queryParams: {
				client_id: CLIENT_ID,
				redirect_uri: BASE_URL,
				scope: 'openid email profile',
				response_type: 'id_token',
				nonce: this.nonce,
				state: this.state,
			}
		});
	}
}

export function handleOauthButtonClick() {
	const oauthSession = new OauthSession();
	createPopUp(oauthSession.getOauthUrl(), 'google-oauth');
}

function receiveMessage(event: any){}

let windowObjectReference: WindowProxy | null = null;
let previousUrl: string | null = null;

function createPopUp(url: string, name: string) {
	window.removeEventListener('message', receiveMessage);

	const strWindowFeatures = 'toolbar=no, menubar=no, width=600, height=700, top=100, left=100';
	if (windowObjectReference === null || windowObjectReference.closed) {
		windowObjectReference = window.open(url, name, strWindowFeatures);
	} else if (previousUrl !== url) {
		windowObjectReference = window.open(url, name, strWindowFeatures);
		windowObjectReference!.focus();
	} else {
		windowObjectReference!.focus();
	}

	window.addEventListener('message', event => receiveMessage(event), false);
	previousUrl = url;
}
