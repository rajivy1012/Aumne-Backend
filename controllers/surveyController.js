import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import Survey from '../models/surveyModel.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = 'AIzaSyDHK9hF4fl_jF8KNqevZEA2m42OnU9hRJA';
const ai = new GoogleGenerativeAI(GEMINI_API_KEY);

// async function parseQuestionsWithGemini(text) {
//   try {
//     const model = ai.getGenerativeModel({ model: 'gemini-2.0-flash' });

//     const prompt = `Based on the following context, generate well-structured  questions. Each question must have 4 plausible options(only the options and no reason ) in JSON array  format with keys:  question, options.

// Context: """
// ${text}
// """`;

//     const result = await model.generateContent(prompt);
//     const output = result.response.text();
//     console.log('Gemini output:', output);
//     return JSON.parse(output);
//   } catch (error) {
//     console.error('Gemini parsing error:', error.message);
//     throw new Error('Failed to parse questions with Gemini');
//   }
// }
async function parseQuestionsWithGemini(text) {
    try {
      const model = ai.getGenerativeModel({ model: 'gemini-2.0-flash' });
  
      const prompt = `Given the following context, generate a JSON array of multiple-choice questions. 
  Each object must follow this structure: 
  { "question": "question text", "options": ["option1", "option2", "option3", "option4"] }.
  
  Only return the raw JSON array, do NOT include markdown formatting or explanation.
  
  Context: """
  ${text}
  """`;
  
      const result = await model.generateContent(prompt);
      let output = result.response.text();
  
      // Strip markdown fences just in case
      output = output.replace(/```(?:json)?[\s\n]?|```/gi, '').trim();
  
      console.log('Sanitized Gemini output:', output);
      return JSON.parse(output);
    } catch (error) {
      console.error('Gemini parsing error:', error.message);
      throw new Error('Failed to parse questions with Gemini');
    }
  }
  
  
export const createSurvey = async (req, res) => {
  try {
    const fileContent = fs.readFileSync(req.file.path, 'utf-8');
    const questions = await parseQuestionsWithGemini(fileContent);

    const surveyId = uuidv4();

    const newSurvey = new Survey({
      surveyId,
      status: 'draft',
      questions,
      formUrl: null,
      formId: null
    });
    await newSurvey.save();

    // Return structured questions directly to frontend
    res.json({ surveyId, status: 'draft', questions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to process the file and generate questions' });
  }
};