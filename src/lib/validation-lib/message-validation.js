
import validator from 'validator';

export default class MessageValidation {


    /**
     * @description gets dummy data for list of post
     */
    static validateNewChat(data) {
        let {
            message,
        } = data;

        const errors = {};

        // Validation for message
        if (message == undefined || message == null) { errors.name = 'message'; errors.msg = ' Message is Required'; throw errors; }
        if (validator.isEmpty(message)) { errors.name = 'message'; errors.msg = ' Message is Required'; throw errors; }
        if (message.length > 3000) { errors.name = 'message'; errors.msg = ' Not more than 3000 characters'; throw errors; }
    }
}