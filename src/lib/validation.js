
import  * as uuidv4  from 'uuid';
import UserValidation from './validation-lib/user-validation';
import PostValidation from './validation-lib/post-validation';
import GenericValidation from './validation-lib/generic-validation';
import MessageValidation from './validation-lib/message-validation';
import ImageValidation from './validation-lib/image-validation';
import AuthValidation from './validation-lib/auth-validation';

export default class Validation {

    // Validation for post
    static PostValidation = PostValidation;

    // User Validation
    static UserValidation = UserValidation;

    // Generic Validation
    static GenericValidation = GenericValidation;

    // Generic Validation
    static MessageValidation = MessageValidation;

    // Image validation
    static ImageValidation = ImageValidation;

    // Auth validation
    static AuthValidation = AuthValidation;

    /**
     * @description validate titles for rss feeds, this validation needs to be put somewhere
     */
    static validateAddingTitles(data) {
        let {
            titles
        } = data;

        const errors = {};

        // Validation for photos
        if (titles == undefined || titles == null) { errors.name = 'titles'; errors.msg = 'Titles are required'; throw errors; }
        if (!Array.isArray(titles)) { errors.name = 'titles'; errors.msg = 'Invalid titles structure'; throw errors; }

        titles.forEach((element, index) => {
            if (!uuidv4.validate(element)) { errors.name = `titles.${ index }`; errors.msg = 'Invalid title id'; throw errors; }
        });

    }

}