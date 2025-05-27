const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

const SERPAPI_KEY = 'YOUR_SERPAPI_KEY'; // Replace with your SerpAPI API key

app.get('/api/search', async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ error: 'Missing search query parameter "q".' });
  }

  try {
    const response = await axios.get('https://serpapi.com/search', {
      params: {
        q: query,
        api_key: e701f5719d68ea1e26cd019955b25bc01bb5d447b0e64c13795b26a5d8c5f22a,
        engine: 'google',
      },
    });

    // You can choose to return full response or just organic_results
    res.json(response.data);

  } catch (error) {
    console.error('SerpAPI search failed:', error.message);
    res.status(500).json({ error: 'SerpAPI search failed.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
