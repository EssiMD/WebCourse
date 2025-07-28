"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = 3000;
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
// In-memory storage
let users = [];
// Routes
app.get('/hello', (req, res) => {
    res.json({ msg: "Hello world!" });
});
app.get('/echo/:id', (req, res) => {
    res.json({ id: req.params.id });
});
app.post('/sum', (req, res) => {
    const { numbers } = req.body;
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    res.json({ sum });
});
app.post('/users', (req, res) => {
    const { name, email } = req.body;
    const newUser = { name, email };
    users.push(newUser);
    res.json({ message: "User successfully added" });
});
app.get('/users', (req, res) => {
    res.status(201).json(users);
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
