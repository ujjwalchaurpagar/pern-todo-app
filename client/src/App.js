import React, {Fragment} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


// components

import InputTodo from "./components/InputTodos";
import ListTodo from "./components/ListTodo";

function App() {
  return (
    <div className="container">
      <Fragment>
        <InputTodo />
        <ListTodo />
      </Fragment>
    </div>
  );
}

export default App;
