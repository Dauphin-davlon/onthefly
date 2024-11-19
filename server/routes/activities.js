import express from 'express';
import ActivitiesController from '../controllers/activities.js';

const router = express.Router();

// GET all activities
router.get('/', ActivitiesController.getActivities);

// GET all activities associated with a specific trip
router.get('/:trip_id', ActivitiesController.getTripActivities);

// POST a new activity for a specific trip
router.post('/:trip_id', ActivitiesController.createActivity);

// DELETE a specific activity
router.delete('/:id', ActivitiesController.deleteActivity);

// PATCH to update the number of votes for a specific activity
router.patch('/:id', ActivitiesController.updateActivityLikes);

export default router;
