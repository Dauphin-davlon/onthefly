import express from 'express'
import userTripController from '../controllers/users-trips.js'

const router = express.Router()

router.post('/create/:trip_id', userTripController.createTripUser)
router.get('/users/:trip_id', userTripController.getTripUsers)
router.get('/trips/:username', userTripController.getUserTrips)

export default router