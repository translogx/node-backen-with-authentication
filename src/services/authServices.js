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
            //DbUtil.getMongoConnection();

           // let user = new User({email});
    
           let authdao = new AuthDao();
           let userdata;
           let isexist = await authdao.getUserByEmail(email.toUpperCase())
           console.log(isexist)
           if (isexist !== null) {
            console.log(isexist)
            
                userdata = isexist;
                console.log(userdata)
           }else{
            throw ("Invalid email or password" );
           }

                let jwtoken = generateJWTToken({userid:userdata.userid, email: userdata.email});

                res.set('X-ACCESS-TOKEN', jwtoken);

                 let respdata = {
                    //  "firstName": userdata.firstname,
                    //  "lastName": userdata.lastname,
                    //  "email": userdata.email,
                     "userid": userdata.userid,
                     //"isverified": userdata.isverified,
                     "msg": "Success",
                     "isSuccess": true,
                };
                 return res.status(200).json(respdata);
            
        } catch (error) {
            let respdata = {
                msg: error,
                isSuccess: false
            }
            return res.status(400).json(respdata);
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
            let { firstName, lastName, email, telephone, password, isSocialSignUp } = req.body

            let authDao = new AuthDao();
            let dbres = null;
            
            let userid = await generateuUserID((firstName + lastName + email).toUpperCase());

                
            if (isSocialSignUp == undefined || isSocialSignUp == null || (isSocialSignUp == 'N' || isSocialSignUp == false)){


                password = await encryptpass(password);

                dbres =  await authDao.saveNewUser(
                    firstName,
                    lastName,
                    "",
                    email,
                    password,
                    userid
                )
            }else{

                dbres =  await authDao.saveNewUser(
                    firstName,
                    lastName,
                    "",
                    email,
                    null,
                    userid
                )

            }

            if (dbres == 'SUCCESS'){

                let jwtoken = generateJWTToken({userid:userid, email: email});
                res.set('X-ACCESS-TOKEN', jwtoken);
                //console.log("Message sent: %s", info.messageId);
    
                //console.log(info);
    
                let respdata = {

                    // "firstName": firstName,
                    // "lastName": lastName,
                    // "email": email,
                    //"userid": userid,
                   // "isverified": 'N',
                    "msg": "User created successfully",
                    "isSuccess": true
                };
    
                return res.status(201).json(respdata);
                
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
            let respdata = {
                msg: err,
                isSuccess: false
            }
            return res.status(400).json(respdata);
        }
    }

}