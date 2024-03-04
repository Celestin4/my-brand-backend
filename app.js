const connectDB = require("./config/database");
const app = require("./config/express");
const routes = require("./routes");
const { specs, swaggerUi } = require("./swagger/swagger");

connectDB();

app.use("/api", routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
