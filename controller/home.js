exports.home = (req, res) => {
  res.render("home1", { name: req.user.name });
};
