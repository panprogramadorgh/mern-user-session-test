// express
import express from "express";
import indexRouter from "./routers/index.router";
import connection from "./middleware/connection.middleware";
import checkToken from "./middleware/checkToken.middleware";
// database connection function
import connect from "./utils/connect";

connect().catch(() => {
  console.log("Error conecting to database");
});
const app = express();
app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type, token");
  next();
});
app.use(connection);
app.use(checkToken);
app.use(express.json());
app.use("/", indexRouter);
app.use((req, res) => {
  return res.status(404).json({ error: "Route not found" });
});

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log(`App corriendo en ${PORT}`);
});
