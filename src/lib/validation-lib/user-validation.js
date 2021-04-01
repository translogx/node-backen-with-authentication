
import validator from 'validator';
export default class UserValidation {


    /**
     * @description gets dummy data for list of post
     */
    static searchUserByNameValidation(data) {
        let {
            name
        } = data;

        const errors = {};

        // Validation for photos
        if (name == undefined || name == null) { errors.name = 'name'; errors.msg = 'Name of ueer is required'; throw errors; }
        if (name.length < 2 || name.length > 50) { errors.name = 'name'; errors.msg = 'Between 2 and 50 Characters'; throw errors; }
    }

    static updateProfile(data) {

        let {
            firstName, lastName, email, telephone, bio, interests
        } = data;

        const errors = {};

        //Validate first name
        if (firstName == undefined || firstName == null) { errors.name = 'firstName'; errors.msg = 'First name is Required'; throw errors; }
        if (firstName.length < 2 || firstName.length > 50) { errors.name = 'firstName'; errors.msg = 'Between 3 and 50 Characters'; throw errors; }

        //Validate last name
        if (lastName == undefined || lastName == null) { errors.name = 'lastName'; errors.msg = 'Last name is Required'; throw errors; }
        if (lastName.length < 2 || lastName.length > 50) { errors.name = 'lastName'; errors.msg = 'Between 3 and 50 Characters'; throw errors; }

        //Validate email
        if (email == undefined || email == null) { errors.name = 'email'; errors.msg = 'Email is Required'; throw errors; }
       // if ( !validator.isEmail(email)) { errors.push( { name: 'email', msg: 'Invalid Email' }); throw errors; }

        //Validate telephone
        if (telephone == undefined || telephone == null) { errors.name = 'telephone'; errors.msg; 'Phone is Required'; throw errors; }
        if ( telephone.length < 5 || telephone.length > 15) { errors.name = 'telephone', errors.msg = 'Between 5 and 15 Characters'; throw errors; }

        // /^(?:[0-9]+[a-z]|[a-z]+[0-9])[a-z0-9]*$/i ...

        //Validate telephone
        if ( bio != undefined && bio != null && bio.length > 2000) { errors.name = 'bio', errors.msg = 'Not more than 2000 characters'; throw errors; }

        // interests.forEach((element, index) => {
        //     if (!uuidv4.validate(element)) { errors.push( { name: `interests.${index}`, msg: 'Invalid interest id' } ) };
        // });

        if (errors.length > 0) { throw errors }
    }

    static changePassword(data) {

        let {
            newPassword, oldPassword
        } = data;

        const errors = [];
        //Validate last name
        if ( newPassword == undefined || newPassword == null ) { return 'Password is Required' }
        if (newPassword.length < 6 || newPassword.length > 20) { return 'Password should be Between 6 and 20 Characters'  }

        const pattern = /^(?:[0-9]+[a-z]|[a-z]+[0-9])[a-z0-9]*$/i;
        if (!pattern.test(newPassword)) { return 'Password should contain at least one letter and digit' }
        
        //Validate last name
        if ( oldPassword == undefined || oldPassword == null ) { return 'Password is Required' }
        if (oldPassword.length < 6 || oldPassword.length > 20) { return 'Password should be Between 6 and 20 Characters'  }
        
        if (!pattern.test(newPassword)) { return 'Password should contain at least one letter and digit' }

    }
}