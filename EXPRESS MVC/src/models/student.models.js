const mongoose = require("mongoose");

/*
Student :- has fields like 
roll id, current batch, 
createdAt, updatedAt
*/

const studentSchema = new mongoose.Schema({
    rollId:{type:Number, required:true},
    currentBatch :{type:String, required: true},
    batchId:{ type: mongoose.Schema.Types.ObjectId, ref:"batch", required: true},
    userId:{type: mongoose.Schema.Types.ObjectId, ref:"user", required: true},
    evaluationID:{type: mongoose.Schema.Types.ObjectId, ref:"evaluation", required: true},
},
{
    versionKey:false,
    timestamps:true
})

module.exports = mongoose.model("student",studentSchema)
