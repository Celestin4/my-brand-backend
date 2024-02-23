const connectDB = require("./config/database");
const app = require("./config/express");
const routes = require("./routes");


connectDB();

app.use("/api", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
