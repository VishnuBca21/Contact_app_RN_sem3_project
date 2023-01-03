// importing express
import express from 'express'
import auth from '../auth/auth.js';

// import Route Controller
import {register, login, updateUser, getUser} from '../Controller/userController.js'

// initialize router
const router = express.Router();
    
//************* Register route**************
router.post("/register",  register);

// ********************** Login route ******************
router.post('/login', login)

// ********************** Update route ******************
router.put('/updateuser', [auth], updateUser)

// ********************** Get route ******************
router.get('/getuser', [auth], getUser)



export default router;