const { get } = require('mongoose');
const Feedback = require('../models/Feedback');
const express = require('express');
const router = express.Router();

const getFeedback = async (req, res) => {
  try {
    const id = req.params.id;
    const feedback = await Feedback.findById(id);
    if (!feedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }
    res.json({ data: feedback });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json({ success: true, data: feedbacks });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


const createFeedback = async (req, res) => {
  try {
    const newFeedback = new Feedback({
      ...req.body,
      courseID: `C${Math.floor(100 + Math.random() * 900)}` // Generate 3-digit ID
    });
    
    await newFeedback.save();
    res.status(201).json({ success: true, data: newFeedback });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};


const updateFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!feedback) {
      return res.status(404).json({ 
        success: false, 
        error: 'Feedback not found' 
      });
    }
    
    res.json({ success: true, data: feedback });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};


const deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    
    if (!feedback) {
      return res.status(404).json({ 
        success: false, 
        error: 'Feedback not found' 
      });
    }
    
    res.json({ 
      success: true, 
      data: { message: 'Feedback deleted successfully' } 
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}; 

module.exports = { getFeedback, getAllFeedback, createFeedback, updateFeedback, deleteFeedback };