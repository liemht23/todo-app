const { useState } = React;

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([...todos, { text: input, completed: false }]);
    setInput('');
  };

  const toggleTodo = index => {
    const updated = todos.map((todo, i) => i === index ? { ...todo, completed: !todo.completed } : todo);
    setTodos(updated);
  };

  const deleteTodo = index => {
    const updated = todos.filter((_, i) => i !== index);
    setTodos(updated);
  };

  return (
    React.createElement('div', null,
      React.createElement('h1', null, 'Todo App'),
      React.createElement('input', {
        value: input,
        onChange: e => setInput(e.target.value),
        onKeyDown: e => { if (e.key === 'Enter') addTodo(); }
      }),
      React.createElement('button', { onClick: addTodo }, 'Add'),
      React.createElement('ul', null,
        todos.map((todo, index) =>
          React.createElement('li', { key: index },
            React.createElement('input', {
              type: 'checkbox',
              checked: todo.completed,
              onChange: () => toggleTodo(index)
            }),
            React.createElement('span', {
              style: { textDecoration: todo.completed ? 'line-through' : 'none', marginLeft: '8px' }
            }, todo.text),
            React.createElement('button', { onClick: () => deleteTodo(index), style: { marginLeft: '8px' } }, 'Delete')
          )
        )
      )
    )
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(TodoApp));
