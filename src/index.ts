import cookieParser from "cookie-parser";
import express from "express";
import financialRecordRouter from "./modules/finance/routes.js";
import dashboardRouter from "./modules/dashboard/routes.js";
import authRouter from "./modules/auth/routes.js";
import ErrorClass from "./utils/errorClass.js";
import { errorMiddleware } from "./middleware/error.js";
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/financialRecord", financialRecordRouter);
app.use("/api/v1/dashboard", dashboardRouter);

app.all("{*any}", (req, res, next) => {
  const err = new ErrorClass(
    `Can't find ${req.originalUrl} on this server`,
    404,
  );
  next(err);
});
app.use(errorMiddleware);

app.listen(3000, () => {
  console.log("server is running");
});
