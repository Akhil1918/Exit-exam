const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  courseID: {
    type: String,
    required: true,
    unique: true,
    default: () => `C${Math.floor(100 + Math.random() * 900)}`, 
    validate: {
      validator: (v) => /^C\d{3}$/.test(v),
      message: 'Course ID must be in format CXXX'
    }
  },
  courseName: {
    type: String,
    required: [true, 'Course name is required'],
    trim: true
  },
  duration: {
    type: String,
    required: [true, 'Course duration is required'],
    match: [/^\d+ weeks$/, 'Duration must be in weeks (Example - "4 weeks")']
  },
  comments: {
    type: String,
    required: [true, 'Feedback comments are required'],
    maxlength: [500, 'Comments cannot exceed 500 characters']
  },
  rating: {
    type: Number,
    required: true,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5']
    },
}, { timestamps: true });

module.exports = mongoose.model('Feedback', feedbackSchema);  
