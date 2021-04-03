import {encryptpass, generateuUserID, generateJWTToken} from '../lib/util';
import Validation from '../lib/validation';

import AuthDao from '../Dao/AuthDao'

export default class AuthService{

    async login(req, res) {
        try {

            // Validate Data required for signing in
            let validationError = Validation.AuthValidation.signIn(req.body);
            //console.log('>>>>>>>>> '+validationError)
            if (validationError !== null){
                throw(validationError)
            }

            let {email, password} = req.body
    
           let authdao = new AuthDao();
           password = await encryptpass(password);
           const isexist =  await authdao.getUser(email.toUpperCase(), password)
           console.log("is exist is >>>>> "+isexist);

           if (isexist !== null && isexist !== "failed") {
            

                let jwtoken =  generateJWTToken({email: email});

                res.set('X-ACCESS-TOKEN', jwtoken);

                return res.json({resdata :"success"});
           }else{
            throw ("Invalid email or password" );
           }
            
        } catch (error) {
            let respdata = {
                msg: error,
                isSuccess: false
            }
            return res.status(400).json({resdata :"failed"});
        }
        
    }

    async signup(req, res) {

        try {

            // Validate data
            let validationError = Validation.AuthValidation.signUp(req.body);
            //console.log('>>>>>>>>> '+validationError)
            if (validationError !== null){
                throw(validationError)
            }

            // Get the required data for signing up
            let { firstName, lastName, email, password } = req.body

            let authDao = new AuthDao();
            let dbres = null;
            password = await encryptpass(password);
            console.log("pass isss >>>>>> " + password);
               

                dbres =  await authDao.saveNewUser(
                    firstName,
                    lastName,
                    email.toUpperCase(),
                    password,
                );

            if (dbres === 'SUCCESS'){
                let jwtoken =  generateJWTToken({email: email});
                res.set('X-ACCESS-TOKEN', jwtoken);
    
                return res.json({resdata :"success"});
                
            } else {
                throw (dbres)
            }

            // Clean data to use for signing up
            // const data = {
            //     firstname, lastname, email, telephone, password 
            // };

            // return res.status(201).json(Dummy.signUpData());

            
            
        } catch (err) {
            console.log(err);

            return res.json({resdata :"failed"});
        }
    }

}