module.exports = (error, req, res, next) => {
  console.log(error.message);
  return res.status(500).json({
    error: 'Something went wrong, please try again later.',
  });
};
