import express, { Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectDB";
import initAPIRoute from "./routes/api";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();
const app = express();

const port = (process.env.PORT || 3000) as number;
const host = process.env.HOST_NAME || "localhost";

// Ho tro lay data tu request
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware xử lý cookie
app.use(cookieParser());

// app.use(router);
connectDB.connectDB();

const corsOptions = {
  origin: process.env.URL_REACT,
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// init api route
initAPIRoute.initAPIProductType(app);
initAPIRoute.initAPIProduct(app);
initAPIRoute.initAPIUser(app);
initAPIRoute.initAPIBill(app);
initAPIRoute.initAPIProductBill(app);

app.use("/", (req: Request, res: Response) => {
  res.send("Server ok!");
});

// Xử lý các tuyến đường không hợp lệ
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Tuyến đường không tồn tại" });
});

app.listen(port, host, () => {
  console.log(`App ${host} listening on port ${port}`);
});
