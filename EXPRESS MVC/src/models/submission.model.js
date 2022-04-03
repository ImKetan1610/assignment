const mongoose = require("mongoose");

/*
Submission :- 
has some submissions related details like 
evaluation_id(this will reference the evaluations collection), 
student_id(this will reference the user collection), 
marks, 
createdAt, updatedAt
*/


const submissionSchema = new mongoose.Schema({
    evaluationId: {type:mongoose.Schema.Types.ObjectId, ref:"evaluation", required:true},
    studentId: {type: mongoose.Schema.Types.ObjectId, ref:"user", required: true},
    marks:{type: Number, required: true}
},{
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model("submission", submissionSchema)

