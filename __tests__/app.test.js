const React = require('react');
const { render, fireEvent } = require('@testing-library/react');
require('@testing-library/jest-dom');
const { TodoApp } = require('../app');

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(() => null),
  setItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock;

describe('Modern Todo App', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockReturnValue(null);
    localStorageMock.setItem.mockClear();
  });

  test('renders todo app with header and input', () => {
    const { getByText, getByRole } = render(React.createElement(TodoApp));
    expect(getByText('Modern Todo')).toBeInTheDocument();
    expect(getByText('Stay organized, stay productive')).toBeInTheDocument();
    expect(getByRole('textbox')).toBeInTheDocument();
    expect(getByText('✨ Add')).toBeInTheDocument();
  });

  test('can add a todo item and it appears in the list', () => {
    const { getByText, getByRole } = render(React.createElement(TodoApp));
    const input = getByRole('textbox');
    const addButton = getByText('✨ Add');

    fireEvent.change(input, { target: { value: 'My first todo' } });
    fireEvent.click(addButton);

    expect(getByText('My first todo')).toBeInTheDocument();
    expect(getByText('0 of 1 completed • 1 remaining')).toBeInTheDocument();
  });

  test('input clears after adding a todo', () => {
    const { getByRole, getByText } = render(React.createElement(TodoApp));
    const input = getByRole('textbox');
    const addButton = getByText('✨ Add');

    fireEvent.change(input, { target: { value: 'Todo to clear input' } });
    fireEvent.click(addButton);

    expect(input.value).toBe('');
  });

  test('can add todo by pressing Enter key', () => {
    const { getByText, getByRole } = render(React.createElement(TodoApp));
    const input = getByRole('textbox');

    fireEvent.change(input, { target: { value: 'Keyboard todo' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(getByText('Keyboard todo')).toBeInTheDocument();
  });

  test('does not add empty or whitespace-only todos', () => {
    const { getByText, getByRole } = render(React.createElement(TodoApp));
    const input = getByRole('textbox');
    const addButton = getByText('✨ Add');

    // Get initial count
    const initialTodoCount = document.querySelectorAll('.todo-item').length;

    // Try to add empty todo
    fireEvent.click(addButton);

    // Try to add whitespace-only todo
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.click(addButton);

    // Count should remain the same
    const finalTodoCount = document.querySelectorAll('.todo-item').length;
    expect(finalTodoCount).toBe(initialTodoCount);
  });
});
