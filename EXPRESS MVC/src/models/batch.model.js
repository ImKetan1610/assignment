const mongoose = require("mongoose");

/* 
Batch :- 
has fields like 
Batch name, 
createdAt, updatedAt
*/

const batchSchema = new mongoose.Schema({
    batchName:{type:String, required:true},
},
{
    timestamps:true,
    versionKey:false
})


module.exports = mongoose.model("batch",batchSchema)