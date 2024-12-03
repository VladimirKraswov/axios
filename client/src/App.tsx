import React, { useEffect, useState } from 'react';
import { Todo } from './types';
import { getTodos, createTodo, updateTodo, deleteTodo } from './services/TodoService';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTitle, setNewTitle] = useState('');

  // Загрузка списка задач при монтировании компонента
  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const todos = await getTodos();
      setTodos(todos);
    } catch (error) {
      console.error('Ошибка при загрузке задач:', error);
    }
  };

  const handleAddTodo = async () => {
    if (newTitle.trim() === '') return;
    try {
      const newTodo = await createTodo(newTitle);
      setTodos([...todos, newTodo]);
      setNewTitle('');
    } catch (error) {
      console.error('Ошибка при создании задачи:', error);
    }
  };

  const handleToggleTodo = async (todo: Todo) => {
    try {
      const updatedTodo = await updateTodo({ ...todo, completed: !todo.completed });
      setTodos(todos.map(t => (t.id === updatedTodo.id ? updatedTodo : t)));
    } catch (error) {
      console.error('Ошибка при обновлении задачи:', error);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter(t => t.id !== id));
    } catch (error) {
      console.error('Ошибка при удалении задачи:', error);
    }
  };

  return (
    <div style={{ margin: '20px' }}>
      <h1>Список задач</h1>
      <div>
        <input
          type="text"
          placeholder="Новая задача"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
        />
        <button onClick={handleAddTodo}>Добавить</button>
      </div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                cursor: 'pointer',
                marginRight: '10px'
              }}
              onClick={() => handleToggleTodo(todo)}
            >
              {todo.title}
            </span>
            <button onClick={() => handleDeleteTodo(todo.id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
