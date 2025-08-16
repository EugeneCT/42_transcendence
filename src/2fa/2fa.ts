// curl -X POST http://localhost:9000/2fa/send -H "Content-Type: application/json" -d '{"email": "daryloye@gmail.com"}'
// curl -X POST http://localhost:9000/2fa/verify -H "Content-Type: application/json" -d '{"email": "daryloye@gmail.com", "code": "123456"}'

import Database from 'better-sqlite3'
import nodemailer from 'nodemailer'

const db = new Database(':memory:')

db.exec(`CREATE TABLE IF NOT EXISTS twofa (
	email TEXT PRIMARY KEY,
	code VARCHAR(6),
	created_at TIME
	);`
)

const EMAIL_SENDER = 'daryloye@gmail.com'
const EMAIL_PASS = 'hdow tkbb oxcp arkq'


function sendEmail(email: string, code: string) {
	const transporter = nodemailer.createTransport({
	  service: 'gmail',
	  auth: {
		user: EMAIL_SENDER,
		pass: EMAIL_PASS
	  }
	});
	
	const mailOptions = {
	  from: EMAIL_SENDER,
	  to: email,
	  subject: 'NOT A SCAM OPEN THIS EMAIL FOR MAKE GOOD LUCK (42_transcendence)',
	  text: 'Your 2FA code is: ' + code,
	};

	transporter.sendMail(mailOptions, function(error: any, info: any) {
		if (error) {
			console.log(error);
		} else {
			console.log('Email sent:', info.response)
		}
	})
}

function updateRepository(email: string, code: string) {
	db.prepare(`INSERT OR REPLACE INTO twofa (email, code, created_at)
		VALUES (?, ?, TIME());`
	).run(email, code)
}

function searchRepository(email: string, code: string) {
	return db.prepare(`SELECT * FROM twofa 
		WHERE email = ? AND code = ?`
	).get(email, code)
}

export async function handleTwoFASend(request: any, reply: any) {
	const code = String(
		Math.floor(Math.random() * (10 ** 6)))
		.padStart(6, '0');

	const email = request.body.email

	updateRepository(email, code)
	sendEmail(email, code)

	return reply.send({ message: '2FA code sent' });
}


export async function handleTwoFAVerify(request: any, reply: any) {
	const email_query = request.body.email
	const code_query = request.body.code

	console.log(searchRepository(email_query, code_query))
	return reply.send({ message: '2FA code verified' });
}
