
import fs from 'fs';
// import  userDataFile from './userDataFile.json' 


export default class AuthDao{

    async saveNewUser(fname, lname, eMail, pass) {


    let userdata = { 
        firstname: fname,
        lasname: lname, 
        email: eMail,
        password: pass,
    };

    try {
    
        let data = JSON.stringify(userdata, null, 2);
        
        fs.writeFile('userDataFile.json' 
        , data, (err) => {
            if (err) throw err;
            console.log('Data written to file');
        });
        

            return 'SUCCESS';
    } catch (error) {
        return 'failed';}

    }

    async getUser(email, password){
        let user;
    try {
        
        var data = fs.readFileSync('userDataFile.json');

         user = JSON.parse(data);
            
            if (user.email.toUpperCase() === email && user.password === password){
                console.log(user);
            console.log(password);
                return user;
            }else{
                console.log("here")
            return "failed"
            }
        

        // fs.readFileSync('userDataFile.json', (err, data) => {
        //     if (err) throw err;
        //     user = JSON.parse(data);
            
        //     if (user.email.toUpperCase() === email && user.password === password){
        //         console.log(user);
        //     console.log(password);
        //         return user;
        //     }else{
        //         console.log("here")
        //     return "failed"
        //     }
        // });

        } catch (error) {
            console.log(error)
            return "failed"
        }
    }

    

}

