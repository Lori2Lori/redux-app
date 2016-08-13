const deepFreeze = require('deep-freeze');
const expect = require('expect');

// Use of Object.assign() - use polifyl because not all browsers support it:
// const toggleTodo = (todo) => {
//   return Object.assign({}, todo, {
//     completed : !todo.completed
//   });
// };

// Use of object spread operator, it is not a part of ES6
const toggleTodo = (todo) => {
  let result = {
    ...todo,
    completed : !todo.completed
  };
  return result;
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

  deepFreeze(todoBefore);

  expect (
    toggleTodo(todoBefore)
  ).toEqual(todoAfter);
};

testToggleTodo();
console.log('All tests passed.');
