import { pool } from '../config/database.js';

// Create a new trip-destination entry
const createTripDestination = async (req, res) => {
  try {
    const { trip_id, destination_id } = req.body;
    const result = await pool.query(
      `INSERT INTO trips_destinations (trip_id, destination_id)
       VALUES ($1, $2)
       RETURNING *`,
      [trip_id, destination_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// Get all trip-destination entries
const getTripsDestinations = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM trips_destinations ORDER BY id ASC');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// Get all trips associated with a specific destination
const getAllTrips = async (req, res) => {
  try {
    const destination_id = parseInt(req.params.destination_id);
    const result = await pool.query(
      `SELECT trips.* 
       FROM trip_destinations 
       INNER JOIN trips ON trips_destinations.trip_id = trips.id
       WHERE trip_destinations.destination_id = $1`,
      [destination_id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// Get all destinations associated with a specific trip
const getAllDestinations = async (req, res) => {
  try {
    const trip_id = parseInt(req.params.trip_id);
    const result = await pool.query(
      `SELECT destinations.* 
       FROM trips_destinations 
       INNER JOIN destinations ON trips_destinations.destination_id = destinations.id
       WHERE trips_destinations.trip_id = $1`,
      [trip_id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// Export the functions
export default {
  createTripDestination,
  getTripsDestinations,
  getAllTrips,
  getAllDestinations
};
