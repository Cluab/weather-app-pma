module.exports = (req, res, next) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) {
    return res
      .status(400)
      .json({ error: 'Latitude and Longitude are required' });
  }
  next();
};
