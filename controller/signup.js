const bcrypt = require("bcrypt");
const User = require("../models/user"); // Ensure the path is correct based on your project structure

exports.Signup = (req, res) => {
  res.render("signup");
};

exports.register = async (req, res) => {
  let {
    name,
    lname,
    username,
    email,
    phone,
    accno,
    ifsc,
    bname,
    city,
    country,
    password,
  } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).send(
        `<script>alert("User already used");</script>
         <meta http-equiv="refresh" content="0.1;url=/signup">`
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({
      name,
      lname,
      username,
      email,
      phone,
      password: hashedPassword,
      bankdetails: {
        accno,
        ifsc,
        bname,
      },
      address: {
        city,
        country,
      },
    });

    res.status(201).send(
      `<script>alert("Registration successful");</script>
       <meta http-equiv="refresh" content="0.1;url=/login">`
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
