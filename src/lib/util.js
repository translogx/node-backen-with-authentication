
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
const SALT = '$2b$10$6ZE.Yt9WzmW20Gr7fQaX8u';

export function toRes(res, status=200) {
	return (err, thing) => {
		if (err) return res.status(500).send(err);

		if (thing && typeof thing.toObject ==='function') {
			thing = thing.toObject();
		}
		res.status(status).json(thing);
	};
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


export function generateJWTToken(data){
	
	let token = jwt.sign(data, "SALT", { expiresIn: '7d'});
	return token;
}

//console.log(require('crypto').randomBytes(64).toString('hex'));
