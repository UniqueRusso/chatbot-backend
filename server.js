const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

app.get('/api/search', async (req, res) => {
  const query = req.query.q;

  try {
    const response = await axios.get('https://api.duckduckgo.com/', {
      params: {
        q: query,
        format: 'json',
        no_html: 1,
        no_redirect: 1,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'DuckDuckGo search failed.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
