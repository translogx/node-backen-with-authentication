import validator from 'validator';

export default class AuthValidation {


    static signUp(data) {

        let {
            firstName, lastName, email, password
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

        if ( password == undefined || password == null ) { return 'Password is Required' }
            if (password.length < 6 || password.length > 20) { return 'Password should be Between 6 and 20 Characters'  }

        return null
    }

    static signIn(data) {

        let {
            email, password
        } = data;

        const errors = [];
        //Validate email
        if ( email == undefined || email == null ) { return 'Email is Required' }
        if ( !validator.isEmail(email)) { return 'Invalid Email'}

        if ( password == undefined || password == null ) { return 'Password is Required' }
            if (password.length < 6 || password.length > 20) { return 'Password should be Between 6 and 20 Characters'  }


        return null
    }

}