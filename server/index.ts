import express from "express";
import morgan from "morgan";
import cors from "cors";

import { routes } from "./routes/route";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));
app.use(morgan("dev"));
//if we are going to use staticts, then we will app.use(statics)

const PORT = process.env.PORT || 5000;

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

