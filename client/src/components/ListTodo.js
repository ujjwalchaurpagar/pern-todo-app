import React, { Fragment, useEffect, useState } from "react";
import Edittodo from "./EditTodo";
import { Table, Button } from "react-bootstrap";


const ListTodo = () => {
    const [todos, setTodos] = useState([]);

    //  Delete todo

    const deleteTodo = async id => {
        try {
            const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
                method: "DELETE"
            });
           setTodos(todos.filter(todo => todo.todo_id !== id));            
        } catch (err) {
            console.error(err.message);            
        }
    }

    const getTodos = async () => {
        try {
            const response = await fetch("http://localhost:5000/todos");
            const jsonData = await response.json();
            
            setTodos(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(()=>{
        getTodos();
    }, []);

    // console.log(todos);
    return(
        <Fragment>
            <h5 className="mt-5">ListTodo</h5>
            {" "}
            <Table striped bordered hover>
            <thead>
                <tr>
                <th>Description</th>
                <th>Edit</th>
                <th>Delete</th>
                </tr>
            </thead>
            <tbody>
               {todos.map(todo =>(
                    <tr key={todo.todo_id}>
                        <td>{todo.description}</td>
                        <td><Edittodo todo={todo} /></td>
                        <td><Button variant="danger" onClick={()=>
                             deleteTodo(todos.todo_id)
                        }>DELETE</Button></td>
                    </tr>
                ))}
  
            </tbody>
            </Table>
        </Fragment>
    )
}

export default ListTodo;