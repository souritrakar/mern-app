import React from "react"
import { Link } from 'react-router-dom';
import axios from 'axios';
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"

const ActionModal = (props) =>{
    return(
        <Modal 
         aria-labelledby="contained-modal-title-vcenter"
        centered 
        show={props.showModal} >
        <Modal.Dialog>
        <Modal.Header >
         <Modal.Title> Delete Exercise</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <p>Are you sure you want to delete this exercise?</p>
        </Modal.Body>

        <Modal.Footer>
            <Button onClick={props.closeModal} variant="secondary">Close</Button>
            <Button onClick={props.deleteExercise} variant="danger">Yes</Button>
        </Modal.Footer>
        </Modal.Dialog>
        </Modal>
        
    )
}
const Exercise = (props) =>{ return (

    <tr>
      <td>{props.exercise.username}</td>
      <td>{props.exercise.description}</td>
      <td>{props.exercise.duration}</td>
    
      <td>
        <Link to={"/edit/"+props.exercise._id}>Edit</Link> | <a href="#" onClick={props.openModal}>Delete</a>
      </td>
    </tr>
  )
}
  

export default class exercisescomponent extends React.Component{

    constructor(props){
        super(props)
        
        this.state={
            exercises:[],
            modalOpen:false,
            id:null
            
        }

    }
    
    componentDidMount(){
        axios.get("/exercises/").then(res=>{
            this.setState({exercises:res.data})
        }) .catch((error) => {
            console.log(error);
          })
    }
    
  
    render(){
      if(this.state.exercises.length>=1){
        return(
          <div>
            <ActionModal showModal={this.state.modalOpen} closeModal={()=>{this.setState({modalOpen:false})}} deleteExercise={()=>{

              axios.delete("/exercises/"+this.state.id)
              .then(()=>{

                  window.location.reload()
              })
            }}
            
            />
         <center><h3>Logged Exercises</h3></center>
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Username</th>
                <th>Description</th>
                <th>Duration</th>
            
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              { 

              this.state.exercises.map(exercise=>{
                  return(
                      <Exercise  openModal={()=>{this.setState({modalOpen:true, id:exercise._id })}} exercise={exercise} key={exercise._id}  />
                  )
              })
               }
            </tbody>
          </table>
        </div>
      )
      }
      
      else{
        return(
          <center><h2 style={{marginTop:"10%"}}>There are no exercises yet. Add one!</h2></center>
        )
      }
       
    }
}