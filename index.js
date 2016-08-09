const h       = require('react-hyperscript');
const React   = require('react');
const ReactDOM = require("react-dom");
const Redux   = require("redux");

const counter = (state = {number: 0, running: false}, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {number: state.number + 1, running: state.running};
    case "DECREMENT":
      return {number: state.number - 1, running: state.running};
    case "TOGGLE":
      console.log("toggle works", state);
      return {number: state.number, running: !state.running};

    default:
      return state;
  }
}

const Counter = ({value, onIncrement, onDecrement, onToggle, running}) => {
  console.log(running);
  return (
    h('div', [
      h('h1', value),
      h('button', {onClick: onIncrement}, '+'),
      h('button', {onClick: onDecrement}, '-'),
      h('input', {
        type: "checkbox",
        onChange: onToggle,
        checked: running
      })
    ])
  )
};

const { createStore } = Redux

const store = createStore(counter)


const render = () => {
  ReactDOM.render(
    h(Counter,{
      value: store.getState().number,
      onIncrement: () => {
        store.dispatch({type: "INCREMENT"})
      },
      onDecrement: () => {
        store.dispatch({type: "DECREMENT"})
      },
      onToggle: () => {
        store.dispatch({type: "TOGGLE"})
      },
      running: store.getState().running
    }),
    document.getElementById("root")
  );
};

store.subscribe(render);
render();

const tick = () => {
  const state = store.getState();
  if (state.running) {
    store.dispatch({type: "INCREMENT"});
  };
};
setInterval(tick, 1000);
