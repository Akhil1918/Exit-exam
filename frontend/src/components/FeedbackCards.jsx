import React from 'react';
import { Card, CardContent, Typography, Grid, IconButton, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Rating from '@mui/material/Rating';

const FeedbackCards = ({ feedbacks, handleEdit, handleDelete }) => {
  return (
    <Grid container spacing={2} sx={{ p: 3 }}>

      {feedbacks.map((feedback) => (
        <Grid item xs={12} sm={6} md={4} key={feedback._id}>

          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent>

              <Typography variant="h6" gutterBottom>
                Course Name: {feedback.courseName}
              </Typography>

              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Course ID: {feedback.courseID}
              </Typography>

              <Typography variant="body2" color="text.secondary" gutterBottom>
                Duration: {feedback.duration}
              </Typography>

              <Rating value={feedback.rating} readOnly precision={0.5} />
              
              <Typography variant="body2" sx={{ mt: 1 }}>
                 Comments: {feedback.comments}
              </Typography>

              <Stack direction="row" spacing={1} sx={{ mt: 2 }}>

                <IconButton onClick={() => handleEdit(feedback)}>
                  <EditIcon color="primary" />
                </IconButton>

                <IconButton onClick={() => handleDelete(feedback._id)}>
                  <DeleteIcon color="error" />
                </IconButton>
                

              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default FeedbackCards;
