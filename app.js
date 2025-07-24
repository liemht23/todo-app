const React = typeof require === 'function' ? require('react') : window.React;
const ReactDOM = typeof require === 'function' ? require('react-dom/client') : window.ReactDOM;
const { useState, useEffect } = React;

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  // Load todos from localStorage on component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('modernTodos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('modernTodos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!input.trim()) return;
    const newTodo = {
      id: Date.now(),
      text: input.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTodos([...todos, newTodo]);
    setInput('');
  };

  const toggleTodo = id => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    React.createElement('div', { className: 'todo-container' },
      React.createElement('div', { className: 'todo-header' },
        React.createElement('h1', { className: 'todo-title' }, 'Modern Todo'),
        React.createElement('p', { className: 'todo-subtitle' }, 'Stay organized, stay productive')
      ),
      
      React.createElement('div', { className: 'input-section' },
        React.createElement('input', {
          className: 'todo-input',
          type: 'text',
          value: input,
          onChange: e => setInput(e.target.value),
          onKeyDown: handleKeyPress,
          placeholder: 'What needs to be done?',
          'aria-label': 'Add new todo'
        }),
        React.createElement('button', {
          className: 'add-button',
          onClick: addTodo,
          'aria-label': 'Add todo'
        }, '✨ Add')
      ),

      todos.length === 0 
        ? React.createElement('div', { className: 'empty-state' },
            React.createElement('div', { className: 'empty-icon' }, '�'),
            React.createElement('p', { className: 'empty-text' }, 'No todos yet'),
            React.createElement('p', { className: 'empty-subtext' }, 'Add one above to get started!')
          )
        : React.createElement('ul', { className: 'todo-list' },
            todos.map((todo) =>
              React.createElement('li', {
                key: todo.id,
                className: `todo-item ${todo.completed ? 'completed' : ''}`
              },
                React.createElement('label', { className: 'todo-checkbox' },
                  React.createElement('input', {
                    type: 'checkbox',
                    checked: todo.completed,
                    onChange: () => toggleTodo(todo.id),
                    'aria-label': `Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`
                  })
                ),
                React.createElement('span', {
                  className: `todo-text ${todo.completed ? 'completed' : ''}`
                }, todo.text),
                React.createElement('button', {
                  className: 'delete-button',
                  onClick: () => deleteTodo(todo.id),
                  'aria-label': `Delete "${todo.text}"`
                }, 'Delete')
              )
            )
          ),

      totalCount > 0 && React.createElement('div', { className: 'todo-stats' },
        React.createElement('p', { className: 'stats-text' },
          `${completedCount} of ${totalCount} completed • ${totalCount - completedCount} remaining`
        )
      )
    )
  );
}

if (typeof document !== 'undefined') {
  const rootEl = document.getElementById('root');
  if (rootEl) {
    ReactDOM.createRoot(rootEl).render(
      React.createElement(TodoApp)
    );
  }
}

if (typeof module !== 'undefined') {
  module.exports = { TodoApp };
}
