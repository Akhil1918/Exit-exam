require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const feedbackRoutes = require('./routes/feedbackRoutes');
const app = express();
const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('Connection error:', err));

app.use(cors());
app.use(express.json());
app.use('/api/feedback', feedbackRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    error: 'Server error. Please try again later.' 
  });
});

app.listen(PORT, () => 
  console.log(`Server running on port ${PORT}`)); 