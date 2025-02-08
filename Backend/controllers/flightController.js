const { axiosInstance, fetchWithRetry } = require('../services/apiService');

const getFuelData = async (req, res) => {
  console.log('Request received at /api/fuel-data with query:', req.query);
  const { aircraft, distance } = req.query;
  const url = `https://despouy.ca/flight-fuel-api/q/?aircraft=${aircraft}&distance=${distance}`;
  
  try {
    const response = await axiosInstance.get(url);
    console.log('Response from external API:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching fuel data:', error);
    res.status(500).json({ error: 'Failed to fetch fuel data' });
  }
};

const getFlightPlans = async (req, res) => {
  console.log('Request received at /api/flightplans with query:', req.query);
  const { fromICAO, toICAO } = req.query;

  try {
    const response = await fetchWithRetry(
      `https://api.flightplandatabase.com/search/plans?fromICAO=${fromICAO}&toICAO=${toICAO}`
    );
    console.log('Response from external API:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching flight plans:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to fetch flight plans. Please try again later.' });
  }
};

const getFlightPlanDetails = async (req, res) => {
  console.log('Request received at /api/flightplan/:id with param:', req.params.id);
  const { id } = req.params;

  try {
    const response = await fetchWithRetry(`https://api.flightplandatabase.com/plan/${id}`);
    console.log('Response from external API:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching flight details:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to fetch flight details. Please try again later.' });
  }
};

module.exports = { getFuelData, getFlightPlans, getFlightPlanDetails };
