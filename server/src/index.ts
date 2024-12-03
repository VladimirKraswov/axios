import express from 'express';
import cors from 'cors';

const app = express();
const port = 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Типы
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

// Временное хранилище
let todos: Todo[] = [];
let currentId = 1;

// Маршруты

// Получение всех задач
app.get('/todos', (req, res) => {
  res.json(todos);
});

// Создание новой задачи
app.post('/todos', (req, res) => {
  const { title } = req.body;
  const newTodo: Todo = {
    id: currentId++,
    title,
    completed: false
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Обновление задачи
app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, completed } = req.body;
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.title = title !== undefined ? title : todo.title;
    todo.completed = completed !== undefined ? completed : todo.completed;
    res.json(todo);
  } else {
    res.status(404).json({ message: 'Задача не найдена' });
  }
});

// Удаление задачи
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter(t => t.id !== id);
  res.status(204).send();
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
