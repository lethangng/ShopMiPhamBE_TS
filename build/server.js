"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const connectDB_1 = __importDefault(require("./config/connectDB"));
const api_1 = __importDefault(require("./routes/api"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = (process.env.PORT || 3000);
const host = process.env.HOST_NAME || "localhost";
// Ho tro lay data tu request
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
// Middleware xử lý cookie
app.use((0, cookie_parser_1.default)());
// app.use(router);
connectDB_1.default.connectDB();
const corsOptions = {
    origin: process.env.URL_REACT,
    credentials: true,
    optionSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
// init api route
api_1.default.initAPIProductType(app);
api_1.default.initAPIProduct(app);
api_1.default.initAPIUser(app);
api_1.default.initAPIBill(app);
api_1.default.initAPIProductBill(app);
app.use("/", (req, res) => {
    res.send("Server ok!");
});
// Xử lý các tuyến đường không hợp lệ
app.use((req, res) => {
    res.status(404).json({ message: "Tuyến đường không tồn tại" });
});
app.listen(port, host, () => {
    console.log(`App ${host} listening on port ${port}`);
});
//# sourceMappingURL=server.js.map