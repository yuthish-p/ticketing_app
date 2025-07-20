const jwt = require("jsonwebtoken");

// TODO: not completed due to using mock login
async function Auth(req, res, next) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        status: "error",
        message: "Username and password are required"
      });
    }
    const payload = {
      username: username,
      
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "1h"
    });

    return res.status(200).json({
      status: "success",
      message: "Authenticated successfully",
      token: token
    });

  } catch (err) {
    console.error("Auth error:", err);
    return res.status(500).json({
      status: "error",
      message: "Authentication failed"
    });
  }
}

module.exports = {
  Auth,
};
