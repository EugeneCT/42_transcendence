import cors from '@fastify/cors';
import app from 'fastify';
import { handleTwoFASend, handleTwoFAVerify } from './2fa.js';

const fastify = app();

fastify.register(cors, {
	origin: ["http://localhost:8000"],
	methods: ["GET", "POST", "PUT"],
	allowedHeaders: ["Content-Type", "Authorization"],
})

fastify.get('/test', async (request: any, reply: any) => {
		return { message: 'hello world!'}
	})

fastify.post('/send', async (request: any, reply: any) => {
	return { message: `received username: ${request.body.name}`}
})

// fastify.get('/auth/google/start', async (request: any, reply: any) => {
// 	handleOauthButtonClick();
// 	return { message: 'hello' };
// })


// email 2FA
fastify.post('/2fa/send', handleTwoFASend)
fastify.post('/2fa/verify', handleTwoFAVerify)


const start = async () => {
	try {
		await fastify.listen({ port: 9000, host: '0.0.0.0'});
	} catch (err) {
		fastify.log.error(err);
		console.error(err);
		process.exit(1);
	}
};

start();

process.on('SIGINT', async () => {
  await fastify.close();
  console.log('Fastify server closed.');
  process.exit(0);
});


// const SERVER_URL = 'http://localhost:8000';
// const CLIENT_ID = '811465816616-rvc89rg2o97d9to1431q0c11jl45avk3.apps.googleusercontent.com';

// class OauthSession {
// 	state: string;	// used to decode the jwt
// 	nonce: string;	// used to validate the callback

// 	constructor() {
// 		this.state = uuidv4();
// 		this.nonce = uuidv4();
// 	}

// 	getOauthUrl() {
// 		const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
	
// 		return buildUrl(oauth2Endpoint, {
// 			queryParams: {
// 				client_id: CLIENT_ID,
// 				redirect_uri: SERVER_URL,
// 				scope: 'openid email profile',
// 				response_type: 'id_token',
// 				nonce: this.nonce,
// 				state: this.state,
// 			}
// 		});
// 	}
// }

// function handleOauthButtonClick() {
// 	const oauthSession = new OauthSession();
// 	createPopUp(oauthSession.getOauthUrl(), 'google-oauth');
// }

// function receiveMessage(event: any){}

// let windowObjectReference: WindowProxy | null = null;
// let previousUrl: string | null = null;

// function createPopUp(url: string, name: string) {
// 	window.removeEventListener('message', receiveMessage);

// 	const strWindowFeatures = 'toolbar=no, menubar=no, width=600, height=700, top=100, left=100';
// 	if (windowObjectReference === null || windowObjectReference.closed) {
// 		windowObjectReference = window.open(url, name, strWindowFeatures);
// 	} else if (previousUrl !== url) {
// 		windowObjectReference = window.open(url, name, strWindowFeatures);
// 		windowObjectReference!.focus();
// 	} else {
// 		windowObjectReference!.focus();
// 	}

// 	window.addEventListener('message', event => receiveMessage(event), false);
// 	previousUrl = url;
// }
