import express from 'express';
import { promises as fs } from 'fs';
import path from 'path';

const app = express();
const PORT = 3000;

// Type definition
type TUser = {
    name: string;
    todos: string[];
}

app.use(express.json());
app.use(express.static('public')); // Important line!

// File operations
const DATA_FILE = 'data.json';

async function readDataFile(): Promise<TUser[]> {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf-8');
        return JSON.parse(data);
    } catch {
        // If file doesn't exist, create it with empty array
        await fs.writeFile(DATA_FILE, '[]');
        return [];
    }
}

async function writeDataFile(data: TUser[]): Promise<void> {
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

// Routes
app.post('/add', async (req, res) => {
    try {
        const { name, todo } = req.body;
        const users = await readDataFile();
        
        const existingUser = users.find(user => user.name === name);
        if (existingUser) {
            existingUser.todos.push(todo);
        } else {
            users.push({ name, todos: [todo] });
        }
        
        await writeDataFile(users);
        res.json({ message: `Todo added successfully for user ${name}.` });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/todos/:id', async (req, res) => {
    try {
        const users = await readDataFile();
        const user = users.find(u => u.name.toLowerCase() === req.params.id.toLowerCase());
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.delete('/delete', async (req, res) => {
    try {
        const { name } = req.body;
        let users = await readDataFile();
        users = users.filter(user => user.name !== name);
        
        await writeDataFile(users);
        res.json({ message: 'User deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.put('/update', async (req, res) => {
    try {
        const { name, todo } = req.body;
        const users = await readDataFile();
        const user = users.find(u => u.name === name);
        
        if (user) {
            user.todos = user.todos.filter(t => t !== todo);
            await writeDataFile(users);
            res.json({ message: 'Todo deleted successfully.' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});