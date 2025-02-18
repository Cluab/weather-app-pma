module.exports = (req, res, next) => {
  const { lat, lon } = req.body;

  if (!lat || !lon) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  next();
};
