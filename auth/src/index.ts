import express from "express";
import { json } from "body-parser";

import { currentUserRouter } from "./routes/current-user";

const app = express();

// Middlewares
app.use(json());
app.use(currentUserRouter)

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Listening on port 3000");
});
