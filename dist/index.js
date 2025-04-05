"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./config/server"));
const PORT = process.env.PORT ?? 3000;
server_1.default.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
