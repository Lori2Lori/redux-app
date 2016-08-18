const deepFreeze = require('deep-freeze');
const expect = require('expect');
const Redux = require('redux')

//Reducer composition
//Reducer
const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
          id: action.id,
          text: action.text,
          completed: false
        };
    case 'TOGGLE_TODO':
        if (state.id !== action.id) {
          return state;
        }
        return {
          ...state,
          completed: !state.completed
        };
    default:
      return state;
  }
};

//Reducer

const visibilityFilter = (
  state = "SHOW_ALL",
  action
) => {
  switch (action.type) {
    case "SET_VISIBILITY_FILTER":
      return action.filter;
    default:
      return state;
  }
}

//Reducer

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined,action)
      ];
    default:
      return state.map(t => todo(t,action));
  }

};

//combineReducers from scratch
const combineReducers = (reducers) => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reducers[key](
        state[key],
        action
        );
        return nextState;
      },
      {}
    );
  };
}

// const {combineReducers} = Redux;
const todoApp = combineReducers(
  { todos: todos
  , visibilityFilter: visibilityFilter
  }
);

//It's the same as combineReducers
// const todoApp = (state = {}, action) => {
//   return {
//     todos: todos(
//       state.todos,
//       action
//     ),
//     visibilityFilter: visibilityFilter(
//       state.visibilityFilter,
//       action
//     )
//   };
// };

//Tests

const testAddTodo = () => {
  const stateBefore = [];
  const action = {
    type: 'ADD_TODO',
    id: 0,
    text: 'Learn Redux'
  };
  const stateAfter = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: false
    }
  ];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter);
};

const testToggleTodo = () => {
  const stateBefore = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: false
    },
    {
      id: 1,
      text: 'Go shopping',
      completed: false
    }
  ];
  const action = {
    type: 'TOGGLE_TODO',
    id: 1
  };
  const stateAfter = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: false
    },
    {
      id: 1,
      text: 'Go shopping',
      completed: true
    }
  ];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter);
};

//Calling functions

testAddTodo();
testToggleTodo();
console.log("All tests passed.");


const {createStore} = Redux;
const store = createStore(todoApp);

console.log("Dispatching ADD_TODO");
store.dispatch({
  type: "ADD_TODO",
  id: 1,
  text: "Go shopping"
})
console.log("Current state:");
console.log(store.getState());
console.log("----------------");

console.log("Dispatching TOGGLE_TODO");
store.dispatch({
  type: "TOGGLE_TODO",
  id: 0
})
console.log("Current state:");
console.log(store.getState());
console.log("----------------");

console.log("Dispatching visibilityFilter SHOW_ALL");
store.dispatch({
  type: "SHOW_ALL",
  id: 0
})
