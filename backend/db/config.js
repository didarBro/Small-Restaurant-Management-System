const mongoose = require("mongoose");

const configDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      // Optional but included for compatibility
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Optional: Timeout after 5s instead of default 30s
    });

    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1); // Exit the process if connection fails
  }
};

module.exports = configDB;
