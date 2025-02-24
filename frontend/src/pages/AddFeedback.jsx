import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Rating, Stack } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddFeedback = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    courseName: '',
    duration: '',
    comments: '',
    rating: 3,
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!form.courseName.trim()) newErrors.courseName = 'Course name is required';
    if (!form.duration.match(/^\d+ weeks$/)) newErrors.duration = 'Invalid duration format (e.g., "4 weeks")';
    if (!form.comments.trim()) newErrors.comments = 'Comments are required';
    if (form.rating < 1 || form.rating > 5) newErrors.rating = 'Rating must be between 1-5';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const { data } = await axios.post('http://localhost:5000/api/feedback', form);
      alert('Feedback added successfully!');
      navigate('/');
    } catch (error) {
      alert(`Error: ${error.response?.data?.error || error.message}`);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Add New Feedback
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            label="Course Name"
            value={form.courseName}
            onChange={(e) => setForm({ ...form, courseName: e.target.value })}
            error={!!errors.courseName}
            helperText={errors.courseName}
            fullWidth
          />

          <TextField
            label="Duration (e.g., 4 weeks)"
            value={form.duration}
            onChange={(e) => setForm({ ...form, duration: e.target.value })}
            error={!!errors.duration}
            helperText={errors.duration || 'Format: "X weeks"'}
            fullWidth
          />

          <TextField
            label="Comments"
            multiline
            rows={4}
            value={form.comments}
            onChange={(e) => setForm({ ...form, comments: e.target.value })}
            error={!!errors.comments}
            helperText={errors.comments}
            fullWidth
          />

          <Box>
            <Typography component="legend">Rating</Typography>
            <Rating
              value={form.rating}
              precision={0.5}
              onChange={(_, value) => setForm({ ...form, rating: value })}
              size="large"
            />
            {errors.rating && (
              <Typography color="error" variant="body2">
                {errors.rating}
              </Typography>
            )}
          </Box>

          <Button type="submit" variant="contained" size="large" fullWidth>
            Submit Feedback
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default AddFeedback;