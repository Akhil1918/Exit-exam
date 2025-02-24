import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FeedbackCards from '../components/FeedbackCards';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/feedback');
        setFeedbacks(data.data);
      } catch (error) {
        setError(error.response?.data?.error || 'Failed to fetch feedback');
      } finally {
        setLoading(false);
      }
    };
    fetchFeedbacks();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      try {
        await axios.delete(`http://localhost:5000/api/feedback/${id}`);
        setFeedbacks(feedbacks.filter(fb => fb._id !== id));
      } catch (error) {
        alert(`Delete failed: ${error.response?.data?.error || error.message}`);
      }
    }
  };

  const handleEdit = (feedback) => {
    navigate(`/feedback/${feedback._id}`);
  };

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <FeedbackCards 
        feedbacks={feedbacks} 
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </Box>
  );
};

export default Dashboard