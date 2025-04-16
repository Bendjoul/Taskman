const mongoose = require('mongoose');


// Connect to MongoDB

const connectDB = () => {
    try {
      mongoose.connect(process.env.DB_URL, {serverSelectionTimeoutMS: 5000});
      console.log("Database connected  Succesfully !!")
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
  };

  module.exports = connectDB()