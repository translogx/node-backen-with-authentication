import validator from 'validator';

export default class PostValidation {


    /**
     * @description validate new post
     */
    static validateNewPost(data) {
        let {
            message,
            photos
        } = data;

        const errors = {};

        // Validation for message
        if (message == undefined || message == null) { errors.name = 'message'; errors.msg = ' Message is Required'; throw errors; }; 
        if ( validator.isEmpty(message)) { errors.name =  'message'; errors.msg = ' Message is Required'; throw errors;  }; 
        if ( message.length > 3000) { errors.name =  'message'; errors.msg = ' Not more than 3000 characters'; throw errors;  }; 

        // Validation for photos
        if ( photos == undefined || photos == null ) { return; }
        if ( !Array.isArray(photos) ) { errors.name =  'photos'; errors.msg = 'Invalid photos structure'; throw errors;  }; 

        photos.forEach((element, index) => {
            if (!validator.isBase64(element)) { errors.name = `photos.${ index }`; errors.msg = 'Invalid image/photo type'; throw errors; };
        });

        if (errors.length > 0) { throw errors }

    }

    /**
     * @description validate new post comments
     */
    static validateNewPostComment(data) {
        let {
            message,
        } = data;

        const errors = {};

        // Validation for message
        console.log(message);
        if ( message == undefined || message == null ) { errors.name =  'message'; errors.msg = ' Message is Required'; throw errors; }; 
        if (validator.isEmpty(message)) { errors.name = 'message'; errors.msg = ' Message is Required'; throw errors; }; 
        if (message.length > 3000) {
            errors.name = 'message'; errors.msg = ' Not more than 3000 characters'; throw errors;
        }
         

    }
}