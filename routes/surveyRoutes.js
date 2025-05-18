import express from 'express';
// import multer from 'multer';
import { createSurvey } from '../controllers/surveyController.js';

const router = express.Router();
// const upload = multer({ dest: 'uploads/' });

// router.post('/upload', upload.single('file'), createSurvey);

import multer from 'multer';
const upload = multer({ dest: 'uploads/' });

router.post('/upload', (req, res, next) => {
  upload.single('file')(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: 'Multer Error: ' + err.message });
    } else if (err) {
      return res.status(500).json({ error: 'Unknown Upload Error: ' + err.message });
    }
    next();
  });
}, createSurvey);




export default router;
