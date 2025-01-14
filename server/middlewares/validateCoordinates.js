module.exports = (req, res, next) => {
  const { lat, lon } = req.body;

  if (!lat || !lon) {
    return res
      .status(400)
      .json({ error: 'Latitude and Longitude are required' });
  }

  if (lat < -90 || lat > 90) {
    return res
      .status(400)
      .json({ error: 'Latitude must be between -90 and 90' });
  }
  if (lon < -180 || lon > 180) {
    return res
      .status(400)
      .json({ error: 'Longitude must be between -180 and 180' });
  }

  next(); // Proceed to the next middleware or route handler
};
