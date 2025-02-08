const express = require('express');
const router = express.Router();
const { getFuelData, getFlightPlans, getFlightPlanDetails } = require('../controllers/flightController');

router.get('/fuel-data', getFuelData);
router.get('/flightplans', getFlightPlans);
router.get('/flightplan/:id', getFlightPlanDetails);

module.exports = router;
