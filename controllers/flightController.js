import Flight from '../models/flight.js';

export const createFlight = async (req, res) => {
  try {
    const flightData = req.body;

    const flight = new Flight(flightData);
    await flight.save();

    res.status(201).json({ message: 'Flight data saved successfully', flight });
  } catch (error) {
    console.error('Error saving flight data:', error);
    res.status(500).json({ message: 'Server error while saving flight data' });
  }
};

export const getAllFlights = async (req, res) => {
  try {
    const flights = await Flight.find().sort({ createdAt: -1 });
    res.status(200).json(flights);
  } catch (error) {
    console.error('Error fetching flight data:', error);
    res.status(500).json({ message: 'Server error while fetching flight data' });
  }
};

export const getFlightById = async (req, res) => {
  try {
    const { id } = req.params;
    const flight = await Flight.findById(id);
    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }
    res.status(200).json(flight);
  } catch (error) {
    console.error('Error fetching flight by ID:', error);
    res.status(500).json({ message: 'Server error while fetching flight by ID' });
  }
};

export const deleteFlight = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Flight.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Flight not found for deletion' });
    }
    res.status(200).json({ message: 'Flight deleted successfully' });
  } catch (error) {
    console.error('Error deleting flight:', error);
    res.status(500).json({ message: 'Server error while deleting flight' });
  }
};
