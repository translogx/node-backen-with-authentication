import { Router } from 'express';
import AuthService from '../services/authServices';

export default ({ config, db }) => {

    let r = Router();
    let auth = new AuthService();

    /**
     * @api {post} /api/auth/signup Request User information
     * @apiName Signup User
     * @apiGroup Auth
     *
     * @apiSuccess {json} User data.
     */
    r.post('/signup', function (req, res) {
        return auth.signup(req, res);
      })

    /**
     * @api {post} /api/auth/login Request User information
     * @apiName Login User
     * @apiGroup Auth
     *
     * @apiSuccess {json} User data.
     */
    r.post('/login', function (req, res) {
        auth.login(req, res);
      })
    /**
     * @api {post} /api/auth/signup Request User information
     * @apiName Signup User
     * @apiGroup Auth
     *
     * @apiSuccess {json} User data.
     */
 r.post('/logout', function (req, res) {
  auth.signup(req, res);
})
    

    return r;
}
