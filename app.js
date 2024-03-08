const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes")
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swagger");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs, { swaggerOptions: { plugins: [{ auth: { name: "Authorization", schema: { type: "apiKey", in: "header" } } }] } }));
app.use(cors());
app.use("/uploads", express.static("uploads"));

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("connected to MongoDB");
  } catch (error) {
    console.log("Error occurred: ", error.message);
    process.exit(1);
  }
};

connectDB();

app.use("/api", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
