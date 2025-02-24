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

          <Card sx={{ 
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            transition: 'transform 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateY(-4px)'
            }
          }}>
            <CardContent sx={{ 
              flexGrow: 1,
              background: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(8px)'
            }}>
              <Typography variant="h6" gutterBottom sx={{ 
                fontWeight: 600,
                color: '#2d3436'
              }}>
                {feedback.courseName}
              </Typography>

              <Typography variant="subtitle2" gutterBottom sx={{ 
                color: '#636e72',
                fontSize: '0.8rem',
                letterSpacing: '0.5px'
              }}>
                {feedback.courseID} • {feedback.duration}
              </Typography>

              <Rating 
                value={feedback.rating} 
                readOnly 
                precision={0.5}
                sx={{ color: '#fdcb6e', my: 1.5 }}
              />
              
              <Typography variant="body2" sx={{ 
                mt: 1.5,
                color: '#2d3436',
                lineHeight: 1.6,
                whiteSpace: 'pre-wrap'
              }}>
                {feedback.comments}
              </Typography>

              <Stack direction="row" spacing={1} sx={{ 
                mt: 2,
                justifyContent: 'flex-end',
                borderTop: '1px solid rgba(0,0,0,0.08)',
                pt: 1.5
              }}>

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
