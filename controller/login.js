const bcrypt = require("bcrypt");
const User = require("../models/user");
const cookie = require("../utilities/cookies");

exports.login = (req, res) => {
  res.render("login");
};

exports.loginPost = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).send(
        `<script>alert("Invalid email or password");</script>
         <meta http-equiv="refresh" content="0.1;url=/login">`
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send(
        `<script>alert("Invalid email or password");</script>
         <meta http-equiv="refresh" content="0.1;url=/login">`
      );
    }

    // Successful login, set the token cookie
    cookie.setTokenCookie(user, res);

    res.redirect("/home");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
};
