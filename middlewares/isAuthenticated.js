const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.userData) {
    return next();
  }
  return res.status(401).json({ message: 'Unauthorized' });
};

module.exports = isAuthenticated;