// import mongoose from 'mongoose';

// const UserSchema = mongoose.Schema({
//     userid:{
//         type: String,
//         unique: true
//     },
//     firstname:      String,
//     lastname:       String,
//     othername:     String,
//     telephone:      String,
//     email:          {type: String, require: true, unique: true},
//     password:       {type: String, require: true},
//     createdate:    {type: Date, default: Date.now()},
//     isverified:    {type: Boolean, default: false}
// });

// export default mongoose.model('User',UserSchema);

export default class UserModel{

    constructor(firstname, lastname, othername, email, password) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.othername = othername;
        this.email = email,
        this.password = password;
    }
    

}