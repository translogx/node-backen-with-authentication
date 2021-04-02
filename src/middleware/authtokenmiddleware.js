
import jwt from 'jsonwebtoken';

export default function authenticateToken(){
    return (req, res, next) => {
        // Gather the jwt access token from the request header
        const authHeader = req.headers['x-authorization-bearer']
        const token = authHeader && authHeader.split(' ')[1]
        //console.log(req.href)
    
        if (token == null){
            if (req.path === '/') return res.render('register', {exception: true, mesg: "Please login or Signup to view the page."})
        }  // if there isn't any tokene
        else{
            jwt.verify(token, "123456789", (err, user) => {
                console.log(err)
                if (err){
                    if (req.path === '/') return res.render('register', {exception: true, mesg: "Please login or Signup to view the page."})
                } 
                req.user = user
                 // pass the execution off to whatever request the client intended
            })
        }

        next()
        
    }
}