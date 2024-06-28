const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();
const multer = require("multer");
const cLogin = require("./controller/login");
const cSignup = require("./controller/signup");
const cHome = require("./controller/home");
const cookie = require("./utilities/cookies");
const itemForm = require("./controller/productForm");
const viewP = require("./controller/productView");
const upload = require("./utilities/multer");
const history = require("./controller/history");
// Using middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(cookieParser());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

app.get("/login", cLogin.login);

app.post("/loggedin", cLogin.loginPost);

app.get("/signup", cSignup.Signup);

app.post("/register", cSignup.register);

app.get("/home", cookie.checkCookie, cHome.home);

app.get("/productForm", cookie.checkCookie, itemForm.productForm);
app.post("/submit-product", cookie.checkCookie, itemForm.uploadForm);

app.get("/uploadPhotos/:pid", cookie.checkCookie, itemForm.photoForm);

app.post(
  "/upload-files/:pid",
  cookie.checkCookie,
  upload.array("photo1", 4), // Adjust the maximum number of files as needed
  itemForm.uploadPhotos
);

app.get("/viewProduct", cookie.checkCookie, viewP.pView);

app.get("/history", history.success);
module.exports = app;
