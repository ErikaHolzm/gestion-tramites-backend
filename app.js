
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import StatusRoutes from "./routes/StatusRoutes.js";
import UsersRoutes from "./routes/UsersRoutes.js";
import RemindersRoutes from "./routes/RemindersRoutes.js"

dotenv.config();

// Conexión a db
await connectDB();

// Configuración de servidor
const app = express();
app.use(express.json());

// Usar rutas de status
app.use("/status", StatusRoutes);
// Usar rutas de users
app.use("/users", UsersRoutes);
// Usar rutas de reminders
app.use("/reminders", RemindersRoutes);

// Ping
app.get("/", (req, res) => {
  res.send("API OK ");
});

// Definir puerto
const PORT = process.env.PORT || 3000;

// Arrancar servidor
app.listen(PORT, () => {
  console.log(` Servidor corriendo en puerto ${PORT}`);
});
