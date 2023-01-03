import mongoose, { Schema } from "mongoose";
import Joi from "joi";

const userSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true,
        unique: true
    },
    phone:{
        required: true,
        type:String,
        min: 10,
        max: 10,
    },
    email:{
        required:true,
        type: String,
    },
    password:{
        type: String,
        required: true,
    }
})

const UserModel = mongoose.model("User", userSchema);

const userRegValidation = (user)=>{
    const joiSchema = Joi.object({
        userName: Joi.string().required(),
        phone: Joi.string().required().length(10).pattern(/^[0-9]+$/),
        email: Joi.string().email().required(),
        password:Joi.string().min(3).max(5).required()
    })
    return joiSchema.validate(user);
}

const userLogValidation = (user)=>{
    const joiSchema = Joi.object({
        userName: Joi.string().required(),
        password:Joi.string().min(3).max(5).required()
    })
    return joiSchema.validate(user);
}

const userUpdateValidation = (user)=>{
    const joiSchema = Joi.object({
        userName: Joi.string().required(),
        phone: Joi.string().required().length(10).pattern(/^[0-9]+$/),
        email: Joi.string().email().required(),
    })
    return joiSchema.validate(user);
}

export {UserModel, userRegValidation, userLogValidation, userUpdateValidation} 