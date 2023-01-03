
// check if the user is authenticated or not 
import jwt from 'jsonwebtoken'

const auth = (req, res, next)=>{
    const token = req.header('x-auth-token')
    if(!token) return res.status(401).send('Access denied. No token')
    try {
        const decode = jwt.verify(token, process.env.SECRET)
        req.user = decode;
        next()
    } catch (error) {
        res.status(400).send('invalid Token')
    } 
}

export default auth;