const Product = require("../models/product");
const User = require("../models/user");

exports.productForm = (req, res) => {
  res.render("productForm1");
};

exports.uploadForm = async (req, res) => {
  const userId = req.user.id; // Assuming you can access the user ID from session
  const {
    productName,
    productDetails,
    expectedPrice,
    working,
    damage,
    damageDetails,
    customerName,
    mobileNumber,
    emailId,
    pickupAddress,
    accountHolderName,
    accountNumber,
    bankName,
    ifscCode,
  } = req.body;

  try {
    // Create a new product with user ID as the owner
    const newProduct = await Product.create({
      productName,
      productDetails,
      expectedPrice,
      working,
      damage,
      damageDetails,
      customerName,
      mobileNumber,
      emailId,
      pickupAddress,
      accountHolderName,
      accountNumber,
      bankName,
      ifscCode,
      owner: userId, // Assigning the owner field with the user ID
    });

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found.");
    }

    // Add the new product ID to the user's products array
    user.products.push(newProduct._id);

    // Save the updated user document
    await user.save();

    // Redirect to upload photos
    res.redirect(`/uploadPhotos/${newProduct.id}`);
    console.log("Product Created Successfully");
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).send("Error creating product.");
  }
};

exports.photoForm = (req, res) => {
  res.render("uploadFile", { pid: req.params.pid });
};

exports.uploadPhotos = async (req, res) => {
  const productId = req.params.pid;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send("Product not found.");
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).send("No files were uploaded.");
    }

    // Save the file paths to the product document
    req.files.forEach((file) => {
      product.photos.push({
        filename: file.filename,
        path: file.path,
      });
    });

    await product.save();

    res.send("Files uploaded successfully.");
  } catch (err) {
    console.error("Error processing upload:", err);
    res.status(500).send("Error processing upload.");
  }
};
