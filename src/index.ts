import { getDatabase } from "./database/database.js";
import express from "express";
import userRoutes from "./routes/UserRoutes.js";
import { errorHandler } from "./middleware/middlewareToken.js";

const app = express();
const PORT = 3000;

const sequelize = getDatabase();


app.use(express.json());
app.use("/api", userRoutes);
app.use(errorHandler)

async function start() {
  try {
    await sequelize.authenticate();
    console.log("✅ DB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Unable to connect to DB", err);
  }
}

start();

/*
docker build -f Dockerfile.prod -t mia-app:prod .
docker compose -f docker-compose.prod.yaml up --build


# Per sviluppo
docker build -f Dockerfile.dev -t mia-app:dev .

docker compose -f docker-compose.dev.yaml up --build



*/
