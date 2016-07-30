console.log("test 1");

const counter = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;

    default:
      return state;
  }
}

const { createStore } = Redux

const store = createStore(counter)

console.log("test 2");

store.dispatch({type: "INCREMENT"});

console.log("test 3");

console.log(store.getState());

console.log("test 4");
