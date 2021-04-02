import { Router } from 'express';
import authmiddleware from './authtokenmiddleware'

export default ({ config }) => {
	let routes = Router();

	//routes.use(authmiddleware())
	// add middleware here

	return routes;
}
