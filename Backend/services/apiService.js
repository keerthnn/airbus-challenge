const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.API_KEY;

const encodeBase64 = (username, password = '') => {
  return Buffer.from(`${username}:${password}`).toString('base64');
};

const axiosInstance = axios.create({
  headers: {
    Authorization: `Basic ${encodeBase64(API_KEY)}`,
  },
});

const MAX_RETRIES = 5;
const RETRY_DELAY = 1000; // 1 second initial delay

const fetchWithRetry = async (url, retries = 0) => {
  try {
    return await axiosInstance.get(url);
  } catch (error) {
    if (error.response && error.response.status === 429 && retries < MAX_RETRIES) {
      const delay = RETRY_DELAY * Math.pow(2, retries);
      console.log(`Rate limit exceeded, retrying in ${delay} ms...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return fetchWithRetry(url, retries + 1);
    }
    throw error;
  }
};

module.exports = { axiosInstance, fetchWithRetry };
