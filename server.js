const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

// Your SerpApi key here — make sure to keep it secret in environment variables!
const SERPAPI_KEY = process.env.SERPAPI_KEY || 'e701f5719d68ea1e26cd019955b25bc01bb5d447b0e64c13795b26a5d8c5f22a';

app.get('/api/search', async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ error: 'Missing query parameter q' });
  }

  try {
    const response = await axios.get('https://serpapi.com/search', {
      params: {
        q: query,
        api_key: SERPAPI_KEY,
        // Optional params:
        engine: 'google', // default search engine
        hl: 'en',         // language
        gl: 'us'          // country
      },
    });

    // SerpApi returns lots of data. Send relevant parts or the full data
    res.json(response.data);
  } catch (error) {
    console.error('SerpAPI search failed:', error.message);
    res.status(500).json({ error: 'SerpAPI search failed.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
