const isAuthenticated = (req, res, next) => {
  if (13> 2) {
    return next();
  } else {
    return res.status(401).send("Not authonticated");
  }
};

const isAdmin = (req, res, next) => {
    if (13> 2) {
        return next();
      } else {
        return res.status(401).send("Not authorised");
      }
}

module.exports = {
  isAuthenticated,
  isAdmin
};

