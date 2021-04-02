import http from 'http';
import path from 'path'
import express  from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser, { urlencoded } from 'body-parser';
import middleware from './middleware';
import api from './api';
import config from './config.json';
import dotenv from 'dotenv';
import handlebar from 'express-handlebars';
import querystring from 'querystring';



dotenv.config();
let app = express();
app.server = http.createServer(app);

app.engine('.hbs', handlebar({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', __dirname + '/views');

app.use(express.static(path.join(__dirname,'assets')));

// logger
app.use(morgan('dev'));

// 3rd party middleware
app.use(cors({
	exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.json({
	limit : config.bodyLimit
}));
app.use(bodyParser.urlencoded({extended : false}))


// connect to db
//initializeDb( db => {

	// internal middleware
	app.use( middleware({ config}));

	// api router
	app.use('/api', api({ config}));
	app.use('/', api({ config}));

	app.server.listen(process.env.PORT || config.port, () => {
		console.log(`Started on port ${app.server.address().port}`, process.env.SOCKET);
	});
//});

export default app;
