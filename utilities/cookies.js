const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.setTokenCookie = (user, res, statusCode = 200) => {
  const token = jwt.sign({ id: user._id }, "shhhhhhhh", { expiresIn: "15m" });
  res.status(statusCode).cookie("token", token, {
    maxAge: 60 * 60 * 1000, // 15 minutes
    httpOnly: true,
  });
  console.log("Cookies Set");
};

exports.checkCookie = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send(
      `<script>alert("You must login First");</script>
       <meta http-equiv="refresh" content="0.1;url=/login">`
    );
  }
  const decode = jwt.verify(token, "shhhhhhhh");

  req.user = await User.findById(decode.id);
  console.log("Cookies Available");
  next();
};
