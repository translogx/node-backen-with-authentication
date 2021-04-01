import validator from 'validator';

export default class ImageValidation {


    static validateBase64Image(data) {

        const {file} = data;

        const errors = {};

        if (file == undefined || file == null) { errors.name = 'file'; errors.msg = ' File is Required'; throw errors; }

        if (!validator.isBase64(file)) { errors.name = 'file', errors.msg = 'File is not a valid base64 string'; throw errors; }
    }
}