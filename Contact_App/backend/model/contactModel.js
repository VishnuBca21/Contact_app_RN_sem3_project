import mongoose from "mongoose";
import Joi from "joi";

const contactSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    name:{
        type: String,
        required: true,
        trim: true,
    },
    phone:{
        type:String,
        required: true,
        min: 10,
        max: 10,
        unique:true
    },
    email:{
        type: String,
        default: null
    },
    place:{
        type: String,
        default: null
    }
})

const ContactModel = mongoose.model("Contact", contactSchema);

const contactValidation = (contact)=>{
    const joiSchema = Joi.object({
        // userId:Joi.string().required(),
        name: Joi.string().required(),
        phone: Joi.string().required().length(10).pattern(/^[0-9]+$/),
        email: Joi.string().email(),
        place:Joi.string(),
    })
    return joiSchema.validate(contact);
}

export {ContactModel, contactValidation} ;