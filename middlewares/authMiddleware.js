const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    // decrypt the token
    const token = req.headers.authorization.split(" ")[1];
    const decrypt = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decrypt.userId;
    next();
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
    });
  }
};
