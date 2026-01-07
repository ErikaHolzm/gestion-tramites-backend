
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import StatusRoutes from "./routes/StatusRoutes.js"

dotenv.config();

const app = express();
app.use(express.json());
app.use("/status", StatusRoutes);

await connectDB();


app.get("/", (req, res) => {
  res.send("API OK ");
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(` Servidor corriendo en puerto ${PORT}`);
});
