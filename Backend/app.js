const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors=require("cors");
const shopRoutes = require("./routes/shopRoutes");
const sellerRoutes = require("./routes/sellerRoutes");
const farmerRoutes = require("./routes/farmerRoutes");
const userRoutes = require("./routes/userRoutes");

//DB Connection
dotenv.config();
connectDB();

const app = express();
//Data Format Specification
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Api Request PerMission
app.use(cors());

// API Routes
app.use("/api/shop", shopRoutes);
app.use("/api/sellers", sellerRoutes);
app.use("/api/farmers", farmerRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 1806;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
