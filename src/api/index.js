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
		var token;
		if (req.headers.cookie !== null) {
			token = req.headers.cookie.split('token=')[1];
		}else{
			token = req.query.key;
		}
		//console.log(req.headers.cookie.split('token=')[1]);
		
		if (token === null || token === undefined){
			return res.render('register', {exception: true, mesg: "Please login or Signup to view the page."})
		}else{
			return res.render('homepage');
		}
		
	});

	api.get('/login', (req, res) => {
		//const template = handlebar.compile('src/views/homepage.hbs', "name: {{name}}");
		//res.json({ "service": 'Patricia APIs' });
		res.render('login')
	});

	api.get('/register', (req, res) => {
		//const template = handlebar.compile('src/views/homepage.hbs', "name: {{name}}");
		//res.json({ "service": 'Patricia APIs' });
		res.render('register', {mesg: ""})
	});

	// api.get('/logout', (req, res) => {
	// 	//const template = handlebar.compile('src/views/homepage.hbs', "name: {{name}}");
	// 	//res.json({ "service": 'Patricia APIs' });
	// 	res.headers.
	// 	res.render('login')
	// });

	api.get('/*', (req, res) => {
		//const template = handlebar.compile('src/views/homepage.hbs', "name: {{name}}");
		//res.json({ "service": 'Patricia APIs' });
		res.render('notfound')
	});

	return api;
}
