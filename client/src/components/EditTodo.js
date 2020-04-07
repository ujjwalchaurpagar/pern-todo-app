import React,{ Fragment, useState } from "react";
import {Modal, Button} from "react-bootstrap";


const EditTodo = ({todo}) => {
    const [description, setDescription] = useState(todo.description);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const updatefunction = async(e) =>{
        e.preventDefault();
        try {
            const body = { description };
            const response = await fetch(`http://localhost:5000/todos/${todo.todo_id}`,{
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            window.location = "/";
            // console.log(response);
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <Fragment>
        <Button variant="warning" onClick={handleShow} >Edit</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton onClick={() => setDescription(todo.description)}>
          <Modal.Title>Edit Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <input type="text" className="form-control" value={description} onChange={e => setDescription(e.target.value)}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDescription(todo.description)}>
            Close
          </Button>
          <Button variant="primary" onClick={e => updatefunction(e)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </Fragment>
    )
}


export default EditTodo;