const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

const SERPAPI_KEY = process.env.SERPAPI_KEY || 'e701f5719d68ea1e26cd019955b25bc01bb5d447b0e64c13795b26a5d8c5f22a';

app.get('/api/search', async (req, res) => {
  const {
    q,
    location,
    uule,
    ludocid,
    lsig,
    kgmid,
    si,
    ibp,
    uds,
    google_domain,
    gl,
    hl,
    cr,
    lr,
    tbs,
    safe,
    nfpr,
    filter,
    tbm,
    start,
    num,
    device,
    no_cache,
    async: asyncParam,
    output
  } = req.query;

  if (!q) {
    return res.status(400).json({ error: 'Missing required query parameter: q' });
  }

  try {
    // Build params for SerpApi request
    const params = {
      q,
      api_key: SERPAPI_KEY,
      engine: 'google',
      // Only add params if they are provided, otherwise skip (avoid sending undefined)
      ...(location && { location }),
      ...(uule && { uule }),
      ...(ludocid && { ludocid }),
      ...(lsig && { lsig }),
      ...(kgmid && { kgmid }),
      ...(si && { si }),
      ...(ibp && { ibp }),
      ...(uds && { uds }),
      ...(google_domain && { google_domain }),
      ...(gl && { gl }),
      ...(hl && { hl }),
      ...(cr && { cr }),
      ...(lr && { lr }),
      ...(tbs && { tbs }),
      ...(safe && { safe }),
      ...(nfpr && { nfpr }),
      ...(filter && { filter }),
      ...(tbm && { tbm }),
      ...(start && { start }),
      ...(num && { num }),
      ...(device && { device }),
      ...(no_cache && { no_cache }),
      ...(asyncParam && { async: asyncParam }),
      ...(output && { output }),
    };

    const response = await axios.get('https://serpapi.com/search', { params });

    res.json(response.data);
  } catch (error) {
    console.error('SerpAPI search failed:', error.response?.data || error.message);
    res.status(500).json({ error: 'SerpAPI search failed.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
