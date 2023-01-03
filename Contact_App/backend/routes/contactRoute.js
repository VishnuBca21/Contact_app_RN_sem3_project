// importing express
import express from 'express'
import auth from '../auth/auth.js';
// import Route Controller
import {createContact, getContact, updateContact, deleteContact, getOneContact} from '../Controller/contactController.js'

// initialize router
const router = express.Router();
    
//************* Register route**************
router.get("/getcontact", [auth], getContact);
router.get("/getonecontact/:contactId", [auth], getOneContact);
router.post("/createcontact", [auth], createContact);
router.put("/updatecontact", [auth], updateContact);
router.post("/deletecontact", [auth], deleteContact);

export default router;