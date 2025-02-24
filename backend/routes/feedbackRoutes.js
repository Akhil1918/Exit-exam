const express = require('express');
const router = express.Router();
const {
    getFeedback,
  getAllFeedback,
  createFeedback,
  updateFeedback,
  deleteFeedback
} = require('../controllers/feedbackController');


router.route('/')
  .get(getAllFeedback)
  .post(createFeedback);

router.route('/:id')
   .get(getFeedback)
  .put(updateFeedback)
  .delete(deleteFeedback);

module.exports = router; 