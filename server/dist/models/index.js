"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
mongoose_1.default.connect(`${process.env.MONGO_URL}`, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose_1.default.connection;
db.once('open', () => console.log('db connected'));
module.exports = mongoose_1.default;
//# sourceMappingURL=index.js.map