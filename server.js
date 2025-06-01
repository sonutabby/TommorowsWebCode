const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Serve all static files from your current folder
app.use(express.static(__dirname));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/coffeeUsers', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  gender: String,
  message: String
});
const User = mongoose.model('User', userSchema);

// Route for form submission
app.post('/submit', async (req, res) => {
  const { name, email, gender, message } = req.body;

  try {
    await User.create({ name, email, gender, message });
    res.redirect('/success.html');
  } catch (err) {
    res.status(500).send(`<h2>❌ Failed to submit form.</h2><p>${err.message}</p>`);
  }
});

// Start the server
app.listen(3000, () => {
  console.log('🚀 Server running at http://localhost:3000');
});

