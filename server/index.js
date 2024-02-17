import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import cookieParser from "cookie-parser";
import studentRouter from "./src/route.js";

const app = express();
const port = 3002;

mongoose
    .connect("mongodb://0.0.0.0:27017/crud-antd")
    .then(() => {
        console.log("Kết nối thành công");
    })
    .catch((err) => {
        console.log("Lỗi kết nối:", err);
    });

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true, // Bật hỗ trợ cho credentials
    })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/student", studentRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
