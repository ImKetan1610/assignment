const mongoose = require("mongoose");

/*
Users :- has all the basic details like 
firstName, lastName, gender, dateOfBirth, 
type(type will be student, admin or instructor) , 
createdAt, updatedAt
*/

const userSchema = new mongoose.Schema(
    {
        firstName : {type:String, required:true},
        lastName : {type:String, required:true},
        gender : {type:String, required:true},
        dateOfBirth: {type:Date, required:true},
        type : {type:String,required:true, enum: ['Student', 'Admin', 'Instructor']},
    },
    {
        versionKey:false,
        timestamps:true
    }
)

const User = mongoose.model("user",userSchema)
module.exports = User;