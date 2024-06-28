// server.js
const app = require("./app");
const connectDB = require("./data/database");
// Starting the server
connectDB();
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
