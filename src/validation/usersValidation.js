const joi = require("joi");

const validationUserSignup = (object)=>{
    const schema = joi.object().keys({
        firstname: joi
        .string()
        .required()
        .trim()
        .error(new Error("Please provide firstname")),

        lastname: joi
        .string()
        .required()
        .trim()
        .error(new Error("please provide lastname")),

        email : joi
        .string()
        .email({tlds: {allow: false}})
        .required()
        .trim()
        .error(new Error("Please provide a valid email")),

        password: joi
        .string()
        .min(8)
        .required()
        .trim()
        .error(()=> new Error("Please provide password, with minimum of 8 characters"))
    });

    return schema.validate(object)
};


const validationUserLogin = (object)=>{
    const schema = joi.object().keys({
        email: joi
        .string()
        .email({tlds: {allow: false}})
        .required()
        .error(new Error("Incorrect email or password")),

        password: joi
        .string()
        .min(8)
        .required()
        .error(new Error("Incorrect email or password"))
    });

    return schema.validate(object)
}


module.exports = {validationUserSignup, validationUserLogin};