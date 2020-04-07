import React, { Fragment, useState } from "react";
import { Card, Button, Form, FormControl } from "react-bootstrap"

const InputTodo = () => {

    const[description, setDescription] = useState("");

    const onSubmitForm = async e =>{
        e.preventDefault();
        try {
            const body = {description};
            const response = await fetch("http://localhost:5000/todos",{
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(body),
            });

            window.location = "/";
            console.log(response);
        } catch (err) {
            console.error(err.message)
        }
    }

    return ( 
        <Fragment>
            <Card className="mt-5">
                <Card.Header>Todo List</Card.Header> 
                <Card.Body>
                <Card.Title>Enter Your Todo </Card.Title> 
                <Form onSubmit={onSubmitForm}>
                    <Form.Group>
                        <FormControl type="text" value={description} onChange={e => setDescription(e.target.value)} />
                    </Form.Group>    
                    <Button type="submit" variant="success">Add</Button> 
                </Form>
                
                </Card.Body> 
            </Card> 
        </Fragment>
    )
}

export default InputTodo;