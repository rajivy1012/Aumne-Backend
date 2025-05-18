import mongoose from 'mongoose';

const surveySchema = new mongoose.Schema({
  surveyId: String,
  status: String,
  questions: Array,
  formUrl: String,
  formId: String
});

const Survey = mongoose.model('Survey', surveySchema);
export default Survey;