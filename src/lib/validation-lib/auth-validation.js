import validator from 'validator';

export default class AuthValidation {


    static signUp(data) {

        let {
            firstName, lastName, email, password, isSocialSignUp
        } = data;

        let errors = {};

        //Validate first name
        if (firstName == undefined || firstName == null) { return 'Field firstName is required'; }
        if ( firstName.length < 2 || firstName.length > 50) { return 'Field firstName should be Between 3 and 50 Characters' }

        //Validate last name
        if ( lastName == undefined || lastName == null ) { return 'Field lastName is required'; }
        if ( lastName.length < 2 || lastName.length > 50) { return 'Field lastName should be Between 3 and 50 Characters' }

        //Validate email
        if ( email == undefined || email == null ) { return 'Email is Required' }
        if ( !validator.isEmail(email)) { return 'Invalid Email'}

        //Validate telephone
        // if ( telephone == undefined || telephone == null ) { errors.push( { name: 'telephone', msg: 'Phone is Required' }); throw errors; }
        // if ( telephone.length < 5 || telephone.length > 15) { errors.push( { name: 'telephone', msg: 'Between 5 and 15 Characters' }); throw errors; }
        if (isSocialSignUp == undefined & isSocialSignUp == null || isSocialSignUp == 'N' || isSocialSignUp == false){
            //Validate last name
            if ( password == undefined || password == null ) { return 'Password is Required' }
            if (password.length < 6 || password.length > 20) { return 'Password should be Between 6 and 20 Characters'  }

            // const pattern = /^(?:[0-9]+[a-z]|[a-z]+[0-9])[a-z0-9]*$/i;
            const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/;
        
            if (!pattern.test(password)) { return 'Password should contain at least one letter and digit' }
        }
        else if (isSocialSignUp !== undefined & isSocialSignUp !== null & (isSocialSignUp == 'Y' || isSocialSignUp == true)){
            return null
        }else if (isSocialSignUp == undefined || isSocialSignUp == null || isSocialSignUp !== 'Y' || isSocialSignUp !== 'N'){
            return 'Invalalid value for isSocialSignUp'
        }


        
        
        // /^(?:[0-9]+[a-z]|[a-z]+[0-9])[a-z0-9]*$/i
        return null
    }

    static signIn(data) {

        let {
            email, password, isSocialSignIn
        } = data;

        const errors = [];
        //Validate email
        if ( email == undefined || email == null ) { return 'Email is Required' }
        if ( !validator.isEmail(email)) { return 'Invalid Email'}

        if (isSocialSignIn == undefined || isSocialSignIn == null || isSocialSignIn == 'N' || isSocialSignIn == false){
            //Validate last name
            if ( password == undefined || password == null ) { return 'Password is Required' }
            if (password.length < 6 || password.length > 20) { return 'Password should be Between 6 and 20 Characters'  }
        } else if (isSocialSignIn !== undefined || isSocialSignIn !== null & (isSocialSignIn == 'Y' || isSocialSignIn == true)){
            return null
        }else if (isSocialSignIn == undefined || isSocialSignIn == null || isSocialSignIn !== 'Y' || isSocialSignIn !== 'N'){
            return 'Invalalid value for isSocialSignUp'
        }

        return null
    }

    static generateEmailConfirmationToken(data) {

        let {
            email,
        } = data;

        const errors = [];

        //Validate email
        if ( email == undefined || email == null ) { return 'Email is Required' }
        if ( !validator.isEmail(email)) { return 'Invalid Email'}

        return null
    }


    static resetPassword(data) {

        let { newPassword, email } = data;

        // const errors = [];
        //Validate last name
        if ( newPassword == undefined || newPassword == null ) { return 'Password is Required' }
        if (newPassword.length < 6 || newPassword.length > 20) { return 'Password should be Between 6 and 20 Characters'  }

        const pattern = /^(?:[0-9]+[a-z]|[a-z]+[0-9])[a-z0-9]*$/i;
        if (!pattern.test(newPassword)) { return 'Password should contain at least one letter and digit' }
        
        //Validate email
        if ( email == undefined || email == null ) { return 'Email is Required' }
        if ( !validator.isEmail(email)) { return 'Invalid Email'}

        return null

    }
}