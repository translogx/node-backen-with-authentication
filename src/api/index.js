import { Router } from 'express';
import auth from './auth';


export default ({ config, db }) => {
	let api = Router();
	
	// mount the authentication resource
	api.use('/auth', auth({ config, db }));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		//const template = handlebar.compile('src/views/homepage.hbs', "name: {{name}}");
		//res.json({ "service": 'Patricia APIs' });
		res.render('homepage')
	});

	api.get('/login', (req, res) => {
		//const template = handlebar.compile('src/views/homepage.hbs', "name: {{name}}");
		//res.json({ "service": 'Patricia APIs' });
		res.render('login')
	});

	api.get('/register', (req, res) => {
		//const template = handlebar.compile('src/views/homepage.hbs', "name: {{name}}");
		//res.json({ "service": 'Patricia APIs' });
		res.render('register')
	});

	api.get('/*', (req, res) => {
		//const template = handlebar.compile('src/views/homepage.hbs', "name: {{name}}");
		//res.json({ "service": 'Patricia APIs' });
		res.render('notfound')
	});

	return api;
}
