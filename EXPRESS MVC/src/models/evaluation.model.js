/*
Evaluation :- 
has some evaluation related details like 
date_of_evaluation, instructor( this will reference the user collection), 
batch_id ( this will reference the batches collection)
*/

const mongoose = require("mongoose");

const evaluationSchema = new mongoose.Schema({
  dateOfEvaluation: { type: String, required: true },
  instructor: { type: String, required: true },
  batchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "batch",
    required: true,
  },
},
{
    versionKey: false,
    timestamps:true
});

const Evaluation = mongoose.model("evaluation",evaluationSchema);

module.exports = Evaluation;
