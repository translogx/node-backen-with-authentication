
import bcrypt, { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import DbUtil from '../lib/dbutil';
import AuthDao from '../Dao/AuthDao'

import dotenv from 'dotenv';

import axios from 'axios'

dotenv.config();

/**	Creates a callback that proxies node callback style arguments to an Express Response object.
 *	@param {express.Response} res	Express HTTP Response
 *	@param {number} [status=200]	Status code to send on success
 *
 *	@example
 *		list(req, res) {
 *			collection.find({}, toRes(res));
 *		}
 */
const SALT = process.env.DEV_SALT;

export function toRes(res, status=200) {
	return (err, thing) => {
		if (err) return res.status(500).send(err);

		if (thing && typeof thing.toObject ==='function') {
			thing = thing.toObject();
		}
		res.status(status).json(thing);
	};
}

export function encrypt(string) {
	// const salt = await bcrypt.genSalt(10);
	// console.log('salt >>>>>>>> '+SALT);
	try {
		//const salt =  SALT;  //'$2b$10$6ZE.Yt9WzmW20Gr7fQaX8u';
		let hashedpass =  bcrypt.hash(string,SALT);
		return hashedpass;
	} catch (error) {
		console.log(error);
		return;
	}
	
}

export function encryptpass(string) {
	// const salt = await bcrypt.genSalt(10);
	//console.log('salt >>>>>>>> '+SALT);
	try {
		//const salt =  SALT;  //'$2b$10$6ZE.Yt9WzmW20Gr7fQaX8u';
		let hashedpass =  bcrypt.hash(string,SALT);
		return hashedpass;
	} catch (error) {
		console.log(error);
		return;
	}
	
}

export function sendVerifyEmail(email, otp, userid){
	console.log('init send email')
	
	//let handleEmail = async () =>{
		let userdao = new AuthDao();

		try {
		
			let transporter = nodemailer.createTransport({
				host: process.env.SMTP_HOST,
				port: process.env.SMTP_PORT,
				secure: true, // true for 465, false for other ports
				auth: {
					user: process.env.SMTP_USER, // generated ethereal user
					pass: process.env.SMTP_PASS, // generated ethereal password
				},
			});
			console.log(transporter);
			// send mail with defined transport object
			let info =  transporter.sendMail({
				from: process.env.SMTP_FROM_EMAIL, // sender address
				to: email, // list of receivers
				subject: "Welcome to Zig Zag nation", // Subject line
				text: `Click the following link to validate your email. https://www.zigzagnation.net/email/verify?token=${otp}&id=${userid}`, // plain text body`
				html: `<div>Click the following link to validate your email. https://www.zigzagnation.net/email/verify?token=${otp}&id=${userid}</div>`, // html body
			});
		
			return info

		} catch (error) {
			console.log(error.response);
			return;
		}
	//}
	//handleEmail()

	
}

export function sendPasswordResetEmail(email, otp){
	console.log('init send email')
	
	//let handleEmail = async () =>{
		let userdao = new AuthDao();

		try {
		
			let transporter = nodemailer.createTransport({
				host: process.env.SMTP_HOST,
				port: process.env.SMTP_PORT,
				secure: true, // true for 465, false for other ports
				auth: {
					user: process.env.SMTP_USER, // generated ethereal user
					pass: process.env.SMTP_PASS, // generated ethereal password
				},
			});
		
			// send mail with defined transport object
			let info =  transporter.sendMail({
				from: process.env.SMTP_FROM_EMAIL, // sender address
				to: email, // list of receivers
				subject: "Welcome to Zig Zag nation", // Subject line
				text: `Click the following link to reset your password. https://www.zigzagnation.net/auth/password/reset?id=${otp}`, // plain text body`
				html: `<div>Click the following link to reset your password. https://www.zigzagnation.net/auth/password/reset?id=${otp}</div>`, // html body
			});

			return info

		} catch (error) {
			console.log(error.response);
			return ;
		}
	//}
	
	
}

/**	genrate usierid 
 *	@param user_data
 *
 */
export function generateuUserID(userdata) {
	
	try {
		let userid =  bcrypt.hash(userdata, SALT);
		return userid;
	} catch (error) {
		console.log(error);
		return;
	}
}

export function generateJWTToken(data){
	let token = jwt.sign(data, process.env.SECRET, { expiresIn: '7d'});
	return token;
}

export function sendNotification(data) {

	// for now only run in docker environment 
	// this is because this feature is only set up to run it 
	// the dev environment
	if (!process.env.IS_DOCKER) { return; }

	axios.post(`http://${process.env.SOCKET}:8880/notify`, { ...data })
	.then(res => { console.log("passed") })
	.catch(error => console.log("failed"));
}

//console.log(require('crypto').randomBytes(64).toString('hex'));
