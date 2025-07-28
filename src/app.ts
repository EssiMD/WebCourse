import express from 'express';
import path from 'path';

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Type definition
type TUser = {
    name: string;
    email: string;
}

// In-memory storage
let users: TUser[] = [];

// Route 1: Hello world
app.get('/hello', (req, res) => {
    res.json({ msg: "Hello world!" });
});

// Route 2: Echo ID
app.get('/echo/:id', (req, res) => {
    res.json({ id: req.params.id });
});

// Route 3: Sum numbers
app.post('/sum', (req, res) => {
    const numbers: number[] = req.body.numbers;
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    res.json({ sum });
});

// Route 4: Add user
app.post('/users', (req, res) => {
    const newUser: TUser = {
        name: req.body.name,
        email: req.body.email
    };
    users.push(newUser);
    res.json({ message: "User successfully added" });
});

// Route 5: Get all users
app.get('/users', (req, res) => {
    res.status(201).json(users);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});