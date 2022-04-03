const mongoose = require("mongoose");
/*
Create a user model and have these fields :- 
name ( required ) 
email ( required ) 
password ( required ) 
timestamps
*/
const userSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true}
},
{
    timestamps:true,
    versionKey: false
});

module.exports = mongoose.model("user",userSchema)