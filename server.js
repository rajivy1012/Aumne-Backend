import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import surveyRoutes from './routes/surveyRoutes.js';
const app = express();
app.use(cors());
app.use(express.json());


// connection 
// Connect to MongoDB
mongoose.connect('mongodb+srv://rajivbyadav1012:zVLVOzbHTTaCI2YG@cluster0.ijqj676.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
//  connection completed 

//   router connection 
app.use('/surveys', surveyRoutes);

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });



