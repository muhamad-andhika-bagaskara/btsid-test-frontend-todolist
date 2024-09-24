// src/pages/api/proxy/[...path].js
import axios from 'axios';

export default async function handler(req, res) {
  const { path } = req.query; // Capture the dynamic path

  try {
    const response = await axios({
      method: req.method,
      url: process.env.NEXT_PUBLIC_API_URL + path.join('/'), // Forward to the external HTTP API
      data: req.body, // Forward the request body for POST, PUT, etc.
      params: req.query, // Forward query parameters if needed
    });

    // Send the response data back to the client
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error forwarding request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
