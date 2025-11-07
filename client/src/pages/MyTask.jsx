import axios from "axios";
import { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const MyTask=()=>{
    const [mydata, setMydata] = useState([]);
    const [show, setShow] = useState(false);
    const [taskstatus, setTaskStatus] = useState("");
    const [taskduration, setTaskDuration]= useState("");
    const [taskId, setTaskId]= useState("");
    const handleClose = () => setShow(false);
  const handleShow = (tid) =>{ 
    setTaskId(tid)
    setShow(true)
  };

   const laodData=async()=>{       
    try {
   let api=`${import.meta.env.VITE_BACKEND_URL}/employee/showtask/?id=${localStorage.getItem("empid")}`;
           const response= await axios.get(api);
           console.log(response.data); 
           setMydata(response.data);
    } catch (error) {
         console.log(error)
    }
   }

   useEffect(()=>{
    laodData();
   }, []);


  const taskReportSubmit=async(e)=>{
      e.preventDefault();
      try {
          let api=`${import.meta.env.VITE_BACKEND_URL}/employee/taskreport`;
          const response = await axios.put(api, {taskstatus,taskduration, taskId });
            console.log(response);
      }
       catch (error) {
        console.log(error);
      }
  }




 let sno=0;
   const ans= mydata.map((key)=>{
    sno++;
   if (!key.submitstatus){
    return(
        <>
          <tr>
            <td> {sno} </td>
            <td>{key.task}</td>
             <td>{key.duration}</td>
              <td>{key.priority}</td>
              <td>
                <Button variant="success" 
                onClick={()=>{handleShow(key._id)}}>Send Report!</Button>
              </td>
          </tr>
        </>
    )
  }
   })

    return(
        <>
          <h1> My Task Detail</h1>
          <hr/>

           <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Task Detail</th>
          <th>Duration in Days</th>
          <th>Priority Level</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {ans}
      </tbody>
      </Table>
 



      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Your Task Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>

         <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Select Task Status</Form.Label>
      <Form.Select aria-label="Default select example" value={taskstatus} onChange={(e)=>{setTaskStatus(e.target.value)}}>
      <option>select task status</option>
      <option value="Fully Competed">Fully Completed</option>
      <option value="Partial Completed">Partial Completed</option>
      <option value="No Completed">No Completed</option>
    </Form.Select>

      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Completion Days</Form.Label>
        <Form.Control type="text" value={taskduration} onChange={(e)=>{setTaskDuration(e.target.value)}} />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={taskReportSubmit}>
        Submit
      </Button>
    </Form>
        </Modal.Body>
      </Modal>
        </>
    )
}

export default MyTask;