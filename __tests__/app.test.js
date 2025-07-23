const React = require('react');
const { render, fireEvent } = require('@testing-library/react');
require('@testing-library/jest-dom');
const { TodoApp } = require('../app');

test('add and delete a todo item', () => {
  const { getByText, getByRole, queryByText } = render(React.createElement(TodoApp));
  const input = getByRole('textbox');
  const addButton = getByText('Add');

  fireEvent.change(input, { target: { value: 'Test task' } });
  fireEvent.click(addButton);

  expect(getByText('Test task')).toBeInTheDocument();

  const deleteButton = getByText('Delete');
  fireEvent.click(deleteButton);

  expect(queryByText('Test task')).toBeNull();
});
