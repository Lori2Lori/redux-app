const deepFreeze = require('deep-freeze');
const expect = require('expect');

const toggleTodo = (todo) => {
  todo.completed = !todo.completed;
  return todo;
};

const testToggleTodo = () => {
  const todoBefore = {
    id: 0,
    text: 'Learn object mutations',
    completed: false
  };
  const todoAfter = {
    id:0,
    text: 'Learn object mutations',
    completed: true
  };
  expect (
    toggleTodo(todoBefore)
  ).toEqual(todoAfter);
};

testToggleTodo();
console.log('All tests passed.');
