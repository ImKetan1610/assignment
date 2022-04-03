const mongoose = require("mongoose");
/*
Post model 
with following fields 
title ( required ) 
body ( required ) 
user( references the user collection and is required )
*/
const postSchema = new mongoose.Schema({
    title:{type:String, required:true},
    body:{type:String, required:true},
    userId:{type:mongoose.Schema.Types.ObjectId, ref:"user", required:true}
},
{
    timestamps:true,
    versionKey: false
});

module.exports = mongoose.model("user",postSchema)